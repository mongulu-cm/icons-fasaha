# Exemples SVG

Cette page montre comment utiliser le composant `SvgExample` pour afficher des exemples de code SVG avec coloration syntaxique.

## Exemple basique

<SvgExample 
  title="Icône d'éléphant"
  :code="`<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">
  <path d=\"M3 12h18\"/>
  <path d=\"M3 6h18\"/>
  <path d=\"M3 18h18\"/>
  <circle cx=\"6\" cy=\"6\" r=\"2\"/>
  <circle cx=\"6\" cy=\"12\" r=\"2\"/>
  <circle cx=\"6\" cy=\"18\" r=\"2\"/>
  <circle cx=\"18\" cy=\"6\" r=\"2\"/>
  <circle cx=\"18\" cy=\"12\" r=\"2\"/>
  <circle cx=\"18\" cy=\"18\" r=\"2\"/>
  <path d=\"M9 6h6\"/>
  <path d=\"M9 12h6\"/>
  <path d=\"M9 18h6\"/>
</svg>`"
  :svg-content="`<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width: 48px; height: 48px;\">
  <path d=\"M3 12h18\"/>
  <path d=\"M3 6h18\"/>
  <path d=\"M3 18h18\"/>
  <circle cx=\"6\" cy=\"6\" r=\"2\"/>
  <circle cx=\"6\" cy=\"12\" r=\"2\"/>
  <circle cx=\"6\" cy=\"18\" r=\"2\"/>
  <circle cx=\"18\" cy=\"6\" r=\"2\"/>
  <circle cx=\"18\" cy=\"12\" r=\"2\"/>
  <circle cx=\"18\" cy=\"18\" r=\"2\"/>
  <path d=\"M9 6h6\"/>
  <path d=\"M9 12h6\"/>
  <path d=\"M9 18h6\"/>
</svg>`"
/>

## Exemple avec remplissage

<SvgExample 
  title="Icône de baobab"
  :code="`<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">
  <path d=\"M12 2v20\"/>
  <path d=\"M8 8h8\"/>
  <path d=\"M8 12h8\"/>
  <path d=\"M8 16h8\"/>
  <circle cx=\"12\" cy=\"4\" r=\"2\"/>
  <path d=\"M6 20h12\"/>
  <path d=\"M8 20v-4\"/>
  <path d=\"M16 20v-4\"/>
  <path d=\"M10 8v8\"/>
  <path d=\"M14 8v8\"/>
</svg>`"
  :svg-content="`<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width: 48px; height: 48px;\">
  <path d=\"M12 2v20\"/>
  <path d=\"M8 8h8\"/>
  <path d=\"M8 12h8\"/>
  <path d=\"M8 16h8\"/>
  <circle cx=\"12\" cy=\"4\" r=\"2\"/>
  <path d=\"M6 20h12\"/>
  <path d=\"M8 20v-4\"/>
  <path d=\"M16 20v-4\"/>
  <path d=\"M10 8v8\"/>
  <path d=\"M14 8v8\"/>
</svg>`"
/>

## Exemple complexe

<SvgExample 
  title="Icône de tambour"
  :code="`<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">
  <ellipse cx=\"12\" cy=\"8\" rx=\"8\" ry=\"3\"/>
  <ellipse cx=\"12\" cy=\"16\" rx=\"8\" ry=\"3\"/>
  <path d=\"M4 8v8\"/>
  <path d=\"M20 8v8\"/>
  <path d=\"M8 8v8\"/>
  <path d=\"M16 8v8\"/>
  <circle cx=\"12\" cy=\"8\" r=\"1\"/>
  <circle cx=\"12\" cy=\"16\" r=\"1\"/>
</svg>`"
  :svg-content="`<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width: 48px; height: 48px;\">
  <ellipse cx=\"12\" cy=\"8\" rx=\"8\" ry=\"3\"/>
  <ellipse cx=\"12\" cy=\"16\" rx=\"8\" ry=\"3\"/>
  <path d=\"M4 8v8\"/>
  <path d=\"M20 8v8\"/>
  <path d=\"M8 8v8\"/>
  <path d=\"M16 8v8\"/>
  <circle cx=\"12\" cy=\"8\" r=\"1\"/>
  <circle cx=\"12\" cy=\"16\" r=\"1\"/>
</svg>`"
/>

## Utilisation du composant

Pour utiliser le composant `SvgExample` dans vos pages de documentation :

```vue
<SvgExample 
  title="Titre de l'exemple"
  :code="`votre code SVG ici`"
  :svg-content="`votre SVG avec styles inline`"
/>
```

### Propriétés

- **title** : Le titre affiché au-dessus de l'exemple
- **code** : Le code SVG brut (sans styles inline)
- **svg-content** : Le SVG avec les styles inline pour l'aperçu

### Fonctionnalités

- ✅ **Aperçu visuel** : Affichage de l'icône à côté du code
- ✅ **Coloration syntaxique** : Code SVG avec coloration
- ✅ **Bouton de copie** : Copie le code dans le presse-papiers
- ✅ **Responsive** : S'adapte aux écrans mobiles
- ✅ **Thème sombre** : Support du mode sombre
