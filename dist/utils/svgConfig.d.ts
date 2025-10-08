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
export declare const defaultSvgConfig: SvgConfig;
/**
 * Configuration personnalisée pour Icons Fasaha
 */
export declare const fasahaSvgConfig: SvgConfig;
/**
 * Règles de transformation des noms de fichiers
 */
export declare const nameTransformationRules: {
    /**
     * Nettoie un nom de fichier pour en faire un nom de composant valide
     */
    cleanComponentName: (filename: string) => string;
    /**
     * Génère un nom de fichier de composant
     */
    generateComponentFilename: (componentName: string) => string;
    /**
     * Génère un nom d'export
     */
    generateExportName: (componentName: string) => string;
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
export declare const defaultIconMetadata: Partial<IconMetadata>;
/**
 * Configuration des catégories d'icônes
 */
export declare const iconCategories: {
    readonly authority: {
        readonly name: "Autorité";
        readonly description: "Symboles d'autorité et de hiérarchie traditionnelle";
        readonly color: "#8B4513";
        readonly icons: readonly ["Chefferie"];
    };
    readonly royal: {
        readonly name: "Royal";
        readonly description: "Symboles royaux et emblèmes";
        readonly color: "#DAA520";
        readonly icons: readonly ["Emblemefoumban"];
    };
    readonly ceremonial: {
        readonly name: "Cérémoniel";
        readonly description: "Masques et objets cérémoniels";
        readonly color: "#B87333";
        readonly icons: readonly ["Masktukah"];
    };
    readonly nature: {
        readonly name: "Nature";
        readonly description: "Éléments naturels et animaux";
        readonly color: "#228B22";
        readonly icons: readonly [];
    };
    readonly artisanat: {
        readonly name: "Artisanat";
        readonly description: "Outils et objets artisanaux";
        readonly color: "#CD853F";
        readonly icons: readonly [];
    };
};
/**
 * Palette de couleurs recommandée pour les icônes africaines
 */
export declare const africanColorPalette: {
    readonly earth: "#8B4513";
    readonly gold: "#DAA520";
    readonly copper: "#B87333";
    readonly clay: "#CD853F";
    readonly ochre: "#CC7722";
    readonly bronze: "#CD7F32";
    readonly terracotta: "#E2725B";
    readonly sand: "#F4A460";
    readonly charcoal: "#36454F";
    readonly ivory: "#FFFFF0";
};
//# sourceMappingURL=svgConfig.d.ts.map