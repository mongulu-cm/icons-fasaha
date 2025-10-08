# Personnalisation

## Styles CSS

### Classes personnalisées

Vous pouvez appliquer des classes CSS personnalisées à vos icônes :

```jsx
import { Chefferie } from 'icons-fasaha';

function CustomStyledIcon() {
  return <Chefferie className="my-custom-icon" />;
}
```

```css
.my-custom-icon {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.my-custom-icon:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
}
```

### Styles inline

```jsx
import { Emblemefoumban } from 'icons-fasaha';

function InlineStyledIcon() {
  return (
    <Emblemefoumban 
      style={{
        filter: 'sepia(100%) hue-rotate(30deg)',
        transform: 'rotate(15deg)',
        opacity: 0.8
      }}
    />
  );
}
```

## Thèmes et couleurs

### Palette de couleurs africaines

Voici une palette de couleurs inspirée de l'art africain traditionnel :

```jsx
const africanColors = {
  earth: '#8B4513',      // Terre cuite
  gold: '#DAA520',       // Or
  copper: '#B87333',     // Cuivre
  clay: '#CD853F',       // Argile
  ochre: '#CC7722',      // Ocre
  bronze: '#CD7F32',     // Bronze
  terracotta: '#E2725B', // Terre cuite claire
  sand: '#F4A460'        // Sable
};

function ThemedIcons() {
  return (
    <div>
      <Chefferie color={africanColors.earth} />
      <Emblemefoumban color={africanColors.gold} />
      <Masktukah color={africanColors.copper} />
    </div>
  );
}
```

### Variables CSS

Définissez des variables CSS pour une cohérence dans votre application :

```css
:root {
  --icon-primary: #8B4513;
  --icon-secondary: #DAA520;
  --icon-accent: #B87333;
  --icon-size-small: 16px;
  --icon-size-medium: 24px;
  --icon-size-large: 32px;
}
```

```jsx
import { Chefferie } from 'icons-fasaha';

function CSSVariableIcon() {
  return (
    <Chefferie 
      color="var(--icon-primary)"
      size="var(--icon-size-medium)"
    />
  );
}
```

## Animations

### Animation de rotation

```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.rotating-icon {
  animation: rotate 2s linear infinite;
}
```

### Animation de pulsation

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.pulsing-icon {
  animation: pulse 1.5s ease-in-out infinite;
}
```

### Animation de rebond

```css
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.bouncing-icon {
  animation: bounce 2s infinite;
}
```

## Composants wrapper

### Composant d'icône avec thème

```jsx
import React from 'react';
import { IconProps } from 'icons-fasaha';

interface ThemedIconProps extends IconProps {
  theme?: 'light' | 'dark' | 'colorful';
}

const ThemedIcon: React.FC<ThemedIconProps> = ({ 
  theme = 'light', 
  children, 
  ...props 
}) => {
  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return { color: '#2C1810', filter: 'brightness(0.8)' };
      case 'colorful':
        return { 
          background: 'linear-gradient(45deg, #8B4513, #DAA520)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        };
      default:
        return { color: '#8B4513' };
    }
  };

  return (
    <div style={getThemeStyles()}>
      {children}
    </div>
  );
};
```

### Composant d'icône avec état

```jsx
import React, { useState } from 'react';
import { Chefferie } from 'icons-fasaha';

const InteractiveIcon: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Chefferie
      size={32}
      color={isActive ? '#DAA520' : '#8B4513'}
      onClick={() => setIsActive(!isActive)}
      style={{
        cursor: 'pointer',
        transform: isActive ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.2s ease'
      }}
    />
  );
};
```

## Intégration avec des bibliothèques UI

### Material-UI

```jsx
import { IconButton, Tooltip } from '@mui/material';
import { Chefferie } from 'icons-fasaha';

function MaterialUIIcon() {
  return (
    <Tooltip title="Symbole de chefferie">
      <IconButton>
        <Chefferie size={24} color="inherit" />
      </IconButton>
    </Tooltip>
  );
}
```

### Chakra UI

```jsx
import { IconButton, Tooltip } from '@chakra-ui/react';
import { Emblemefoumban } from 'icons-fasaha';

function ChakraUIIcon() {
  return (
    <Tooltip label="Emblème royal">
      <IconButton
        aria-label="Emblème"
        icon={<Emblemefoumban size={20} />}
        colorScheme="orange"
      />
    </Tooltip>
  );
}
```

### Ant Design

```jsx
import { Button, Tooltip } from 'antd';
import { Masktukah } from 'icons-fasaha';

function AntDesignIcon() {
  return (
    <Tooltip title="Masque traditionnel">
      <Button 
        type="primary" 
        icon={<Masktukah size={16} />}
      >
        Masque
      </Button>
    </Tooltip>
  );
}
```

## Configuration avancée

### Webpack

Si vous utilisez Webpack, vous pouvez optimiser l'import des icônes :

```js
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      'icons-fasaha': path.resolve(__dirname, 'node_modules/icons-fasaha/src')
    }
  }
};
```

### Vite

Pour Vite, ajoutez cette configuration :

```js
// vite.config.js
export default {
  resolve: {
    alias: {
      'icons-fasaha': path.resolve(__dirname, 'node_modules/icons-fasaha/src')
    }
  }
};
```

## Bonnes pratiques

1. **Cohérence** : Utilisez une palette de couleurs cohérente dans toute votre application
2. **Accessibilité** : Assurez-vous que les couleurs ont un contraste suffisant
3. **Performance** : Évitez les animations trop complexes sur de nombreuses icônes
4. **Responsive** : Adaptez la taille des icônes selon la taille de l'écran
5. **Sémantique** : Utilisez des couleurs qui correspondent au sens culturel des icônes

## Exemples complets

### Galerie d'icônes interactive

```jsx
import React, { useState } from 'react';
import { Chefferie, Emblemefoumban, Masktukah } from 'icons-fasaha';

const IconGallery: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [iconSize, setIconSize] = useState(32);
  const [iconColor, setIconColor] = useState('#8B4513');

  const icons = [
    { name: 'Chefferie', component: Chefferie, description: 'Symbole d\'autorité traditionnelle' },
    { name: 'Emblème Foumban', component: Emblemefoumban, description: 'Emblème royal Bamoun' },
    { name: 'Masque Tukah', component: Masktukah, description: 'Masque cérémoniel' }
  ];

  return (
    <div className="icon-gallery">
      <div className="controls">
        <label>
          Taille: 
          <input 
            type="range" 
            min="16" 
            max="64" 
            value={iconSize}
            onChange={(e) => setIconSize(Number(e.target.value))}
          />
        </label>
        <label>
          Couleur: 
          <input 
            type="color" 
            value={iconColor}
            onChange={(e) => setIconColor(e.target.value)}
          />
        </label>
      </div>
      
      <div className="icons-grid">
        {icons.map(({ name, component: IconComponent, description }) => (
          <div 
            key={name}
            className={`icon-item ${selectedIcon === name ? 'selected' : ''}`}
            onClick={() => setSelectedIcon(name)}
          >
            <IconComponent 
              size={iconSize} 
              color={iconColor}
            />
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```
