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

// Métadonnées des icônes
const iconMetadata = {
  'Chefferie': {
    description: 'Symbole de l\'autorité traditionnelle et de la hiérarchie sociale dans les sociétés africaines.',
    category: 'Autorité',
    tags: ['autorité', 'tradition', 'hiérarchie', 'chefferie'],
    culturalContext: 'Représente l\'autorité traditionnelle dans les sociétés africaines',
    usageExample: `import { Chefferie } from 'icons-fasaha';

<Chefferie size={32} color="#8B4513" />`
  },
  'Emblemefoumban': {
    description: 'Représentation artistique des symboles royaux du royaume Bamoun.',
    category: 'Royal',
    tags: ['royal', 'bamoun', 'emblème', 'royaume'],
    culturalContext: 'Emblème du royaume Bamoun au Cameroun',
    usageExample: `import { Emblemefoumban } from 'icons-fasaha';

<Emblemefoumban size={24} color="#DAA520" />`
  },
  'Masktukah': {
    description: 'Masque traditionnel utilisé dans les cérémonies et rituels culturels.',
    category: 'Cérémoniel',
    tags: ['masque', 'cérémonie', 'rituel', 'tradition'],
    culturalContext: 'Masque utilisé dans les cérémonies traditionnelles africaines',
    usageExample: `import { Masktukah } from 'icons-fasaha';

<Masktukah size={28} color="#B87333" />`
  },
  'Elephant': {
    description: 'Icône d\'éléphant africain, symbole de force et de sagesse.',
    category: 'Nature',
    tags: ['éléphant', 'afrique', 'nature', 'force', 'sagesse'],
    culturalContext: 'L\'éléphant est un symbole important dans la culture africaine',
    usageExample: `import { Elephant } from 'icons-fasaha';

<Elephant size={32} color="#8B4513" />`
  },
  'Baobab': {
    description: 'Arbre emblématique d\'Afrique, symbole de longévité et de protection.',
    category: 'Nature',
    tags: ['baobab', 'arbre', 'afrique', 'longévité', 'protection'],
    culturalContext: 'Le baobab est un arbre sacré dans de nombreuses cultures africaines',
    usageExample: `import { Baobab } from 'icons-fasaha';

<Baobab size={24} color="#228B22" />`
  },
  'Drum': {
    description: 'Tambour traditionnel africain, instrument de communication et de célébration.',
    category: 'Musique',
    tags: ['tambour', 'musique', 'tradition', 'communication', 'célébration'],
    culturalContext: 'Le tambour est central dans la musique et la communication africaines',
    usageExample: `import { Drum } from 'icons-fasaha';

<Drum size={28} color="#B87333" />`
  }
};

// Fonction pour lire un fichier SVG et extraire le contenu
function readSvgFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const svgMatch = content.match(/<svg[^>]*>(.*?)<\/svg>/s);
    if (!svgMatch) {
      return null;
    }
    
    let svgContent = svgMatch[1];
    
    // Nettoyer le contenu
    svgContent = svgContent.replace(/<!--[\s\S]*?-->/g, '');
    svgContent = svgContent.replace(/(\w+)-(\w+)=/g, (match, p1, p2) => {
      return p1 + p2.charAt(0).toUpperCase() + p2.slice(1) + '=';
    });
    svgContent = svgContent.replace(/\s+/g, ' ').trim();
    
    const viewBoxMatch = content.match(/viewBox="([^"]*)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
    
    return {
      content: svgContent,
      viewBox: viewBox
    };
  } catch (error) {
    console.error(`Erreur lors de la lecture du fichier ${filePath}:`, error);
    return null;
  }
}

// Fonction pour générer un aperçu SVG
function generatePreview(svgContent, viewBox) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" style="width: 32px; height: 32px;">${svgContent}</svg>`;
}

