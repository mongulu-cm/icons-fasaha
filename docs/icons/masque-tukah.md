# Masque Tukah

L'icône **Masque Tukah** représente un masque traditionnel utilisé dans les cérémonies et rituels culturels africains. Elle symbolise la spiritualité, les traditions ancestrales et la connexion avec le monde invisible.

## Import

```jsx
import { Masktukah } from 'icons-fasaha';
```

## Utilisation de base

```jsx
function BasicUsage() {
  return <Masktukah />;
}
```

## Exemples

### Différentes tailles

```jsx
function SizeExamples() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Masktukah size={16} />
      <Masktukah size={24} />
      <Masktukah size={32} />
      <Masktukah size={48} />
    </div>
  );
}
```

### Couleurs cérémonielles

```jsx
function ColorExamples() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Masktukah color="#B87333" />  {/* Cuivre */}
      <Masktukah color="#8B4513" />  {/* Terre cuite */}
      <Masktukah color="#CD853F" />  {/* Argile */}
      <Masktukah color="#A0522D" />  {/* Sienna */}
    </div>
  );
}
```

### Dans une galerie

```jsx
function GalleryExample() {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      padding: '1rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <Masktukah size={48} color="#B87333" />
        <h3>Masque Cérémoniel</h3>
        <p>Utilisé dans les rituels traditionnels</p>
      </div>
    </div>
  );
}
```

### Avec effet mystique

```jsx
function MysticalExample() {
  return (
    <Masktukah 
      size={40}
      color="#B87333"
      style={{
        filter: 'drop-shadow(0 0 10px rgba(184, 115, 51, 0.5))',
        animation: 'mystical-glow 3s ease-in-out infinite'
      }}
    />
  );
}
```

## Contexte spirituel

Le masque Tukah dans la tradition africaine représente :

- **Protection spirituelle** : Il protège contre les forces négatives
- **Communication avec les ancêtres** : Il facilite le lien avec le monde invisible
- **Cérémonies initiatiques** : Il est utilisé dans les rites de passage
- **Art sacré** : Il combine esthétique et spiritualité

## Cas d'usage recommandés

- **Applications spirituelles** : Pour des apps de méditation ou spiritualité
- **Contenu éducatif** : Dans des cours sur les traditions africaines
- **Design mystique** : Pour des interfaces avec une ambiance mystérieuse
- **Collections d'art** : Dans des galeries ou musées virtuels

## Accessibilité

```jsx
<Masktukah 
  size={24}
  aria-label="Masque traditionnel Tukah utilisé dans les cérémonies africaines"
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
.masque-icon {
  /* Couleur cérémonielle par défaut */
  color: #B87333;
  
  /* Transition mystique */
  transition: all 0.4s ease;
}

.masque-icon:hover {
  /* Effet mystique au survol */
  filter: drop-shadow(0 0 15px rgba(184, 115, 51, 0.7));
  transform: scale(1.05) rotate(2deg);
}

.masque-icon:focus {
  /* Focus mystique */
  outline: 2px solid #CD853F;
  outline-offset: 2px;
}

/* Animation mystique */
@keyframes mystical-glow {
  0%, 100% { 
    filter: drop-shadow(0 0 10px rgba(184, 115, 51, 0.5));
  }
  50% { 
    filter: drop-shadow(0 0 20px rgba(184, 115, 51, 0.8));
  }
}

/* Animation de rotation mystique */
@keyframes mystical-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.masque-icon.mystical {
  animation: mystical-rotate 10s linear infinite;
}
```

## Intégration avec des frameworks

### Dans un composant React mystique

```jsx
import React, { useState, useEffect } from 'react';
import { Masktukah } from 'icons-fasaha';

const MysticalMask: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => prev === 0.5 ? 0.8 : 0.5);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      style={{
        position: 'relative',
        display: 'inline-block',
        cursor: 'pointer'
      }}
      onClick={() => setIsActive(!isActive)}
    >
      <Masktukah 
        size={64}
        color="#B87333"
        style={{
          filter: `drop-shadow(0 0 ${20 * glowIntensity}px rgba(184, 115, 51, ${glowIntensity}))`,
          transform: isActive ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
          transition: 'all 0.3s ease'
        }}
      />
      
      {isActive && (
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.9rem',
          color: '#B87333',
          fontWeight: 'bold',
          textShadow: '0 0 4px rgba(184, 115, 51, 0.6)',
          animation: 'fadeInOut 2s ease-in-out infinite'
        }}>
          Spirituel
        </div>
      )}
    </div>
  );
};

// Animation CSS pour le texte
const styles = `
@keyframes fadeInOut {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
`;
```

### Dans une galerie d'art

```jsx
import React from 'react';
import { Masktukah } from 'icons-fasaha';

const ArtGallery: React.FC = () => {
  const masks = [
    { name: 'Masque Tukah', description: 'Masque cérémoniel traditionnel' },
    // ... autres masques
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      padding: '2rem'
    }}>
      {masks.map((mask, index) => (
        <div 
          key={index}
          style={{
            textAlign: 'center',
            padding: '1rem',
            border: '1px solid #e1e5e9',
            borderRadius: '0.5rem',
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'
          }}
        >
          <Masktukah 
            size={80} 
            color="#B87333"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              marginBottom: '1rem'
            }}
          />
          <h3 style={{ margin: '0.5rem 0', color: '#495057' }}>
            {mask.name}
          </h3>
          <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>
            {mask.description}
          </p>
        </div>
      ))}
    </div>
  );
};
```
