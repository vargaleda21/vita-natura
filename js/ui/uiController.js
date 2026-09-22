if (affiliateProduct) {
      this.trackAnalytics("affiliate_offer_viewed", { product_id: affiliateProduct.id, category: affiliateProduct.category });
      affiliateHtml = `
        <div class="affiliate-box" style="background: #fdf8f0; border: 1px solid #e0c8a0; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <h4 style="margin-top:0;">🛒 Hiányzik a(z) ${affiliateProduct.name}?</h4>
          <p>Rendeld meg közvetlenül a kamrádba szállítási kedvezménnyel:</p>
          <a href="${affiliateProduct.affiliate_url || '#'}" target="_blank" class="btn-primary" style="display: inline-block; text-decoration: none; padding: 8px 16px; margin-top: 5px;">Ajánlat megtekintése &rarr;</a>
        </div>
      `;
    }
