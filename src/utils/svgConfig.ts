/**
 * Configuration pour la gestion des assets SVG
 */
export interface SvgConfig {
  /** Répertoire source des fichiers SVG */
  sourceDir: string;
  /** Répertoire de sortie des composants */
  outputDir: string;
  /** Préfixe pour les noms de composants */
  componentPrefix?: string;
  /** Suffixe pour les noms de composants */
  componentSuffix?: string;
  /** ViewBox par défaut si non spécifié */
  defaultViewBox: string;
  /** Attributs par défaut pour les composants */
  defaultProps?: Record<string, any>;
}

/**
 * Configuration par défaut
 */
export const defaultSvgConfig: SvgConfig = {
  sourceDir: 'assets/svg',
  outputDir: 'src/icons',
  defaultViewBox: '0 0 24 24',
  defaultProps: {
    fill: 'currentColor',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }
};

/**
 * Configuration personnalisée pour Icons Fasaha
 */
export const fasahaSvgConfig: SvgConfig = {
  ...defaultSvgConfig,
  sourceDir: 'assets/svg',
  outputDir: 'src/icons',
  componentPrefix: '', // Pas de préfixe pour garder les noms originaux
  componentSuffix: '',
  defaultViewBox: '0 0 24 24',
  defaultProps: {
    fill: 'currentColor',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }
};

/**
 * Règles de transformation des noms de fichiers
 */
export const nameTransformationRules = {
  /**
   * Nettoie un nom de fichier pour en faire un nom de composant valide
   */
  cleanComponentName: (filename: string): string => {
    return filename
      .replace('.svg', '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, '') // Enlever les chiffres au début
      .split('')
      .map((char, index) => index === 0 ? char.toUpperCase() : char)
      .join('');
  },

  /**
   * Génère un nom de fichier de composant
   */
  generateComponentFilename: (componentName: string): string => {
    return `${componentName}.tsx`;
  },

  /**
   * Génère un nom d'export
   */
  generateExportName: (componentName: string): string => {
    return componentName;
  }
};

/**
 * Métadonnées pour les icônes
 */
export interface IconMetadata {
  name: string;
  filename: string;
  category?: string;
  tags?: string[];
  description?: string;
  culturalContext?: string;
  colors?: string[];
  size?: {
    width: number;
    height: number;
  };
}

/**
 * Métadonnées par défaut pour les icônes africaines
 */
export const defaultIconMetadata: Partial<IconMetadata> = {
  category: 'african-culture',
  tags: ['africa', 'culture', 'traditional', 'art'],
  culturalContext: 'Central African traditional art',
  colors: ['#8B4513', '#DAA520', '#B87333', '#CD853F']
};

/**
 * Configuration des catégories d'icônes
 */
export const iconCategories = {
  'authority': {
    name: 'Autorité',
    description: 'Symboles d\'autorité et de hiérarchie traditionnelle',
    color: '#8B4513',
    icons: ['Chefferie']
  },
  'royal': {
    name: 'Royal',
    description: 'Symboles royaux et emblèmes',
    color: '#DAA520',
    icons: ['Emblemefoumban']
  },
  'ceremonial': {
    name: 'Cérémoniel',
    description: 'Masques et objets cérémoniels',
    color: '#B87333',
    icons: ['Masktukah']
  },
  'nature': {
    name: 'Nature',
    description: 'Éléments naturels et animaux',
    color: '#228B22',
    icons: []
  },
  'artisanat': {
    name: 'Artisanat',
    description: 'Outils et objets artisanaux',
    color: '#CD853F',
    icons: []
  }
} as const;

/**
 * Palette de couleurs recommandée pour les icônes africaines
 */
export const africanColorPalette = {
  earth: '#8B4513',      // Terre cuite
  gold: '#DAA520',       // Or
  copper: '#B87333',     // Cuivre
  clay: '#CD853F',       // Argile
  ochre: '#CC7722',      // Ocre
  bronze: '#CD7F32',     // Bronze
  terracotta: '#E2725B', // Terre cuite claire
  sand: '#F4A460',       // Sable
  charcoal: '#36454F',   // Charbon
  ivory: '#FFFFF0'       // Ivoire
} as const;
