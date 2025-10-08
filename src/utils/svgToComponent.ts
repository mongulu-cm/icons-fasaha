import React from 'react';
import { IconProps } from '../types';

/**
 * Interface pour les données SVG
 */
export interface SvgData {
  content: string;
  viewBox: string;
  name: string;
}

/**
 * Classe utilitaire pour convertir des SVG en composants React
 */
export class SvgToComponent {
  /**
   * Nettoie le contenu SVG en supprimant les commentaires et en convertissant les attributs
   */
  private static cleanSvgContent(content: string): string {
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
  private static extractViewBox(content: string): string {
    const viewBoxMatch = content.match(/viewBox="([^"]*)"/);
    return viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
  }

  /**
   * Extrait le contenu SVG (sans les balises <svg>)
   */
  private static extractSvgContent(content: string): string {
    const svgMatch = content.match(/<svg[^>]*>(.*?)<\/svg>/s);
    if (!svgMatch) {
      throw new Error('Contenu SVG invalide');
    }
    return svgMatch[1];
  }

  /**
   * Parse un fichier SVG et retourne les données structurées
   */
  static parseSvg(svgContent: string, name: string): SvgData {
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
  static generateComponentCode(svgData: SvgData): string {
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

  /**
   * Crée un composant React à partir des données SVG
   */
  static createComponent(svgData: SvgData): React.FC<IconProps> {
    const { name, content, viewBox } = svgData;
    
    const Component: React.FC<IconProps> = (props) => {
      return React.createElement('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox,
        style: {
          width: props.size || 24,
          height: props.size || 24,
          fill: props.color || 'currentColor',
          display: 'inline-block',
          verticalAlign: 'middle',
          ...props.style
        },
        className: props.className,
        onClick: props.onClick,
        ...props
      }, React.createElement('g', { dangerouslySetInnerHTML: { __html: content } }));
    };

    Component.displayName = name;
    return Component;
  }
}

/**
 * Fonction utilitaire pour traiter plusieurs SVG en lot
 */
export function processSvgBatch(svgFiles: Array<{ content: string; name: string }>): SvgData[] {
  return svgFiles.map(file => SvgToComponent.parseSvg(file.content, file.name));
}

/**
 * Fonction utilitaire pour générer tous les composants d'un répertoire
 */
export function generateComponentsFromDirectory(svgFiles: Array<{ content: string; name: string }>): string {
  const svgDataList = processSvgBatch(svgFiles);
  
  const componentCodes = svgDataList.map(svgData => 
    SvgToComponent.generateComponentCode(svgData)
  );

  const exports = svgDataList.map(svgData => 
    `export { ${svgData.name} } from './${svgData.name}';`
  ).join('\n');

  return componentCodes.join('\n\n') + '\n\n' + exports;
}
