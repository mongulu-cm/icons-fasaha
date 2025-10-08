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
export declare class SvgToComponent {
    /**
     * Nettoie le contenu SVG en supprimant les commentaires et en convertissant les attributs
     */
    private static cleanSvgContent;
    /**
     * Extrait le viewBox d'un contenu SVG
     */
    private static extractViewBox;
    /**
     * Extrait le contenu SVG (sans les balises <svg>)
     */
    private static extractSvgContent;
    /**
     * Parse un fichier SVG et retourne les données structurées
     */
    static parseSvg(svgContent: string, name: string): SvgData;
    /**
     * Génère le code source d'un composant React à partir des données SVG
     */
    static generateComponentCode(svgData: SvgData): string;
    /**
     * Crée un composant React à partir des données SVG
     */
    static createComponent(svgData: SvgData): React.FC<IconProps>;
}
/**
 * Fonction utilitaire pour traiter plusieurs SVG en lot
 */
export declare function processSvgBatch(svgFiles: Array<{
    content: string;
    name: string;
}>): SvgData[];
/**
 * Fonction utilitaire pour générer tous les composants d'un répertoire
 */
export declare function generateComponentsFromDirectory(svgFiles: Array<{
    content: string;
    name: string;
}>): string;
//# sourceMappingURL=svgToComponent.d.ts.map