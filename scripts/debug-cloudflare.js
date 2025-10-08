#!/usr/bin/env node

// Script de débogage détaillé pour Cloudflare R2

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
  log('✅ Configuration chargée avec succès', 'green');
} catch (error) {
  log('❌ Impossible de charger la configuration Cloudflare', 'red');
  log('💡 Créez le fichier cloudflare-config.js avec vos vraies valeurs', 'yellow');
  process.exit(1);
}

/**
 * Test de base de la configuration
 */
function testConfiguration() {
  log('\n🔧 Vérification de la configuration:', 'bright');

  const requiredFields = [
    { name: 'accountId', value: CLOUDFLARE_CONFIG.accountId },
    { name: 'accessKeyId', value: CLOUDFLARE_CONFIG.accessKeyId },
    { name: 'secretAccessKey', value: CLOUDFLARE_CONFIG.secretAccessKey },
    { name: 'bucketName', value: CLOUDFLARE_CONFIG.bucketName },
    { name: 'baseUrl', value: CLOUDFLARE_CONFIG.baseUrl }
  ];

  let allValid = true;

  requiredFields.forEach(field => {
    if (field.value && field.value !== `your-${field.name}`) {
      log(`✅ ${field.name}: ${field.value.substring(0, 20)}...`, 'green');
    } else {
      log(`❌ ${field.name}: Valeur manquante ou par défaut`, 'red');
      allValid = false;
    }
  });

  return allValid;
}

/**
 * Test de connexion simple
 */
async function testSimpleConnection() {
  return new Promise((resolve) => {
    log('\n🌐 Test de connexion simple...', 'blue');

    const testUrl = CLOUDFLARE_CONFIG.baseUrl + '/';

    const options = {
      method: 'GET',
      headers: CLOUDFLARE_CONFIG.requestHeaders
    };

    const req = https.request(testUrl, options, (res) => {
      log(`📊 Status: ${res.statusCode}`, 'cyan');
      log(`📝 Headers: ${JSON.stringify(res.headers, null, 2)}`, 'cyan');

      if (res.statusCode === 200) {
        log('✅ Connexion réussie !', 'green');
        resolve(true);
      } else {
        log(`❌ Échec de connexion (${res.statusCode})`, 'red');
        resolve(false);
      }
    });

    req.on('error', (error) => {
      log(`❌ Erreur de connexion: ${error.message}`, 'red');
      resolve(false);
    });

    req.end();
  });
}

/**
 * Test avec une icône spécifique
 */
async function testSpecificIcon() {
  return new Promise((resolve) => {
    log('\n🎨 Test avec une icône spécifique...', 'blue');

    const testIcon = CLOUDFLARE_CONFIG.availableIcons[0] || 'elephant';
    const testUrl = `${CLOUDFLARE_CONFIG.baseUrl}/${testIcon}.svg`;

    log(`🔗 URL de test: ${testUrl}`, 'cyan');

    const options = {
      method: 'HEAD',
      headers: CLOUDFLARE_CONFIG.requestHeaders
    };

    const req = https.request(testUrl, options, (res) => {
      log(`📊 Status: ${res.statusCode}`, 'cyan');

      if (res.statusCode === 200) {
        log(`✅ Icône ${testIcon}.svg accessible !`, 'green');
        log(`📏 Taille: ${res.headers['content-length']} octets`, 'cyan');
        log(`📄 Type: ${res.headers['content-type']}`, 'cyan');
        resolve(true);
      } else {
        log(`❌ Icône ${testIcon}.svg non accessible (${res.statusCode})`, 'red');
        resolve(false);
      }
    });

    req.on('error', (error) => {
      log(`❌ Erreur lors du test de l'icône: ${error.message}`, 'red');
      resolve(false);
    });

    req.end();
  });
}

/**
 * Test de téléchargement d'une icône
 */
async function testIconDownload() {
  return new Promise((resolve) => {
    log('\n📥 Test de téléchargement d\'icône...', 'blue');

    const testIcon = CLOUDFLARE_CONFIG.availableIcons[0] || 'elephant';
    const testUrl = `${CLOUDFLARE_CONFIG.baseUrl}/${testIcon}.svg`;

    const options = {
      method: 'GET',
      headers: CLOUDFLARE_CONFIG.requestHeaders
    };

    const req = https.request(testUrl, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          log(`✅ Téléchargement réussi !`, 'green');
          log(`📏 Taille du contenu: ${data.length} caractères`, 'cyan');

          // Vérifier que c'est bien du SVG
          if (data.includes('<svg') && data.includes('</svg>')) {
            log('✅ Contenu SVG valide détecté', 'green');
          } else {
            log('⚠️  Contenu ne semble pas être du SVG valide', 'yellow');
          }

          // Afficher un extrait du contenu
          const preview = data.substring(0, 200) + (data.length > 200 ? '...' : '');
          log(`👀 Aperçu du contenu:`, 'cyan');
          log(preview, 'cyan');

          resolve(true);
        } else {
          log(`❌ Échec du téléchargement (${res.statusCode})`, 'red');
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      log(`❌ Erreur lors du téléchargement: ${error.message}`, 'red');
      resolve(false);
    });

    req.end();
  });
}

/**
 * Afficher un résumé des tests
 */
function showTestSummary(results) {
  log('\n📊 Résumé des tests:', 'bright');
  log('=' .repeat(50), 'bright');

  const { config, connection, icon, download } = results;

  if (config) log('✅ Configuration: Valide', 'green');
  else log('❌ Configuration: Problèmes détectés', 'red');

  if (connection) log('✅ Connexion de base: Réussie', 'green');
  else log('❌ Connexion de base: Échec', 'red');

  if (icon) log('✅ Accès aux icônes: Réussi', 'green');
  else log('❌ Accès aux icônes: Échec', 'red');

  if (download) log('✅ Téléchargement: Réussi', 'green');
  else log('❌ Téléchargement: Échec', 'red');

  const successCount = [config, connection, icon, download].filter(Boolean).length;
  log(`\n🎯 Score: ${successCount}/4 tests réussis`, 'bright');

  if (successCount === 4) {
    log('🎉 Tous les tests sont passés ! Cloudflare R2 est prêt.', 'green');
  } else if (successCount >= 2) {
    log('⚠️  Quelques problèmes détectés. Consultez les détails ci-dessus.', 'yellow');
  } else {
    log('❌ Problèmes majeurs détectés. Vérifiez votre configuration.', 'red');
  }
}

/**
 * Fonction principale
 */
async function main() {
  log('🔍 Débogage Cloudflare R2 - Icons Fasaha', 'bright');
  log('=' .repeat(50), 'bright');

  // Test 1: Configuration
  const configValid = testConfiguration();

  if (!configValid) {
    log('\n❌ Configuration invalide. Arrêt du débogage.', 'red');
    return;
  }

  // Test 2: Connexion de base
  const connectionOk = await testSimpleConnection();

  // Test 3: Accès aux icônes
  const iconOk = await testSpecificIcon();

  // Test 4: Téléchargement
  const downloadOk = await testIconDownload();

  // Résumé
  showTestSummary({
    config: configValid,
    connection: connectionOk,
    icon: iconOk,
    download: downloadOk
  });
}

if (require.main === module) {
  main();
}
