#!/usr/bin/env node

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

// Fonction pour copier le fichier JSON vers le répertoire public
function updateSearchData() {
  const sourcePath = path.join(__dirname, '../docs/.vitepress/data/icons.json');
  const targetPath = path.join(__dirname, '../docs/.vitepress/public/icons.json');
  
  if (!fs.existsSync(sourcePath)) {
    log('❌ Fichier source non trouvé. Exécutez d\'abord: npm run svg:data', 'red');
    return false;
  }
  
  try {
    // Lire le fichier source
    const data = fs.readFileSync(sourcePath, 'utf8');
    
    // Créer le répertoire public s'il n'existe pas
    const publicDir = path.dirname(targetPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Copier vers le répertoire public
    fs.writeFileSync(targetPath, data);
    
    log(`✅ Données de recherche mises à jour: ${targetPath}`, 'green');
    return true;
  } catch (error) {
    log(`❌ Erreur lors de la mise à jour: ${error.message}`, 'red');
    return false;
  }
}

// Fonction pour vérifier si les données sont à jour
function checkDataFreshness() {
  const dataPath = path.join(__dirname, '../docs/.vitepress/data/icons.json');
  const publicPath = path.join(__dirname, '../docs/.vitepress/public/icons.json');
  
  if (!fs.existsSync(dataPath) || !fs.existsSync(publicPath)) {
    return false;
  }
  
  const dataStat = fs.statSync(dataPath);
  const publicStat = fs.statSync(publicPath);
  
  return dataStat.mtime > publicStat.mtime;
}

// Fonction principale
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    log(`
Usage: node scripts/update-search-data.js [options]

Options:
  --help, -h    Afficher cette aide
  --force       Forcer la mise à jour même si les données sont à jour

Description:
  Met à jour les données de recherche en copiant le fichier JSON
  du répertoire data vers le répertoire public pour VitePress.
    `, 'cyan');
    return;
  }
  
  const force = args.includes('--force');
  
  if (!force && !checkDataFreshness()) {
    log('ℹ️  Les données de recherche sont déjà à jour', 'blue');
    return;
  }
  
  log('🔄 Mise à jour des données de recherche...', 'blue');
  
  if (updateSearchData()) {
    log('🎉 Mise à jour terminée avec succès !', 'green');
  } else {
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
