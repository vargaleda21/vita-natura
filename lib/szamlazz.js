// Számlázz.hu Számla Agent – e-számla kiállítása és kiküldése a vevőnek.
// Dokumentáció: https://docs.szamlazz.hu/hu/agent/generating_invoice/xml
import { config, PRICING } from './config.js';
import { lineItems, certCount } from './pricing.js';

const x = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const today = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Budapest' }); // ÉÉÉÉ-HH-NN

// Bruttó egységárból nettó/ÁFA bontás a beállított kulcs szerint.
export function splitVat(gross, vat) {
  if (vat === '27') {
    const net = Math.round(gross / 1.27);
    return { net, vatAmount: gross - net, key: '27' };
  }
  return { net: gross, vatAmount: 0, key: vat || 'AAM' };   // AAM = alanyi adómentes
}

export function buildInvoiceXml(order) {
  const vat = config.szamlazz.vat;
  const date = today();
  const tetelek = lineItems(order.items.length, certCount(order)).map(li => {
    const unit = splitVat(li.unit, vat);
    const net = unit.net * li.qty, gross = li.unit * li.qty;
    return `
    <tetel>
      <megnevezes>${li.kind === 'cert' ? 'Személyre szabott oklevél (letölthető PDF)' : x(config.szamlazz.itemName) + (li.unit !== PRICING.base ? ' – 10% kedvezménnyel' : '')}</megnevezes>
      <mennyiseg>${li.qty}</mennyiseg>
      <mennyisegiEgyseg>db</mennyisegiEgyseg>
      <nettoEgysegar>${unit.net}</nettoEgysegar>
      <afakulcs>${x(unit.key)}</afakulcs>
      <nettoErtek>${net}</nettoErtek>
      <afaErtek>${gross - net}</afaErtek>
      <bruttoErtek>${gross}</bruttoErtek>
    </tetel>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<xmlszamla xmlns="http://www.szamlazz.hu/xmlszamla" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.szamlazz.hu/xmlszamla https://www.szamlazz.hu/szamla/docs/xsds/agent/xmlszamla.xsd">
  <beallitasok>
    <szamlaagentkulcs>${x(config.szamlazz.agentKey)}</szamlaagentkulcs>
    <eszamla>true</eszamla>
    <szamlaLetoltes>false</szamlaLetoltes>
    <valaszVerzio>1</valaszVerzio>
  </beallitasok>
  <fejlec>
    <keltDatum>${date}</keltDatum>
    <teljesitesDatum>${date}</teljesitesDatum>
    <fizetesiHataridoDatum>${date}</fizetesiHataridoDatum>
    <fizmod>Bankkártya</fizmod>
    <penznem>HUF</penznem>
    <szamlaNyelve>hu</szamlaNyelve>
    <megjegyzes>Rendelésszám: ${x(order.id)}. A végösszeg bankkártyával kiegyenlítve.</megjegyzes>
    <rendelesSzam>${x(order.id)}</rendelesSzam>
  </fejlec>
  <elado>
    <emailReplyto>${x(config.mail.support)}</emailReplyto>
    <emailTargy>Számla – Égi Posta rendelés (${x(order.id)})</emailTargy>
    <emailSzoveg>Köszönjük a rendelést! Mellékelten küldjük a számlát.</emailSzoveg>
  </elado>
  <vevo>
    <nev>${x(order.billing.name)}</nev>
    <irsz>${x(order.billing.zip)}</irsz>
    <telepules>${x(order.billing.city)}</telepules>
    <cim>${x(order.billing.address)}</cim>
    <email>${x(order.email)}</email>
    <sendEmail>true</sendEmail>
  </vevo>
  <tetelek>${tetelek}
  </tetelek>
</xmlszamla>`;
}

export async function createInvoice(order) {
  if (!config.szamlazz.agentKey) throw new Error('SZAMLAZZ_AGENT_KEY nincs beállítva');
  const form = new FormData();
  form.append('action-xmlagentxmlfile', new Blob([buildInvoiceXml(order)], { type: 'text/xml' }), 'szamla.xml');
  const r = await fetch('https://www.szamlazz.hu/szamla/', { method: 'POST', body: form });
  const errCode = r.headers.get('szlahu_error_code');
  if (errCode) {
    const msg = decodeURIComponent(r.headers.get('szlahu_error') || '').replace(/\+/g, ' ');
    throw new Error(`Számlázz.hu hiba ${errCode}: ${msg}`);
  }
  const num = r.headers.get('szlahu_szamlaszam');
  if (num) return decodeURIComponent(num);
  const text = await r.text();
  const m = text.match(/xmlagentresponse=DONE;(.+)/);
  if (m) return m[1].trim();
  throw new Error(`Számlázz.hu: váratlan válasz (${r.status}) ${text.slice(0, 200)}`);
}