// Fonction pour générer les données des icônes
function generateIconData() {
  const iconsDir = path.join(__dirname, '../src/icons');
  const iconsData = [];
  
  if (!fs.existsSync(iconsDir)) {
    log('❌ Le répertoire src/icons n\'existe pas', 'red');
    return;
  }
  
  const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.tsx') && file !== 'index.ts');
  
  log(`📁 Traitement de ${files.length} fichiers d'icônes...`, 'blue');
  
  files.forEach(file => {
    const iconName = file.replace('.tsx', '');
    const metadata = iconMetadata[iconName];
    
    if (!metadata) {
      log(`⚠️  Métadonnées manquantes pour ${iconName}`, 'yellow');
      return;
    }
    
    // Lire le fichier SVG correspondant
    const svgFile = path.join(__dirname, '../assets/svg', `${iconName.toLowerCase()}.svg`);
    let svgData = null;
    
    if (fs.existsSync(svgFile)) {
      svgData = readSvgFile(svgFile);
    }
    
    if (!svgData) {
      log(`⚠️  Fichier SVG manquant pour ${iconName}`, 'yellow');
      return;
    }
    
    const iconData = {
      name: iconName,
      description: metadata.description,
      category: metadata.category,
      tags: metadata.tags,
      culturalContext: metadata.culturalContext,
      preview: generatePreview(svgData.content, svgData.viewBox),
      usageExample: metadata.usageExample
    };
    
    iconsData.push(iconData);
    log(`✅ ${iconName} traité`, 'green');
  });
  
  return iconsData;
}

// Fonction pour générer les catégories
function generateCategories(iconsData) {
  const categories = new Set();
  iconsData.forEach(icon => {
    categories.add(icon.category);
  });
  
  return Array.from(categories).map(category => ({
    id: category,
    name: category
  }));
}

// Fonction pour générer les tags
function generateTags(iconsData) {
  const tags = new Set();
  iconsData.forEach(icon => {
    icon.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

// Fonction pour générer le fichier de données
function generateDataFile() {
  log('🔄 Génération des données des icônes...', 'blue');
  
  const iconsData = generateIconData();
  const categories = generateCategories(iconsData);
  const tags = generateTags(iconsData);
  
  const data = {
    icons: iconsData,
    categories: categories,
    tags: tags,
    lastUpdated: new Date().toISOString()
  };
  
  const outputPath = path.join(__dirname, '../docs/.vitepress/data/icons.json');
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  
  log(`✅ Données générées : ${outputPath}`, 'green');
  log(`📊 ${iconsData.length} icônes, ${categories.length} catégories, ${tags.length} tags`, 'cyan');
  
  return data;
}

// Fonction pour générer le composant Vue avec les données
function generateVueComponent(data) {
  const componentPath = path.join(__dirname, '../docs/.vitepress/components/IconSearchData.vue');
  
  const componentContent = `<template>
  <div>
    <!-- Données des icônes injectées automatiquement -->
  </div>
</template>

<script setup>
// Données générées automatiquement
export const iconsData = ${JSON.stringify(data.icons, null, 2)};

export const categoriesData = ${JSON.stringify(data.categories, null, 2)};

export const tagsData = ${JSON.stringify(data.tags, null, 2)};
</script>`;

  fs.writeFileSync(componentPath, componentContent);
  log(`✅ Composant Vue généré : ${componentPath}`, 'green');
}

// Fonction principale
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    log(`
Usage: node scripts/generate-icon-data.js [options]

Options:
  --help, -h    Afficher cette aide
  --vue         Générer aussi le composant Vue

Description:
  Génère automatiquement les données des icônes à partir des fichiers SVG
  et des métadonnées définies dans le script.
    `, 'cyan');
    return;
  }
  
  try {
    const data = generateDataFile();
    
    if (args.includes('--vue')) {
      generateVueComponent(data);
    }
    
    log('🎉 Génération terminée avec succès !', 'green');
  } catch (error) {
    log(`❌ Erreur: ${error.message}`, 'red');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
