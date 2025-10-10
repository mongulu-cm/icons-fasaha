# Toutes les icônes

Voici toutes les icônes disponibles dans Icons Fasaha. Chaque icône est inspirée de l'art traditionnel africain et représente un aspect unique de la culture d'Afrique centrale.

## Chefferie

<div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0; padding: 1rem; border: 1px solid #e1e5e9; border-radius: 0.5rem;">
  <div style="font-size: 2rem;">👑</div>
  <div>
    <h3 style="margin: 0;">Chefferie</h3>
    <p style="margin: 0.5rem 0 0 0; color: #666;">Symbole de l'autorité traditionnelle et de la hiérarchie sociale dans les sociétés africaines.</p>
  </div>
</div>

**Utilisation :**
```jsx
import { Chefferie } from 'icons-fasaha';

<Chefferie size={32} color="#8B4513" />
```

[Voir les détails →](/icons/chefferie.html)

---

## Emblème Foumban

<div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0; padding: 1rem; border: 1px solid #e1e5e9; border-radius: 0.5rem;">
  <div style="font-size: 2rem;">🏛️</div>
  <div>
    <h3 style="margin: 0;">Emblème Foumban</h3>
    <p style="margin: 0.5rem 0 0 0; color: #666;">Représentation artistique des symboles royaux du royaume Bamoun.</p>
  </div>
</div>

**Utilisation :**
```jsx
import { Emblemefoumban } from 'icons-fasaha';

<Emblemefoumban size={32} color="#DAA520" />
```

[Voir les détails →](/icons/embleme-foumban.html)

---

## Masque Tukah

<div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0; padding: 1rem; border: 1px solid #e1e5e9; border-radius: 0.5rem;">
  <div style="font-size: 2rem;">🎭</div>
  <div>
    <h3 style="margin: 0;">Masque Tukah</h3>
    <p style="margin: 0.5rem 0 0 0; color: #666;">Masque traditionnel utilisé dans les cérémonies et rituels culturels.</p>
  </div>
</div>

**Utilisation :**
```jsx
import { Masktukah } from 'icons-fasaha';

<Masktukah size={32} color="#B87333" />
```

[Voir les détails →](/icons/masque-tukah.html)

---

## Galerie interactive

<div style="background: #f8f9fa; padding: 2rem; border-radius: 0.5rem; margin: 2rem 0;">

### Tailles

```jsx
// Petite taille (16px)
<Chefferie size={16} />

// Taille moyenne (24px) - par défaut
<Chefferie size={24} />

// Grande taille (32px)
<Chefferie size={32} />

// Taille personnalisée
<Chefferie size="48px" />
```

### Couleurs

```jsx
// Couleurs terreuses
<Chefferie color="#8B4513" />      // Terre cuite
<Emblemefoumban color="#DAA520" /> // Or
<Masktukah color="#B87333" />      // Cuivre
```

### Styles

```jsx
// Avec classe CSS
<Chefferie className="my-icon" />

// Avec styles inline
<Chefferie style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))' }} />

// Icône cliquable
<Chefferie onClick={() => console.log('Cliqué !')} style={{ cursor: 'pointer' }} />
```

</div>

## Conseils d'utilisation

### Choix des couleurs

Les icônes Icons Fasaha sont conçues pour être utilisées avec des couleurs qui évoquent l'art traditionnel africain :

- **Terre cuite** (`#8B4513`) : Pour les éléments d'autorité et de tradition
- **Or** (`#DAA520`) : Pour les éléments royaux et cérémoniels  
- **Cuivre** (`#B87333`) : Pour les éléments artisanaux et culturels
- **Argile** (`#CD853F`) : Pour les éléments naturels et organiques

### Tailles recommandées

- **16px** : Pour les interfaces denses, boutons compacts
- **24px** : Taille standard, parfaite pour la plupart des usages
- **32px** : Pour les éléments importants, headers
- **48px+** : Pour les illustrations, éléments décoratifs

### Accessibilité

N'oubliez pas d'ajouter des attributs d'accessibilité :

```jsx
<Chefferie 
  size={24}
  aria-label="Symbole de chefferie traditionnelle"
  role="img"
/>
```

## Prochaines étapes

- [Apprendre à utiliser les icônes](/guide/usage)
- [Découvrir les options de personnalisation](/guide/customization)
- [Voir des exemples d'intégration](/guide/svg-examples)
