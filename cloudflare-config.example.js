/**
 * Exemple de configuration Cloudflare R2.
 *
 * Les identifiants sensibles sont désormais chargés via des variables
 * d'environnement. Pour configurer le projet :
 *
 * 1. Copiez le fichier `.env.example` vers `.env`
 *    cp .env.example .env
 *
 * 2. Renseignez vos identifiants Cloudflare dans `.env`
 *    - CLOUDFLARE_ACCOUNT_ID
 *    - CLOUDFLARE_ACCESS_KEY_ID
 *    - CLOUDFLARE_SECRET_ACCESS_KEY
 *    - CLOUDFLARE_BUCKET_NAME
 *    - CLOUDFLARE_BASE_URL
 *    - CLOUDFLARE_AUTH_TOKEN
 *
 * 3. Facultatif : mettez à jour la liste des icônes disponibles
 *    via CLOUDFLARE_AVAILABLE_ICONS (séparées par des virgules).
 *
 * 4. Exécutez les scripts Cloudflare comme auparavant :
 *    npm run cloudflare:test
 *    npm run cloudflare:upload
 *
 * Ce fichier exporte uniquement la liste par défaut des icônes afin
 * de documenter les noms utilisés dans le bucket.
 */

export const DEFAULT_AVAILABLE_ICONS = [
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
