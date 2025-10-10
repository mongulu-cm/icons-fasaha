# Test de coloration syntaxique SVG

Cette page teste la coloration syntaxique pour les blocs de code SVG.

## Exemple de code SVG

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
  <path d="M9 6h6"/>
  <path d="M9 12h6"/>
  <path d="M9 18h6"/>
</svg>
```

## Exemple avec commentaires

```svg
<!-- Icône d'éléphant africain -->
<svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 24 24" 
     fill="none" 
     stroke="currentColor" 
     stroke-width="2" 
     stroke-linecap="round" 
     stroke-linejoin="round">
  
  <!-- Corps de l'éléphant -->
  <ellipse cx="12" cy="12" rx="8" ry="6"/>
  
  <!-- Tête -->
  <circle cx="12" cy="6" r="3"/>
  
  <!-- Trompe -->
  <path d="M12 9 Q8 12 6 15"/>
  
  <!-- Oreilles -->
  <ellipse cx="8" cy="5" rx="2" ry="3"/>
  <ellipse cx="16" cy="5" rx="2" ry="3"/>
  
  <!-- Pattes -->
  <rect x="8" y="16" width="2" height="4"/>
  <rect x="14" y="16" width="2" height="4"/>
</svg>
```

## Exemple complexe avec groupes

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:#rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <g id="layer1">
    <circle cx="50" cy="50" r="40" fill="url(#grad1)" stroke="#000" stroke-width="2"/>
    <text x="50" y="55" text-anchor="middle" font-family="Arial" font-size="16" fill="#000">SVG</text>
  </g>
</svg>
```

Cette page devrait maintenant afficher les blocs SVG avec une coloration syntaxique appropriée.
