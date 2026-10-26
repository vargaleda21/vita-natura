#!/usr/bin/env bash
# Build and deploy the web app to https://daleday.digital1.one.
# The new release is unpacked beside the live one and swapped in; the previous one is kept as .prev.
# The server is not in the repo: set DEPLOY_HOST (user@host) and DEPLOY_KEY (an SSH key file),
# or put them in scripts/deploy.env (gitignored).
set -euo pipefail
cd "$(dirname "$0")/.."
[ -f scripts/deploy.env ] && . scripts/deploy.env
HOST="${DEPLOY_HOST:?set DEPLOY_HOST=user@host, or create scripts/deploy.env}"
KEY="${DEPLOY_KEY:?set DEPLOY_KEY to the SSH key file}"
DOCROOT="/var/www/daleday.digital1.one"

[ "${SKIP_BUILD:-0}" = "1" ] || node scripts/build-web.mjs dist
test -f dist/index.html

tar -C dist -czf - . | ssh -i "$KEY" -o BatchMode=yes "$HOST" "set -e
  rm -rf $DOCROOT.new && mkdir -p $DOCROOT.new && tar --no-same-owner -C $DOCROOT.new -xzf -
  test -f $DOCROOT.new/index.html
  chmod -R a+rX $DOCROOT.new
  rm -rf $DOCROOT.prev
  if [ -d $DOCROOT ]; then mv $DOCROOT $DOCROOT.prev; fi
  mv $DOCROOT.new $DOCROOT
  echo swapped"

for path in / /manifest.webmanifest /apple-touch-icon.png; do
  printf '%-24s ' "$path"
  curl -sS -o /dev/null -w '%{http_code} %{content_type}\n' "https://daleday.digital1.one$path"
done
