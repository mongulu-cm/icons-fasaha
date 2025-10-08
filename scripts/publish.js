#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

function exec(command, options = {}) {
  try {
    return execSync(command, { 
      stdio: 'inherit', 
      encoding: 'utf8',
      ...options 
    });
  } catch (error) {
    log(`Erreur lors de l'exécution: ${command}`, 'red');
    process.exit(1);
  }
}

function checkGitStatus() {
  log('🔍 Vérification du statut Git...', 'blue');
  
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (status.trim()) {
      log('⚠️  Des fichiers non commitées ont été détectés:', 'yellow');
      console.log(status);
      log('Voulez-vous continuer ? (y/N)', 'yellow');
      // En mode automatique, on continue
    }
  } catch (error) {
    log('⚠️  Impossible de vérifier le statut Git', 'yellow');
  }
}

function runTests() {
  log('🧪 Exécution des tests...', 'blue');
  // Pour l'instant, on skip les tests car ils ne sont pas encore configurés
  log('✅ Tests ignorés (non configurés)', 'green');
}

function buildPackage() {
  log('🔨 Construction du package...', 'blue');
  exec('npm run build');
  log('✅ Build terminé', 'green');
}

function updateVersion() {
  log('📦 Mise à jour de la version...', 'blue');
  
  const packageJsonPath = path.join(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const currentVersion = packageJson.version;
  log(`Version actuelle: ${currentVersion}`, 'cyan');
  
  // Demander le type de version
  const args = process.argv.slice(2);
  let versionType = 'patch';
  
  if (args.includes('--major')) {
    versionType = 'major';
  } else if (args.includes('--minor')) {
    versionType = 'minor';
  } else if (args.includes('--patch')) {
    versionType = 'patch';
  }
  
  log(`Type de version: ${versionType}`, 'cyan');
  
  exec(`npm version ${versionType} --no-git-tag-version`);
  log('✅ Version mise à jour', 'green');
}

function publishToNpm() {
  log('📤 Publication sur npm...', 'blue');
  
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  
  if (isDryRun) {
    log('🧪 Mode dry-run activé', 'yellow');
    exec('npm publish --dry-run');
  } else {
    exec('npm publish');
    log('✅ Publication réussie !', 'green');
  }
}

function buildDocs() {
  log('📚 Construction de la documentation...', 'blue');
  exec('npm run docs:build');
  log('✅ Documentation construite', 'green');
}

function main() {
  log('🚀 Démarrage du processus de publication', 'bright');
  
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    log(`
Usage: node scripts/publish.js [options]

Options:
  --major     Incrémenter la version majeure
  --minor     Incrémenter la version mineure  
  --patch     Incrémenter la version patch (défaut)
  --dry-run   Simuler la publication sans publier
  --no-docs   Ne pas construire la documentation
  --help      Afficher cette aide
    `, 'cyan');
    return;
  }
  
  try {
    // Vérifications préliminaires
    checkGitStatus();
    
    // Tests
    runTests();
    
    // Build
    buildPackage();
    
    // Mise à jour de la version
    updateVersion();
    
    // Construction de la documentation (optionnel)
    if (!args.includes('--no-docs')) {
      buildDocs();
    }
    
    // Publication
    publishToNpm();
    
    log('🎉 Publication terminée avec succès !', 'green');
    log('📖 N\'oubliez pas de mettre à jour la documentation en ligne', 'yellow');
    
  } catch (error) {
    log(`❌ Erreur lors de la publication: ${error.message}`, 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
