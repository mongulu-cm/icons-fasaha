# Utilisation

## Import des icônes

### Import individuel (recommandé)

```jsx
import { Chefferie, Emblemefoumban, Masktukah } from 'icons-fasaha';
```

### Import de toutes les icônes

```jsx
import * as IconsFasaha from 'icons-fasaha';
```

## Utilisation de base

```jsx
import React from 'react';
import { Chefferie } from 'icons-fasaha';

function App() {
  return (
    <div>
      <Chefferie />
    </div>
  );
}
```

## Propriétés disponibles

Toutes les icônes acceptent les propriétés suivantes :

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `number \| string` | `24` | Taille de l'icône en pixels |
| `color` | `string` | `'currentColor'` | Couleur de l'icône |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `React.CSSProperties` | `{}` | Styles inline |
| `onClick` | `() => void` | `undefined` | Fonction de callback au clic |

## Exemples d'utilisation

### Tailles différentes

```jsx
import { Chefferie } from 'icons-fasaha';

function SizeExample() {
  return (
    <div>
      <Chefferie size={16} />
      <Chefferie size={24} />
      <Chefferie size={32} />
      <Chefferie size="48px" />
    </div>
  );
}
```

### Couleurs personnalisées

```jsx
import { Emblemefoumban } from 'icons-fasaha';

function ColorExample() {
  return (
    <div>
      <Emblemefoumban color="#8B4513" />
      <Emblemefoumban color="#DAA520" />
      <Emblemefoumban color="rgb(139, 69, 19)" />
      <Emblemefoumban color="var(--primary-color)" />
    </div>
  );
}
```

### Avec des classes CSS

```jsx
import { Masktukah } from 'icons-fasaha';
import './styles.css';

function StyledExample() {
  return (
    <div>
      <Masktukah className="icon-large" />
      <Masktukah className="icon-hover" />
    </div>
  );
}
```

```css
.icon-large {
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
}

.icon-hover:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
```

### Icônes cliquables

```jsx
import { Chefferie } from 'icons-fasaha';

function ClickableExample() {
  const handleIconClick = () => {
    alert('Icône cliquée !');
  };

  return (
    <Chefferie 
      size={32} 
      onClick={handleIconClick}
      style={{ cursor: 'pointer' }}
    />
  );
}
```

### Utilisation dans des boutons

```jsx
import { Emblemefoumban } from 'icons-fasaha';

function ButtonExample() {
  return (
    <button className="btn-with-icon">
      <Emblemefoumban size={20} />
      <span>Bouton avec icône</span>
    </button>
  );
}
```

### Icônes conditionnelles

```jsx
import { Chefferie, Masktukah } from 'icons-fasaha';

function ConditionalExample({ userType }) {
  const IconComponent = userType === 'chief' ? Chefferie : Masktukah;
  
  return <IconComponent size={24} />;
}
```

## Bonnes pratiques

### 1. Import sélectif

Préférez l'import sélectif pour réduire la taille du bundle :

```jsx
// ✅ Bon
import { Chefferie } from 'icons-fasaha';

// ❌ Éviter si vous n'utilisez qu'une icône
import * as IconsFasaha from 'icons-fasaha';
```

### 2. Utilisation des couleurs

Utilisez des couleurs qui respectent l'identité culturelle :

```jsx
// ✅ Couleurs terreuses et chaudes
<Chefferie color="#8B4513" /> // Marron
<Emblemefoumban color="#DAA520" /> // Or
<Masktukah color="#CD853F" /> // Pérou
```

### 3. Accessibilité

Ajoutez des attributs d'accessibilité quand nécessaire :

```jsx
<Chefferie 
  size={24}
  aria-label="Symbole de chefferie"
  role="img"
/>
```

### 4. Performance

Pour de nombreuses icônes, considérez l'utilisation de `React.memo` :

```jsx
import { memo } from 'react';
import { Chefferie } from 'icons-fasaha';

const MemoizedIcon = memo(Chefferie);
```

## Intégration avec des frameworks

### Next.js

```jsx
import dynamic from 'next/dynamic';
import { Chefferie } from 'icons-fasaha';

// Import dynamique si nécessaire
const DynamicIcon = dynamic(() => import('icons-fasaha').then(mod => ({ default: mod.Chefferie })));
```

### Gatsby

```jsx
import { Chefferie } from 'icons-fasaha';

// Fonctionne directement avec Gatsby
export default function MyPage() {
  return <Chefferie size={32} />;
}
```

## Prochaines étapes

- [Découvrir toutes les icônes disponibles](/icons/)
- [Apprendre à personnaliser les icônes](/guide/customization)
