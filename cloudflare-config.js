// Minimal client-safe Cloudflare config for VitePress docs
// Avoids Node-specific logic; uses a public base URL by default.

const asString = (v) => (v == null ? '' : String(v));
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};

const DEFAULT_BASE_URL = 'https://images.mongulu.cm/icons-fasaha';
const baseUrl = asString(env.VITE_CLOUDFLARE_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, '');

export const CLOUDFLARE_CONFIG = {
  accountId: '',
  accessKeyId: '',
  secretAccessKey: '',
  bucketName: 'icons-fasaha',
  baseUrl,
  availableIcons: [
    'elephant',
    'baobab',
    'drum',
    'chefferie',
    'emblemefoumban',
    'masktukah'
  ],
  requestHeaders: { 'Content-Type': 'image/svg+xml' }
};

export default CLOUDFLARE_CONFIG;


