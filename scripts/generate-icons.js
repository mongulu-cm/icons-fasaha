const fs = require('fs');
const path = require('path');

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

// Fonction pour lire et traiter un fichier SVG
function processSvgFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Extraire le contenu entre les balises <svg> et </svg>
    const svgMatch = content.match(/<svg[^>]*>(.*?)<\/svg>/s);
    if (!svgMatch) {
      console.warn(`Impossible de traiter le fichier SVG: ${filePath}`);
      return null;
    }
    
    let svgContent = svgMatch[1];
    
    // Nettoyer les commentaires HTML
    svgContent = svgContent.replace(/<!--[\s\S]*?-->/g, '');
    
    // Nettoyer les attributs avec des tirets (les convertir en camelCase)
    svgContent = svgContent.replace(/(\w+)-(\w+)=/g, (match, p1, p2) => {
      return p1 + p2.charAt(0).toUpperCase() + p2.slice(1) + '=';
    });
    
    // Nettoyer les espaces et retours à la ligne excessifs
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

// Fonction pour générer le composant React
function generateReactComponent(iconName, svgData) {
  return `import React from 'react';
import { Icon } from '../Icon';
import { IconProps } from '../types';

export const ${iconName}: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="${svgData.viewBox}" {...props}>
      ${svgData.content}
    </Icon>
  );
};

${iconName}.displayName = '${iconName}';
`;
}

// Fonction principale
function generateIcons() {
  const svgDir = path.join(__dirname, '../svgs/regular');
  const outputDir = path.join(__dirname, '../src/icons');
  
  // Créer le dossier de sortie s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Lire tous les fichiers SVG
  const files = fs.readdirSync(svgDir).filter(file => file.endsWith('.svg'));
  
  const iconNames = [];
  
  files.forEach(file => {
    const filePath = path.join(svgDir, file);
    const iconName = cleanName(file);
    const svgData = processSvgFile(filePath);
    
    if (svgData) {
      const componentCode = generateReactComponent(iconName, svgData);
      const outputPath = path.join(outputDir, `${iconName}.tsx`);
      
      fs.writeFileSync(outputPath, componentCode);
      iconNames.push(iconName);
      console.log(`✓ Généré: ${iconName}.tsx`);
    }
  });
  
  // Générer le fichier index
  const indexContent = iconNames
    .map(name => `export { ${name} } from './${name}';`)
    .join('\n');
  
  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);
  console.log(`✓ Généré: index.ts avec ${iconNames.length} icônes`);
  
  return iconNames;
}

// Exécuter le script
if (require.main === module) {
  generateIcons();
}

module.exports = { generateIcons };
