// Configuration Cloudflare R2 - Exemple
// Copiez ce fichier vers cloudflare-config.js et remplacez par vos vraies valeurs

export const CLOUDFLARE_CONFIG = {
  // Informations du compte Cloudflare
  accountId: 'your-cloudflare-account-id',

  // Clés d'accès (à obtenir depuis le dashboard Cloudflare)
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',

  // Nom du bucket R2
  bucketName: 'icons-fasaha',

  // URL de base pour accéder aux fichiers
  baseUrl: 'https://your-account-id.r2.cloudflarestorage.com/icons-fasaha',

  // Liste des icônes disponibles
  availableIcons: [
    'elephant',
    'baobab',
    'drum',
    'chefferie',
    'emblemefoumban',
    'masktukah'
  ]
}

// Instructions d'installation :
// 1. Créez un compte Cloudflare (https://www.cloudflare.com/)
// 2. Activez Cloudflare R2 (https://developers.cloudflare.com/r2/)
// 3. Créez un bucket nommé "icons-fasaha"
// 4. Générez des clés d'accès API (https://developers.cloudflare.com/r2/api/tokens/)
// 5. Uploadez vos fichiers SVG dans le bucket
// 6. Copiez ce fichier vers cloudflare-config.js avec vos vraies valeurs
// 7. Importez dans vos composants : import { CLOUDFLARE_CONFIG } from '../cloudflare-config.js'

// Pour tester la connexion :
// Vous pouvez utiliser l'API de test fournie dans cloudflare-utils.js
