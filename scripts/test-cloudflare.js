#!/usr/bin/env node

// Script pour tester la connexion à Cloudflare R2

const https = require('https');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { loadProjectEnv } = require('./utils/load-env.js');

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

loadProjectEnv();

let CLOUDFLARE_CONFIG;

async function loadCloudflareConfig() {
  if (CLOUDFLARE_CONFIG) return CLOUDFLARE_CONFIG;

  try {
    const module = await import(
      pathToFileURL(path.resolve(__dirname, '../cloudflare-config.mjs'))
    );
    CLOUDFLARE_CONFIG = module.CLOUDFLARE_CONFIG || module.default;
    return CLOUDFLARE_CONFIG;
  } catch (error) {
    console.error('❌ Impossible de charger la configuration Cloudflare');
    console.error('💡 Vérifiez que le fichier .env est présent et correctement rempli');
    throw error;
  }
}
const REQUIRED_CONFIG_KEYS = ['accountId', 'accessKeyId', 'secretAccessKey', 'bucketName', 'baseUrl'];

/**
 * Teste la connexion à Cloudflare R2
 */
async function testCloudflareConnection() {
  return new Promise((resolve) => {
    log('🔗 Test de connexion à Cloudflare R2...', 'blue');
    log(`📦 Bucket: ${CLOUDFLARE_CONFIG.bucketName}`, 'cyan');
    log(`🔑 Account ID: ${CLOUDFLARE_CONFIG.accountId}`, 'cyan');

    // URL de test (une icône qui devrait exister)
    const testIcon = CLOUDFLARE_CONFIG.availableIcons[0] || 'elephant'
    const testUrl = `https://${CLOUDFLARE_CONFIG.accountId}.r2.cloudflarestorage.com/${CLOUDFLARE_CONFIG.bucketName}/${testIcon}.svg`;

    const options = {
      method: 'HEAD',
      headers: CLOUDFLARE_CONFIG.requestHeaders
    };

    const req = https.request(testUrl, options, (res) => {
      if (res.statusCode === 200) {
        log('✅ Connexion à Cloudflare R2 réussie !', 'green');
        log(`📁 Bucket accessible: ${CLOUDFLARE_CONFIG.bucketName}`, 'cyan');
        log(`🔗 URL de base: https://${CLOUDFLARE_CONFIG.accountId}.r2.cloudflarestorage.com/${CLOUDFLARE_CONFIG.bucketName}`, 'cyan');
        resolve(true);
      } else {
        log(`❌ Erreur de connexion (${res.statusCode}): ${res.statusMessage}`, 'red');
        resolve(false);
      }
    });

    req.on('error', (error) => {
      log(`❌ Erreur de connexion: ${error.message}`, 'red');
      log('💡 Vérifiez vos clés d\'accès Cloudflare R2', 'yellow');
      resolve(false);
    });

    req.end();
  });
}

/**
 * Affiche les instructions de configuration
 */
function showInstructions() {
  log('\n📋 Instructions de configuration Cloudflare R2:', 'bright');
  log('=' .repeat(50), 'bright');

  log('\n1️⃣  Créez un compte Cloudflare:', 'cyan');
  log('   https://www.cloudflare.com/', 'cyan');

  log('\n2️⃣  Activez Cloudflare R2:', 'cyan');
  log('   https://developers.cloudflare.com/r2/', 'cyan');

  log('\n3️⃣  Créez un bucket:', 'cyan');
  log('   - Nom: icons-fasaha', 'cyan');
  log('   - Location: Automatic', 'cyan');

  log('\n4️⃣  Générez des clés d\'accès:', 'cyan');
  log('   - Dashboard > R2 > API Tokens', 'cyan');
  log('   - Create Token > Edit permissions', 'cyan');
  log('   - Object Read permissions', 'cyan');

  log('\n5️⃣  Configurez vos variables d\'environnement (.env):', 'cyan');
  log('   cp .env.example .env', 'cyan');
  log('   Éditez .env avec vos vraies valeurs Cloudflare', 'cyan');

  log('\n6️⃣  Uploadez vos icônes SVG:', 'cyan');
  log('   - Nommez-les: elephant.svg, baobab.svg, etc.', 'cyan');
  log('   - Uploadez dans le bucket R2', 'cyan');

  log('\n7️⃣  Testez la connexion:', 'cyan');
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

  try {
    await loadCloudflareConfig();
  } catch {
    process.exit(1);
  }

  const envPath = path.join(__dirname, '../.env');
  if (!process.env.CLOUDFLARE_ACCOUNT_ID && !fs.existsSync(envPath)) {
    log('❌ Fichier .env introuvable', 'red');
    log('💡 Exécutez: cp .env.example .env et remplissez les informations Cloudflare', 'yellow');
    return;
  }

  const missingKeys = REQUIRED_CONFIG_KEYS.filter((key) => {
    const value = CLOUDFLARE_CONFIG[key];
    return !value || !String(value).trim();
  });

  if (missingKeys.length) {
    log('❌ Configuration Cloudflare incomplète', 'red');
    log(`💡 Variables manquantes: ${missingKeys.join(', ')}`, 'yellow');
    log('📄 Complétez votre fichier .env avec les informations Cloudflare', 'yellow');
    showInstructions();
    return;
  }

  // Tester la connexion
  const isConnected = await testCloudflareConnection();

  if (isConnected) {
    log('\n🎉 Configuration Cloudflare R2 prête !', 'green');
    log('🚀 Vos icônes sont maintenant accessibles depuis le cloud', 'green');
  } else {
    log('\n❌ Échec de la connexion à Cloudflare R2', 'red');
    log('💡 Vérifiez vos clés d\'accès et la configuration', 'yellow');
    showInstructions();
  }
}

if (require.main === module) {
  main();
}
