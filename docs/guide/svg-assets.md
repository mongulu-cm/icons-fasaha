# Gestion des assets SVG

Ce guide explique comment gérer les fichiers SVG et les transformer en composants React dans Icons Fasaha.

## 📁 Structure des répertoires

```
icons-fasaha/
├── assets/
│   └── svg/                    # Fichiers SVG sources
│       ├── elephant.svg
│       ├── baobab.svg
│       ├── drum.svg
│       └── ...
├── src/
│   ├── icons/                  # Composants React générés
│   │   ├── Elephant.tsx
│   │   ├── Baobab.tsx
│   │   ├── Drum.tsx
│   │   └── index.ts
│   └── utils/
│       ├── svgToComponent.ts   # Utilitaires de conversion
│       └── svgConfig.ts        # Configuration
└── scripts/
    ├── process-svg-assets.js   # Traitement en lot
    └── add-svg.js             # Gestionnaire interactif
```

## 🛠️ Outils disponibles

### 1. Gestionnaire interactif

Le script `add-svg.js` offre une interface interactive pour gérer vos SVG :

```bash
node scripts/add-svg.js
```

**Fonctionnalités :**
- ✅ Créer de nouveaux fichiers SVG
- 📁 Lister les fichiers existants
- 🗑️ Supprimer des fichiers
- 🔄 Traiter tous les SVG (générer les composants)

### 2. Traitement en lot

Pour traiter tous les SVG d'un coup :

```bash
node scripts/process-svg-assets.js
```

### 3. Créer un fichier d'exemple

```bash
node scripts/process-svg-assets.js --create-example
```

## 📝 Ajouter un nouveau SVG

### Méthode 1 : Gestionnaire interactif

1. Lancez le gestionnaire :
   ```bash
   node scripts/add-svg.js
   ```

2. Choisissez l'option "1" pour créer un nouveau fichier

3. Entrez le nom du fichier (sans extension .svg)

4. Collez le contenu SVG complet

5. Le script validera le contenu et générera automatiquement le composant

### Méthode 2 : Ajout manuel

1. Placez votre fichier SVG dans `assets/svg/`

2. Traitez tous les SVG :
   ```bash
   node scripts/process-svg-assets.js
   ```

## 📋 Format des fichiers SVG

### Structure requise

Vos fichiers SVG doivent respecter cette structure :

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Contenu de l'icône -->
  <path d="..."/>
  <circle cx="..." cy="..." r="..."/>
</svg>
```

### Attributs recommandés

- **`viewBox`** : Définit le système de coordonnées (recommandé : `0 0 24 24`)
- **`fill`** : Couleur de remplissage (`currentColor` pour l'adaptabilité)
- **`stroke`** : Couleur du contour (`currentColor` pour l'adaptabilité)
- **`stroke-width`** : Épaisseur du contour (`2` par défaut)
- **`stroke-linecap`** : Terminaison des traits (`round`)
- **`stroke-linejoin`** : Jointure des traits (`round`)

### Exemple complet

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
  <line x1="9" y1="9" x2="9.01" y2="9"/>
  <line x1="15" y1="9" x2="15.01" y2="9"/>
</svg>
```

## 🔄 Processus de conversion

### 1. Nettoyage du contenu

Le script nettoie automatiquement :
- ✅ Suppression des commentaires HTML (`<!-- -->`)
- ✅ Conversion des attributs en camelCase (`stroke-width` → `strokeWidth`)
- ✅ Nettoyage des espaces excessifs

### 2. Génération du composant

Chaque SVG devient un composant React :

```tsx
import React from 'react';
import { Icon } from '../Icon';
import { IconProps } from '../types';

export const Elephant: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path d="M3 12h18"/>
      <path d="M3 6h18"/>
      <!-- ... autres éléments ... -->
    </Icon>
  );
};

Elephant.displayName = 'Elephant';
```

### 3. Mise à jour de l'index

Le fichier `src/icons/index.ts` est automatiquement mis à jour :

```tsx
export { Elephant } from './Elephant';
export { Baobab } from './Baobab';
export { Drum } from './Drum';
// ...
```

## 🎨 Bonnes pratiques

### Nommage des fichiers

- Utilisez des noms descriptifs : `elephant.svg`, `baobab-tree.svg`
- Évitez les espaces et caractères spéciaux
- Le nom du composant sera généré automatiquement : `Elephant`, `BaobabTree`

### Design des icônes

- **Taille** : Conçues pour un viewBox de 24x24
- **Style** : Cohérent avec les autres icônes
- **Couleurs** : Utilisez `currentColor` pour l'adaptabilité
- **Simplicité** : Évitez les détails trop fins

### Couleurs recommandées

```css
/* Palette africaine */
--earth: #8B4513;      /* Terre cuite */
--gold: #DAA520;       /* Or */
--copper: #B87333;     /* Cuivre */
--clay: #CD853F;       /* Argile */
--ochre: #CC7722;      /* Ocre */
--bronze: #CD7F32;     /* Bronze */
```

## 🔧 Configuration avancée

### Personnaliser la configuration

Modifiez `src/utils/svgConfig.ts` pour ajuster :

```typescript
export const fasahaSvgConfig: SvgConfig = {
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
```

### Utiliser l'API programmatique

```typescript
import { SvgToComponent } from '../utils/svgToComponent';

const svgContent = '<svg>...</svg>';
const svgData = SvgToComponent.parseSvg(svgContent, 'MyIcon');
const componentCode = SvgToComponent.generateComponentCode(svgData);
```

## 🐛 Dépannage

### Erreurs courantes

**"Contenu SVG invalide"**
- Vérifiez que le fichier contient les balises `<svg>` et `</svg>`
- Assurez-vous que le contenu est bien formé

**"Attribut viewBox manquant"**
- Ajoutez `viewBox="0 0 24 24"` à votre balise `<svg>`
- Ou utilisez le gestionnaire interactif qui peut l'ajouter automatiquement

**Composant non généré**
- Vérifiez que le fichier est dans `assets/svg/`
- Lancez `node scripts/process-svg-assets.js` pour traiter tous les SVG

### Validation

Le script valide automatiquement :
- ✅ Présence des balises SVG
- ✅ Structure XML valide
- ✅ Attributs recommandés

## 📚 Exemples

### Icône simple

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <circle cx="12" cy="12" r="10"/>
  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
</svg>
```

### Icône avec remplissage

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
</svg>
```

### Icône complexe

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 12h18"/>
  <path d="M3 6h18"/>
  <path d="M3 18h18"/>
  <circle cx="6" cy="6" r="2"/>
  <circle cx="6" cy="12" r="2"/>
  <circle cx="6" cy="18" r="2"/>
  <circle cx="18" cy="6" r="2"/>
  <circle cx="18" cy="12" r="2"/>
  <circle cx="18" cy="18" r="2"/>
</svg>
```

---

Pour plus d'informations, consultez la [documentation complète](/guide/usage) ou le [README du projet](/).
