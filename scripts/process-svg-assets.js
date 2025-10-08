#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Classe utilitaire pour convertir des SVG en composants React
class SvgToComponent {
  /**
   * Nettoie le contenu SVG en supprimant les commentaires et en convertissant les attributs
   */
  static cleanSvgContent(content) {
    // Supprimer les commentaires HTML
    let cleaned = content.replace(/<!--[\s\S]*?-->/g, '');
    
    // Convertir les attributs avec des tirets en camelCase
    cleaned = cleaned.replace(/(\w+)-(\w+)=/g, (match, p1, p2) => {
      return p1 + p2.charAt(0).toUpperCase() + p2.slice(1) + '=';
    });
    
    // Nettoyer les espaces et retours à la ligne excessifs
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    return cleaned;
  }

  /**
   * Extrait le viewBox d'un contenu SVG
   */
  static extractViewBox(content) {
    const viewBoxMatch = content.match(/viewBox="([^"]*)"/);
    return viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
  }

  /**
   * Extrait le contenu SVG (sans les balises <svg>)
   */
  static extractSvgContent(content) {
    const svgMatch = content.match(/<svg[^>]*>(.*?)<\/svg>/s);
    if (!svgMatch) {
      throw new Error('Contenu SVG invalide');
    }
    return svgMatch[1];
  }

  /**
   * Parse un fichier SVG et retourne les données structurées
   */
  static parseSvg(svgContent, name) {
    const content = this.extractSvgContent(svgContent);
    const cleanedContent = this.cleanSvgContent(content);
    const viewBox = this.extractViewBox(svgContent);

    return {
      content: cleanedContent,
      viewBox,
      name
    };
  }

  /**
   * Génère le code source d'un composant React à partir des données SVG
   */
  static generateComponentCode(svgData) {
    const { name, content, viewBox } = svgData;
    
    return `import React from 'react';
import { Icon } from '../Icon';
import { IconProps } from '../types';

export const ${name}: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="${viewBox}" {...props}>
      ${content}
    </Icon>
  );
};

${name}.displayName = '${name}';
`;
  }
}

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

// Fonction pour nettoyer le nom du fichier
function cleanName(filename) {
  return filename
    .replace('.svg', '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^[0-9]/, '') // Enlever les chiffres au début
    .split('')
    .map((char, index) => index === 0 ? char.toUpperCase() : char)
    .join('');
}

// Fonction pour lire tous les fichiers SVG d'un répertoire
function readSvgFiles(directory) {
  const files = fs.readdirSync(directory).filter(file => file.endsWith('.svg'));
  const svgFiles = [];

  files.forEach(file => {
    const filePath = path.join(directory, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const name = cleanName(file);
      svgFiles.push({ content, name, filename: file });
      log(`✓ Lu: ${file} → ${name}`, 'green');
    } catch (error) {
      log(`❌ Erreur lors de la lecture de ${file}: ${error.message}`, 'red');
    }
  });

  return svgFiles;
}

// Fonction pour traiter les SVG et générer les composants
function processSvgAssets() {
  const svgDir = path.join(__dirname, '../assets/svg');
  const outputDir = path.join(__dirname, '../src/icons');
  
  log('🎨 Traitement des assets SVG...', 'blue');
  
  // Vérifier que le répertoire SVG existe
  if (!fs.existsSync(svgDir)) {
    log(`❌ Le répertoire ${svgDir} n'existe pas`, 'red');
    return;
  }
  
  // Lire tous les fichiers SVG
  const svgFiles = readSvgFiles(svgDir);
  
  if (svgFiles.length === 0) {
    log('⚠️  Aucun fichier SVG trouvé dans le répertoire', 'yellow');
    return;
  }
  
  // Créer le dossier de sortie s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Traiter chaque fichier SVG
  const processedIcons = [];
  
  svgFiles.forEach(({ content, name, filename }) => {
    try {
      // Parser le SVG
      const svgData = SvgToComponent.parseSvg(content, name);
      
      // Générer le code du composant
      const componentCode = SvgToComponent.generateComponentCode(svgData);
      
      // Écrire le fichier du composant
      const outputPath = path.join(outputDir, `${name}.tsx`);
      fs.writeFileSync(outputPath, componentCode);
      
      processedIcons.push(name);
      log(`✓ Généré: ${name}.tsx`, 'green');
      
    } catch (error) {
      log(`❌ Erreur lors du traitement de ${filename}: ${error.message}`, 'red');
    }
  });
  
  // Générer le fichier index
  if (processedIcons.length > 0) {
    const indexContent = processedIcons
      .map(name => `export { ${name} } from './${name}';`)
      .join('\n');
    
    fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
    log(`✓ Généré: index.ts avec ${processedIcons.length} icônes`, 'green');
  }
  
  // Générer un rapport
  log('\n📊 Rapport de traitement:', 'cyan');
  log(`- Fichiers SVG traités: ${processedIcons.length}`, 'cyan');
  log(`- Répertoire source: ${svgDir}`, 'cyan');
  log(`- Répertoire de sortie: ${outputDir}`, 'cyan');
  
  if (processedIcons.length > 0) {
    log('\n🎯 Icônes générées:', 'magenta');
    processedIcons.forEach(name => {
      log(`  - ${name}`, 'magenta');
    });
  }
}

// Fonction pour créer un exemple de fichier SVG
function createExampleSvg() {
  const svgDir = path.join(__dirname, '../assets/svg');
  const examplePath = path.join(svgDir, 'example.svg');
  
  if (!fs.existsSync(svgDir)) {
    fs.mkdirSync(svgDir, { recursive: true });
  }
  
  const exampleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
  <line x1="9" y1="9" x2="9.01" y2="9"/>
  <line x1="15" y1="9" x2="15.01" y2="9"/>
</svg>`;
  
  if (!fs.existsSync(examplePath)) {
    fs.writeFileSync(examplePath, exampleSvg);
    log('✓ Fichier d\'exemple créé: assets/svg/example.svg', 'green');
  }
}

// Fonction principale
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    log(`
Usage: node scripts/process-svg-assets.js [options]

Options:
  --create-example    Créer un fichier SVG d'exemple
  --help, -h         Afficher cette aide

Description:
  Ce script traite tous les fichiers SVG du répertoire assets/svg/
  et génère les composants React correspondants dans src/icons/
    `, 'cyan');
    return;
  }
  
  if (args.includes('--create-example')) {
    createExampleSvg();
    return;
  }
  
  try {
    processSvgAssets();
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { processSvgAssets, createExampleSvg };
