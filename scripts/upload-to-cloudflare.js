#!/usr/bin/env node

// Script pour uploader les icônes SVG vers Cloudflare R2

const fs = require('fs');
const path = require('path');
const https = require('https');

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Charger la configuration depuis le fichier de configuration
let CLOUDFLARE_CONFIG;

try {
  CLOUDFLARE_CONFIG = require('../cloudflare-config.js').CLOUDFLARE_CONFIG;
} catch (error) {
  log('❌ Impossible de charger la configuration Cloudflare', 'red');
  log('💡 Créez le fichier cloudflare-config.js avec vos vraies valeurs', 'yellow');
  process.exit(1);
}

/**
 * Upload un fichier SVG vers Cloudflare R2
 */
async function uploadSvgToCloudflare(fileName, filePath) {
  return new Promise((resolve) => {
    const fileContent = fs.readFileSync(filePath);
    const url = `https://${CLOUDFLARE_CONFIG.accountId}.r2.cloudflarestorage.com/${CLOUDFLARE_CONFIG.bucketName}/${fileName}`;

    const options = {
      method: 'PUT',
      headers: {
        ...CLOUDFLARE_CONFIG.requestHeaders,
        'Content-Type': 'image/svg+xml',
        'Content-Length': Buffer.byteLength(fileContent)
      }
    };

    const req = https.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          log(`✅ ${fileName} uploadé avec succès (${fileContent.length} octets)`, 'green');
          resolve(true);
        } else {
          log(`❌ Échec upload ${fileName} (${res.statusCode}): ${data}`, 'red');
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      log(`❌ Erreur lors de l'upload de ${fileName}: ${error.message}`, 'red');
      resolve(false);
    });

    req.write(fileContent);
    req.end();
  });
}

/**
 * Upload tous les fichiers SVG du répertoire assets vers Cloudflare R2
 */
async function uploadAllSvgs() {
  const assetsDir = path.join(__dirname, '../assets');

  // Vérifier si le répertoire assets existe
  if (!fs.existsSync(assetsDir)) {
    log('❌ Répertoire assets non trouvé', 'red');
    log('💡 Créez le répertoire assets et ajoutez vos fichiers SVG', 'yellow');
    return;
  }

  // Lister tous les fichiers SVG
  const svgFiles = fs.readdirSync(assetsDir)
    .filter(file => file.endsWith('.svg'))
    .map(file => ({
      name: file,
      path: path.join(assetsDir, file)
    }));

  if (svgFiles.length === 0) {
    log('❌ Aucun fichier SVG trouvé dans assets/', 'red');
    return;
  }

  log(`📁 ${svgFiles.length} fichiers SVG trouvés dans assets/`, 'blue');

  let successCount = 0;
  let errorCount = 0;

  // Upload chaque fichier
  for (const file of svgFiles) {
    const success = await uploadSvgToCloudflare(file.name, file.path);
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }

    // Petite pause entre les uploads pour éviter de surcharger
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  log(`\n📊 Résultats de l'upload:`, 'bright');
  log(`✅ ${successCount} fichiers uploadés avec succès`, 'green');
  if (errorCount > 0) {
    log(`❌ ${errorCount} échecs`, 'red');
  }

  if (successCount === svgFiles.length) {
    log('\n🎉 Tous les fichiers SVG ont été uploadés avec succès !', 'green');
    log(`🌐 Vos icônes sont maintenant disponibles sur:`, 'cyan');
    log(`   https://${CLOUDFLARE_CONFIG.accountId}.r2.cloudflarestorage.com/${CLOUDFLARE_CONFIG.bucketName}/`, 'cyan');
  }
}

/**
 * Afficher les instructions d'utilisation
 */
function showInstructions() {
  log('\n📋 Upload vers Cloudflare R2:', 'bright');
  log('=' .repeat(50), 'bright');

  log('\n1️⃣  Préparez vos fichiers SVG:', 'cyan');
  log('   📁 Créez le répertoire assets/ à la racine du projet', 'cyan');
  log('   🎨 Ajoutez vos fichiers SVG (elephant.svg, baobab.svg, etc.)', 'cyan');

  log('\n2️⃣  Configurez Cloudflare:', 'cyan');
  log('   🔑 Utilisez le fichier cloudflare-config.js existant', 'cyan');
  log('   📦 Vérifiez que le bucket "icons-fasaha" existe', 'cyan');

  log('\n3️⃣  Lancez l\'upload:', 'cyan');
  log('   npm run cloudflare:upload', 'cyan');

  log('\n4️⃣  Vérifiez le résultat:', 'cyan');
  log('   npm run cloudflare:test', 'cyan');
}

/**
 * Fonction principale
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showInstructions();
    return;
  }

  if (args.includes('--instructions')) {
    showInstructions();
    return;
  }

  // Vérifier la configuration
  if (!CLOUDFLARE_CONFIG.accountId || !CLOUDFLARE_CONFIG.accessKeyId) {
    log('❌ Configuration Cloudflare incomplète', 'red');
    log('💡 Vérifiez le fichier cloudflare-config.js', 'yellow');
    return;
  }

  log('🚀 Upload des icônes SVG vers Cloudflare R2...', 'bright');
  log(`📦 Bucket: ${CLOUDFLARE_CONFIG.bucketName}`, 'cyan');
  log(`🔑 Account: ${CLOUDFLARE_CONFIG.accountId}`, 'cyan');

  await uploadAllSvgs();
}

// Exporter pour utilisation en module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { uploadAllSvgs };
}

if (require.main === module) {
  main();
}
