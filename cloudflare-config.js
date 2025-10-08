// Configuration Cloudflare R2 - Production
// Fichier généré avec les vraies clés d'accès

export const CLOUDFLARE_CONFIG = {
  // Informations du compte Cloudflare
  accountId: '2a3427fe121675c28f8b777abf693478',

  // Clés d'accès API (fournies par l'utilisateur)
  accessKeyId: '__REDACTED_TOKEN__',
  secretAccessKey: '__REDACTED_TOKEN__',

  // Nom du bucket R2
  bucketName: 'icons-fasaha',

  // URL de base pour accéder aux fichiers (domaine personnalisé)
  baseUrl: 'https://images.mongulu.cm/icons-fasaha',

  // Liste des icônes disponibles dans le bucket
  availableIcons: [
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
  ],

  // Headers pour les requêtes
  requestHeaders: {
    'Authorization': 'Bearer __REDACTED_TOKEN__',
    'Content-Type': 'image/svg+xml'
  }
}

// Export des utilitaires pour faciliter l'utilisation
export { CLOUDFLARE_CONFIG as default }
