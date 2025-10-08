#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

// Interface pour lire les entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Fonction pour nettoyer le nom du fichier
function cleanName(filename) {
  return filename
    .replace('.svg', '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^[0-9]/, '')
    .split('')
    .map((char, index) => index === 0 ? char.toUpperCase() : char)
    .join('');
}

// Fonction pour valider le contenu SVG
function validateSvgContent(content) {
  const hasSvgTag = content.includes('<svg');
  const hasClosingSvgTag = content.includes('</svg>');
  const hasViewBox = content.includes('viewBox=');
  
  return {
    isValid: hasSvgTag && hasClosingSvgTag,
    hasViewBox,
    errors: [
      !hasSvgTag && 'Balise <svg> manquante',
      !hasClosingSvgTag && 'Balise </svg> fermante manquante',
      !hasViewBox && 'Attribut viewBox manquant (recommandé)'
    ].filter(Boolean)
  };
}

// Fonction pour créer un fichier SVG
async function createSvgFile() {
  log('🎨 Création d\'un nouveau fichier SVG', 'blue');
  
  const filename = await question('📝 Nom du fichier (sans extension .svg): ');
  const componentName = cleanName(filename);
  
  log(`\n📋 Nom du composant généré: ${componentName}`, 'cyan');
  
  const svgContent = await question('\n📝 Collez le contenu SVG complet (avec les balises <svg>):\n');
  
  // Valider le contenu SVG
  const validation = validateSvgContent(svgContent);
  
  if (!validation.isValid) {
    log('\n❌ Contenu SVG invalide:', 'red');
    validation.errors.forEach(error => log(`  - ${error}`, 'red'));
    return;
  }
  
  if (!validation.hasViewBox) {
    log('\n⚠️  Avertissement: Attribut viewBox manquant', 'yellow');
    const addViewBox = await question('Voulez-vous ajouter un viewBox par défaut (0 0 24 24)? (y/N): ');
    
    if (addViewBox.toLowerCase() === 'y' || addViewBox.toLowerCase() === 'yes') {
      const modifiedContent = svgContent.replace('<svg', '<svg viewBox="0 0 24 24"');
      await saveSvgFile(filename, modifiedContent);
    } else {
      await saveSvgFile(filename, svgContent);
    }
  } else {
    await saveSvgFile(filename, svgContent);
  }
}

// Fonction pour sauvegarder le fichier SVG
async function saveSvgFile(filename, content) {
  const svgDir = path.join(__dirname, '../assets/svg');
  const filePath = path.join(svgDir, `${filename}.svg`);
  
  // Créer le répertoire s'il n'existe pas
  if (!fs.existsSync(svgDir)) {
    fs.mkdirSync(svgDir, { recursive: true });
  }
  
  // Vérifier si le fichier existe déjà
  if (fs.existsSync(filePath)) {
    const overwrite = await question(`⚠️  Le fichier ${filename}.svg existe déjà. Voulez-vous l'écraser? (y/N): `);
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      log('❌ Opération annulée', 'red');
      return;
    }
  }
  
  try {
    fs.writeFileSync(filePath, content);
    log(`✅ Fichier SVG créé: ${filePath}`, 'green');
    
    // Proposer de traiter immédiatement
    const processNow = await question('\n🔄 Voulez-vous traiter ce fichier maintenant pour générer le composant? (Y/n): ');
    if (processNow.toLowerCase() !== 'n' && processNow.toLowerCase() !== 'no') {
      log('\n🔄 Traitement du fichier...', 'blue');
      const { processSvgAssets } = require('./process-svg-assets.js');
      processSvgAssets();
    }
    
  } catch (error) {
    log(`❌ Erreur lors de la création du fichier: ${error.message}`, 'red');
  }
}

