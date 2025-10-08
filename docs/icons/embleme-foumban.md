# Emblème Foumban

L'icône **Emblème Foumban** représente les symboles royaux du royaume Bamoun, une civilisation prestigieuse du Cameroun. Elle évoque la richesse culturelle, l'art royal et l'héritage historique.

## Import

```jsx
import { Emblemefoumban } from 'icons-fasaha';
```

## Utilisation de base

```jsx
function BasicUsage() {
  return <Emblemefoumban />;
}
```

## Exemples

### Différentes tailles

```jsx
function SizeExamples() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Emblemefoumban size={16} />
      <Emblemefoumban size={24} />
      <Emblemefoumban size={32} />
      <Emblemefoumban size={48} />
    </div>
  );
}
```

### Couleurs royales

```jsx
function ColorExamples() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Emblemefoumban color="#DAA520" />  {/* Or royal */}
      <Emblemefoumban color="#FFD700" />  {/* Or brillant */}
      <Emblemefoumban color="#B8860B" />  {/* Or foncé */}
      <Emblemefoumban color="#8B4513" />  {/* Bronze */}
    </div>
  );
}
```

### Dans un header

```jsx
function HeaderExample() {
  return (
    <header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem',
      padding: '1rem',
      background: 'linear-gradient(135deg, #DAA520, #B8860B)',
      color: 'white'
    }}>
      <Emblemefoumban size={32} color="white" />
      <h1>Royaume Bamoun</h1>
    </header>
  );
}
```

### Avec effet de brillance

```jsx
function ShinyExample() {
  return (
    <Emblemefoumban 
      size={40}
      color="#DAA520"
      style={{
        filter: 'drop-shadow(0 0 8px rgba(218, 165, 32, 0.6))',
        animation: 'shimmer 2s ease-in-out infinite'
      }}
    />
  );
}
```

## Contexte historique

L'emblème de Foumban provient du royaume Bamoun, fondé au 14ème siècle :

- **Art royal** : Les symboles étaient gravés sur des objets précieux
- **Communication visuelle** : Chaque motif avait une signification spécifique
- **Prestige** : L'emblème était réservé aux dignitaires et cérémonies importantes
- **Héritage** : Il représente la continuité de la tradition artistique africaine

## Cas d'usage recommandés

- **Sites culturels** : Pour des musées ou centres culturels africains
- **Applications éducatives** : Dans des cours d'histoire africaine
- **Design premium** : Pour des produits ou services haut de gamme
- **Événements** : Pour des cérémonies ou célébrations culturelles

## Accessibilité

```jsx
<Emblemefoumban 
  size={24}
  aria-label="Emblème royal du royaume Bamoun"
  role="img"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      // Action au clavier
    }
  }}
/>
```

## Styles CSS recommandés

```css
.embleme-icon {
  /* Couleur royale par défaut */
  color: #DAA520;
  
  /* Transition fluide */
  transition: all 0.3s ease;
}

.embleme-icon:hover {
  /* Effet de brillance au survol */
  filter: drop-shadow(0 0 12px rgba(218, 165, 32, 0.8));
  transform: scale(1.05);
}

.embleme-icon:focus {
  /* Focus doré */
  outline: 2px solid #FFD700;
  outline-offset: 2px;
}

/* Animation de brillance */
@keyframes shimmer {
  0%, 100% { 
    filter: drop-shadow(0 0 8px rgba(218, 165, 32, 0.6));
  }
  50% { 
    filter: drop-shadow(0 0 16px rgba(218, 165, 32, 0.9));
  }
}
```

## Intégration avec des frameworks

### Dans un composant React

```jsx
import React, { useState } from 'react';
import { Emblemefoumban } from 'icons-fasaha';

const RoyalBadge: React.FC = () => {
  const [isGlowing, setIsGlowing] = useState(false);

  return (
    <div 
      style={{
        position: 'relative',
        display: 'inline-block'
      }}
      onMouseEnter={() => setIsGlowing(true)}
      onMouseLeave={() => setIsGlowing(false)}
    >
      <Emblemefoumban 
        size={48}
        color="#DAA520"
        style={{
          filter: isGlowing ? 'drop-shadow(0 0 20px rgba(218, 165, 32, 0.8))' : 'none',
          transition: 'filter 0.3s ease'
        }}
      />
      {isGlowing && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '0.8rem',
          color: '#DAA520',
          fontWeight: 'bold',
          textShadow: '0 0 4px rgba(218, 165, 32, 0.6)'
        }}>
          Royal
        </div>
      )}
    </div>
  );
};
```
