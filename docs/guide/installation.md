# Installation

## Prérequis

- Node.js 16+ 
- npm ou yarn
- Un projet React (version 16.8+)

## Installation via npm

```bash
npm install icons-fasaha
```

## Installation via yarn

```bash
yarn add icons-fasaha
```

## Installation via pnpm

```bash
pnpm add icons-fasaha
```

## Vérification de l'installation

Pour vérifier que l'installation s'est bien déroulée, vous pouvez importer une icône dans votre composant :

```jsx
import { Chefferie } from 'icons-fasaha';

function TestComponent() {
  return <Chefferie size={24} />;
}
```

Si l'icône s'affiche correctement, l'installation est réussie !

## Types TypeScript

Si vous utilisez TypeScript, les types sont inclus automatiquement. Vous n'avez pas besoin d'installer de package supplémentaire.

```tsx
import { IconProps } from 'icons-fasaha';

interface MyComponentProps {
  iconProps?: IconProps;
}
```

## Dépannage

### Erreur de module non trouvé

Si vous rencontrez une erreur "Module not found", vérifiez que :

1. Le package est bien installé dans `node_modules`
2. Votre version de Node.js est compatible (16+)
3. Vous utilisez la bonne syntaxe d'import

### Problèmes avec les types TypeScript

Si les types ne sont pas reconnus :

1. Redémarrez votre serveur de développement
2. Vérifiez que votre `tsconfig.json` inclut `node_modules`
3. Assurez-vous d'avoir une version récente de TypeScript

### Problèmes de build

Si vous rencontrez des problèmes lors du build :

1. Vérifiez que tous les peer dependencies sont installés
2. Assurez-vous que votre bundler supporte les modules ES6
3. Consultez la section [Personnalisation](/guide/customization) pour les configurations spécifiques

## Prochaines étapes

Maintenant que vous avez installé Icons Fasaha, vous pouvez :

- [Apprendre à utiliser les icônes](/guide/usage)
- [Découvrir toutes les icônes disponibles](/icons/)
- [Personnaliser l'apparence](/guide/customization)
