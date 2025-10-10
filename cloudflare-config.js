// Minimal client-safe Cloudflare config for VitePress docs
// Avoids Node-specific logic; uses a public base URL by default.

const asString = (v) => (v == null ? '' : String(v));
const parseList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};
const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const runtimeEnv = (typeof process !== 'undefined' && process.env) ? process.env : {};

const DEFAULT_BASE_URL = 'https://images.mongulu.cm/icons-fasaha';
const DEFAULT_AVAILABLE_ICONS = [
  'google-fonts-icon-calebasse-bw',
  'google-fonts-icon-calebasse',
  'google-fonts-icon-cloche-base-bw',
  'google-fonts-icon-cloche-double',
  'google-fonts-icon-embleme-foumban-bw',
  'google-fonts-icon-embleme-foumban',
  'google-fonts-icon-masque-elephant-bw',
  'google-fonts-icon-masque-elephant',
  'google-fonts-icon-entree-chefferie-bw',
  'google-fonts-icon-entree-chefferie',
  'google-fonts-icon-calebasse-perlee1-bw',
  'google-fonts-icon-calebasse-perlee1',
  'google-fonts-icon-calebasse-perlee2-bw',
  'google-fonts-icon-calebasse-perlee2',
  'google-fonts-icon-calebasse-perlee3-bw',
  'google-fonts-icon-calebasse-perlee3',
  'google-fonts-icon-calebasse-perlee4-bw',
  'google-fonts-icon-calebasse-perlee4',
  'google-fonts-icon-masque-batcham-bw',
  'google-fonts-icon-masque-batcham'
];
const envAvailableIcons =
  env.VITE_CLOUDFLARE_AVAILABLE_ICONS ??
  env.CLOUDFLARE_AVAILABLE_ICONS ??
  runtimeEnv.VITE_CLOUDFLARE_AVAILABLE_ICONS ??
  runtimeEnv.CLOUDFLARE_AVAILABLE_ICONS ??
  '';

const baseUrlEnv =
  env.VITE_CLOUDFLARE_BASE_URL ??
  env.CLOUDFLARE_BASE_URL ??
  runtimeEnv.VITE_CLOUDFLARE_BASE_URL ??
  runtimeEnv.CLOUDFLARE_BASE_URL ??
  DEFAULT_BASE_URL;
const baseUrl = asString(baseUrlEnv).replace(/\/$/, '');
const availableIcons = (() => {
  const icons = parseList(envAvailableIcons);
  return icons.length ? icons : DEFAULT_AVAILABLE_ICONS;
})();

export const CLOUDFLARE_CONFIG = {
  accountId: '',
  accessKeyId: '',
  secretAccessKey: '',
  bucketName: 'icons-fasaha',
  baseUrl,
  availableIcons,
  requestHeaders: { 'Content-Type': 'image/svg+xml' }
};

export default CLOUDFLARE_CONFIG;
