# Exemples SVG

Cette page montre comment utiliser le composant `SvgExample` pour afficher des exemples de code SVG avec coloration syntaxique.

## Exemple basique

<SvgExample 
  title="Icône d'éléphant"
  :code="'<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;>\n  <path d=&quot;M3 12h18&quot;/>\n  <path d=&quot;M3 6h18&quot;/>\n  <path d=&quot;M3 18h18&quot;/>\n  <circle cx=&quot;6&quot; cy=&quot;6&quot; r=&quot;2&quot;/>\n  <circle cx=&quot;6&quot; cy=&quot;12&quot; r=&quot;2&quot;/>\n  <circle cx=&quot;6&quot; cy=&quot;18&quot; r=&quot;2&quot;/>\n  <circle cx=&quot;18&quot; cy=&quot;6&quot; r=&quot;2&quot;/>\n  <circle cx=&quot;18&quot; cy=&quot;12&quot; r=&quot;2&quot;/>\n  <circle cx=&quot;18&quot; cy=&quot;18&quot; r=&quot;2&quot;/>\n  <path d=&quot;M9 6h6&quot;/>\n  <path d=&quot;M9 12h6&quot;/>\n  <path d=&quot;M9 18h6&quot;/>\n</svg>'"
  :svg-content="'<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; style=&quot;width: 48px; height: 48px;&quot;>\n  <path d=&quot;M3 12h18&quot;/>\n  <path d=&quot;M3 6h18&quot;/>\n  <path d=&quot;M3 18h18&quot;/>\n  <circle cx=&quot;6&quot; cy=&quot;6&quot; r=&quot;2&quot;/>\n  <circle cx=&quot;6&quot; cy=&quot;12&quot; r=&quot;2&quot;/>\n  <circle cx=&quot;6&quot; cy=&quot;18&quot; r=&quot;2&quot;/>\n  <circle cx=&quot;18&quot; cy=&quot;6&quot; r=&quot;2&quot;/>\n  <circle cx=&quot;18&quot; cy=&quot;12&quot; r=&quot;2&quot;/>\n  <circle cx=&quot;18&quot; cy=&quot;18&quot; r=&quot;2&quot;/>\n  <path d=&quot;M9 6h6&quot;/>\n  <path d=&quot;M9 12h6&quot;/>\n  <path d=&quot;M9 18h6&quot;/>\n</svg>'"
/>

## Exemple avec remplissage

<SvgExample 
  title="Icône de baobab"
  :code="'<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;>\n  <path d=&quot;M12 2v20&quot;/>\n  <path d=&quot;M8 8h8&quot;/>\n  <path d=&quot;M8 12h8&quot;/>\n  <path d=&quot;M8 16h8&quot;/>\n  <circle cx=&quot;12&quot; cy=&quot;4&quot; r=&quot;2&quot;/>\n  <path d=&quot;M6 20h12&quot;/>\n  <path d=&quot;M8 20v-4&quot;/>\n  <path d=&quot;M16 20v-4&quot;/>\n  <path d=&quot;M10 8v8&quot;/>\n  <path d=&quot;M14 8v8&quot;/>\n</svg>'"
  :svg-content="'<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; style=&quot;width: 48px; height: 48px;&quot;>\n  <path d=&quot;M12 2v20&quot;/>\n  <path d=&quot;M8 8h8&quot;/>\n  <path d=&quot;M8 12h8&quot;/>\n  <path d=&quot;M8 16h8&quot;/>\n  <circle cx=&quot;12&quot; cy=&quot;4&quot; r=&quot;2&quot;/>\n  <path d=&quot;M6 20h12&quot;/>\n  <path d=&quot;M8 20v-4&quot;/>\n  <path d=&quot;M16 20v-4&quot;/>\n  <path d=&quot;M10 8v8&quot;/>\n  <path d=&quot;M14 8v8&quot;/>\n</svg>'"
/>

## Exemple complexe

<SvgExample 
  title="Icône de tambour"
  :code="'<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;>\n  <ellipse cx=&quot;12&quot; cy=&quot;8&quot; rx=&quot;8&quot; ry=&quot;3&quot;/>\n  <ellipse cx=&quot;12&quot; cy=&quot;16&quot; rx=&quot;8&quot; ry=&quot;3&quot;/>\n  <path d=&quot;M4 8v8&quot;/>\n  <path d=&quot;M20 8v8&quot;/>\n  <path d=&quot;M8 8v8&quot;/>\n  <path d=&quot;M16 8v8&quot;/>\n  <circle cx=&quot;12&quot; cy=&quot;8&quot; r=&quot;1&quot;/>\n  <circle cx=&quot;12&quot; cy=&quot;16&quot; r=&quot;1&quot;/>\n</svg>'"
  :svg-content="'<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot; style=&quot;width: 48px; height: 48px;&quot;>\n  <ellipse cx=&quot;12&quot; cy=&quot;8&quot; rx=&quot;8&quot; ry=&quot;3&quot;/>\n  <ellipse cx=&quot;12&quot; cy=&quot;16&quot; rx=&quot;8&quot; ry=&quot;3&quot;/>\n  <path d=&quot;M4 8v8&quot;/>\n  <path d=&quot;M20 8v8&quot;/>\n  <path d=&quot;M8 8v8&quot;/>\n  <path d=&quot;M16 8v8&quot;/>\n  <circle cx=&quot;12&quot; cy=&quot;8&quot; r=&quot;1&quot;/>\n  <circle cx=&quot;12&quot; cy=&quot;16&quot; r=&quot;1&quot;/>\n</svg>'"
/>

## Utilisation du composant

Pour utiliser le composant `SvgExample` dans vos pages de documentation :

```vue
<SvgExample 
  title="Titre de l'exemple"
  :code="'votre code SVG ici'"
  :svg-content="'votre SVG avec styles inline'"
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
