# Chefferie

L'icône **Chefferie** représente l'autorité traditionnelle et la hiérarchie sociale dans les sociétés africaines. Elle symbolise le pouvoir, la sagesse et la continuité culturelle.

## Import

```jsx
import { Chefferie } from 'icons-fasaha';
```

## Utilisation de base

```jsx
function BasicUsage() {
  return <Chefferie />;
}
```

## Exemples

### Différentes tailles

```jsx
function SizeExamples() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Chefferie size={16} />
      <Chefferie size={24} />
      <Chefferie size={32} />
      <Chefferie size={48} />
    </div>
  );
}
```

### Couleurs traditionnelles

```jsx
function ColorExamples() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Chefferie color="#8B4513" />  {/* Terre cuite */}
      <Chefferie color="#DAA520" />  {/* Or */}
      <Chefferie color="#B87333" />  {/* Cuivre */}
      <Chefferie color="#CD853F" />  {/* Argile */}
    </div>
  );
}
```

### Dans un bouton

```jsx
function ButtonExample() {
  return (
    <button style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      border: '1px solid #8B4513',
      borderRadius: '0.25rem',
      background: 'white',
      cursor: 'pointer'
    }}>
      <Chefferie size={20} color="#8B4513" />
      <span>Chefferie</span>
    </button>
  );
}
```

### Avec animation

```jsx
function AnimatedExample() {
  return (
    <Chefferie 
      size={32}
      color="#8B4513"
      style={{
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    />
  );
}
```

## Contexte culturel

La chefferie en Afrique centrale, particulièrement au Cameroun, représente :

- **Autorité traditionnelle** : Le chef est le gardien des traditions et coutumes
- **Justice communautaire** : Il résout les conflits selon les lois coutumières
- **Représentation spirituelle** : Il fait le lien entre le monde visible et invisible
- **Continuité culturelle** : Il transmet les valeurs et l'histoire de la communauté

## Cas d'usage recommandés

- **Navigation** : Indiquer des sections d'autorité ou d'administration
- **Profils utilisateur** : Pour les comptes de modérateurs ou administrateurs
- **Contenu culturel** : Dans des articles sur les traditions africaines
- **Applications éducatives** : Pour enseigner l'histoire et la culture africaine

## Accessibilité

```jsx
<Chefferie 
  size={24}
  aria-label="Symbole de chefferie traditionnelle africaine"
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
.chefferie-icon {
  /* Couleur par défaut */
  color: #8B4513;
  
  /* Transition fluide */
  transition: all 0.2s ease;
}

.chefferie-icon:hover {
  /* Effet au survol */
  transform: scale(1.05);
  filter: brightness(1.1);
}

.chefferie-icon:focus {
  /* Focus visible */
  outline: 2px solid #DAA520;
  outline-offset: 2px;
}
```
