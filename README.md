# Icons Fasaha

🎨 **Icônes artistiques africaines pour le web** - Librairie d'icônes dédiées à la culture d'Afrique centrale

[![npm version](https://badge.fury.io/js/icons-fasaha.svg)](https://badge.fury.io/js/icons-fasaha)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌍 À propos

Icons Fasaha est une librairie d'icônes dédiée à la culture d'Afrique centrale, particulièrement du Cameroun. Elle propose des icônes artistiques inspirées de l'art traditionnel africain, parfaites pour enrichir vos projets web avec une touche culturelle authentique.

## ✨ Caractéristiques

- 🎨 **Icônes artistiques** : Inspirées de l'art traditionnel africain
- ⚡ **Performant** : Composants React optimisés
- 🎯 **TypeScript** : Support complet des types
- 📦 **Léger** : Taille minimale, impact maximal
- 🌍 **Culturel** : Représentation authentique de la culture africaine
- 🔧 **Personnalisable** : Couleurs, tailles et styles adaptables

## 🚀 Installation

```bash
npm install icons-fasaha
```

```bash
yarn add icons-fasaha
```

```bash
pnpm add icons-fasaha
```

## 🌐 Stockage Cloudflare R2

Les icônes sont maintenant stockées sur **Cloudflare R2** pour une distribution mondiale optimale.

### Configuration requise

1. **Clés d'accès Cloudflare** : Configurez `cloudflare-config.js` avec vos vraies valeurs
2. **Bucket R2** : Créez un bucket nommé `icons-fasaha`
3. **Upload des fichiers** : Uploadez vos fichiers SVG dans le bucket

### Commandes disponibles

```bash
# Test de connexion à Cloudflare
npm run cloudflare:test

# Upload des icônes vers Cloudflare
npm run cloudflare:upload

# Configuration initiale
npm run cloudflare:setup
```

### Plus d'informations

Consultez [CLOUDFLARE_README.md](./CLOUDFLARE_README.md) pour tous les détails sur la configuration Cloudflare.

## 📖 Utilisation

### Import des icônes

```jsx
import { Chefferie, Emblemefoumban, Masktukah } from 'icons-fasaha';

function App() {
  return (
    <div>
      <Chefferie size={32} color="#8B4513" />
      <Emblemefoumban size={24} color="#DAA520" />
      <Masktukah size={28} color="#B87333" />
    </div>
  );
}
```

### Propriétés disponibles

Toutes les icônes acceptent les propriétés suivantes :

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `number \| string` | `24` | Taille de l'icône en pixels |
| `color` | `string` | `'currentColor'` | Couleur de l'icône |
| `className` | `string` | `''` | Classe CSS personnalisée |
| `style` | `React.CSSProperties` | `{}` | Styles inline |
| `onClick` | `() => void` | `undefined` | Fonction de callback au clic |

### Exemples d'utilisation

```jsx
// Tailles différentes
<Chefferie size={16} />
<Chefferie size={24} />
<Chefferie size={32} />

// Couleurs personnalisées
<Emblemefoumban color="#8B4513" />  // Terre cuite
<Emblemefoumban color="#DAA520" />  // Or
<Emblemefoumban color="#B87333" />  // Cuivre

// Avec des classes CSS
<Masktukah className="my-icon" />

// Icônes cliquables
<Chefferie 
  size={32} 
  onClick={() => console.log('Cliqué !')}
  style={{ cursor: 'pointer' }}
/>
```

## 🎨 Icônes disponibles

### Chefferie
Symbole de l'autorité traditionnelle et de la hiérarchie sociale dans les sociétés africaines.

### Emblème Foumban
Représentation artistique des symboles royaux du royaume Bamoun.

### Masque Tukah
Masque traditionnel utilisé dans les cérémonies et rituels culturels.

## 🎨 Palette de couleurs recommandée

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
```

## 📚 Documentation

Pour une documentation complète avec des exemples détaillés, visitez notre [site de documentation](https://mongulu-cm.github.io/icons-fasaha/).

## 🛠️ Développement

### Prérequis

- Node.js 16+
- npm ou yarn

### Installation des dépendances

```bash
npm install
```

### Scripts disponibles

```bash
# Build de la librairie
npm run build

# Développement avec watch
npm run dev

# Documentation en mode développement
npm run docs:dev

# Build de la documentation
npm run docs:build

# Publication (dry-run)
npm run publish -- --dry-run

# Publication
npm run publish
```

### Structure du projet

```
icons-fasaha/
├── src/                    # Code source
│   ├── icons/             # Composants d'icônes
│   ├── Icon.tsx           # Composant de base
│   ├── types.ts           # Types TypeScript
│   └── index.ts           # Point d'entrée
├── docs/                  # Documentation VitePress
├── svgs/                  # Fichiers SVG sources
├── scripts/               # Scripts utilitaires
└── dist/                  # Build de production
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- À la communauté africaine pour l'inspiration culturelle
- Aux artistes traditionnels qui ont créé ces symboles
- À tous les contributeurs qui rendent ce projet possible

## 📞 Contact

- **Auteur** : ptchepga
- **GitHub** : [mongulu-cm/icons-fasaha](https://github.com/mongulu-cm/icons-fasaha)
- **Issues** : [Signaler un bug ou demander une fonctionnalité](https://github.com/mongulu-cm/icons-fasaha/issues)

---

<div align="center">
  <p>Créé avec ❤️ pour la communauté africaine et tous ceux qui apprécient l'art traditionnel</p>
</div>