// Fonction pour lister les fichiers SVG existants
function listSvgFiles() {
  const svgDir = path.join(__dirname, '../assets/svg');
  
  if (!fs.existsSync(svgDir)) {
    log('📁 Le répertoire assets/svg n\'existe pas', 'yellow');
    return;
  }
  
  const files = fs.readdirSync(svgDir).filter(file => file.endsWith('.svg'));
  
  if (files.length === 0) {
    log('📁 Aucun fichier SVG trouvé dans assets/svg', 'yellow');
    return;
  }
  
  log('\n📁 Fichiers SVG existants:', 'cyan');
  files.forEach(file => {
    const componentName = cleanName(file);
    log(`  - ${file} → ${componentName}`, 'cyan');
  });
}

// Fonction pour supprimer un fichier SVG
async function deleteSvgFile() {
  const svgDir = path.join(__dirname, '../assets/svg');
  
  if (!fs.existsSync(svgDir)) {
    log('📁 Le répertoire assets/svg n\'existe pas', 'yellow');
    return;
  }
  
  const files = fs.readdirSync(svgDir).filter(file => file.endsWith('.svg'));
  
  if (files.length === 0) {
    log('📁 Aucun fichier SVG trouvé', 'yellow');
    return;
  }
  
  log('\n📁 Fichiers SVG disponibles:', 'cyan');
  files.forEach((file, index) => {
    log(`  ${index + 1}. ${file}`, 'cyan');
  });
  
  const choice = await question('\n📝 Numéro du fichier à supprimer (ou 0 pour annuler): ');
  const index = parseInt(choice) - 1;
  
  if (index < 0 || index >= files.length) {
    log('❌ Opération annulée', 'red');
    return;
  }
  
  const filename = files[index];
  const confirm = await question(`⚠️  Êtes-vous sûr de vouloir supprimer ${filename}? (y/N): `);
  
  if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
    const filePath = path.join(svgDir, filename);
    fs.unlinkSync(filePath);
    log(`✅ Fichier supprimé: ${filename}`, 'green');
    
    // Proposer de retraiter les composants
    const reprocess = await question('\n🔄 Voulez-vous retraiter tous les SVG pour mettre à jour les composants? (Y/n): ');
    if (reprocess.toLowerCase() !== 'n' && reprocess.toLowerCase() !== 'no') {
      log('\n🔄 Retraitement des fichiers...', 'blue');
      const { processSvgAssets } = require('./process-svg-assets.js');
      processSvgAssets();
    }
  } else {
    log('❌ Opération annulée', 'red');
  }
}

// Menu principal
async function showMenu() {
  log('\n🎨 Gestionnaire d\'assets SVG - Icons Fasaha', 'bright');
  log('==========================================', 'bright');
  log('1. 📝 Créer un nouveau fichier SVG');
  log('2. 📁 Lister les fichiers SVG existants');
  log('3. 🗑️  Supprimer un fichier SVG');
  log('4. 🔄 Traiter tous les SVG (générer les composants)');
  log('5. ❌ Quitter');
  
  const choice = await question('\n📝 Votre choix (1-5): ');
  
  switch (choice) {
    case '1':
      await createSvgFile();
      break;
    case '2':
      listSvgFiles();
      break;
    case '3':
      await deleteSvgFile();
      break;
    case '4':
      log('\n🔄 Traitement de tous les SVG...', 'blue');
      const { processSvgAssets } = require('./process-svg-assets.js');
      processSvgAssets();
      break;
    case '5':
      log('👋 Au revoir !', 'green');
      rl.close();
      return;
    default:
      log('❌ Choix invalide', 'red');
  }
  
  // Afficher le menu à nouveau
  await showMenu();
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    log(`
Usage: node scripts/add-svg.js [options]

Options:
  --help, -h    Afficher cette aide

Description:
  Gestionnaire interactif pour ajouter, lister et supprimer des fichiers SVG
  dans le répertoire assets/svg/ et générer automatiquement les composants React.
    `, 'cyan');
    return;
  }
  
  try {
    await showMenu();
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red');
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}
