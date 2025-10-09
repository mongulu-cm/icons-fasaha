# 🚀 Migration vers Cloudflare R2

Ce projet utilise maintenant **Cloudflare R2** pour stocker et distribuer les icônes SVG, au lieu de les stocker localement.

## ✅ Avantages de Cloudflare R2

- **🌐 Distribution mondiale** : Accès rapide depuis n'importe où
- **💰 Coût réduit** : Stockage et bande passante optimisés
- **🔒 Sécurisé** : Accès contrôlé par clés d'API
- **📈 Évolutif** : Supporte des millions de fichiers
- **⚡ Performance** : Latence minimale

## 📋 Configuration

### 1. Informations de connexion

Les identifiants Cloudflare sont désormais chargés depuis des variables
d'environnement. Créez un fichier `.env` à partir de `.env.example` et
renseignez les clés suivantes :

```bash
# .env
CLOUDFLARE_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_BUCKET_NAME=icons-fasaha
CLOUDFLARE_BASE_URL=https://<votre-domaine>/icons-fasaha
CLOUDFLARE_AUTH_TOKEN=<jeton-bearer-ou-token-access>
```

Le fichier `cloudflare-config.mjs` se charge ensuite de lire ces
variables et de les exposer au code applicatif.

### 2. Structure du bucket

```
icons-fasaha/
├── elephant.svg
├── baobab.svg
├── drum.svg
├── chefferie.svg
├── emblemefoumban.svg
└── masktukah.svg
```

## 🔧 Utilisation dans le code

### Chargement des icônes

```javascript
import { loadIconsFromCloudflare } from './cloudflare-utils.js'

const icons = await loadIconsFromCloudflare()
console.log(`${icons.length} icônes chargées depuis Cloudflare`)
```

### Accès direct à une icône

```javascript
import { cloudflareIcons } from './cloudflare-utils.js'

const svgContent = await cloudflareIcons.fetchIconSvg('elephant')
const iconUrl = cloudflareIcons.getIconUrl('baobab')
```

## 🧪 Tests et débogage

### Tester la connexion

```bash
# Test de base
npm run cloudflare:test

# Avec instructions détaillées
npm run cloudflare:test --instructions
```

### Vérifier les logs

Le système affiche des logs détaillés lors du chargement :

```
🔗 Chargement des icônes depuis Cloudflare R2...
📦 Bucket: icons-fasaha
🔗 Base URL: https://<votre-domaine>/icons-fasaha
📥 Chargement de elephant.svg...
✅ elephant.svg chargé (2847 caractères)
📥 Chargement de baobab.svg...
✅ baobab.svg chargé (1923 caractères)
🎉 6 icônes chargées avec succès depuis Cloudflare R2
```

## 🔒 Sécurité

- **Clés d'accès** : Stockées dans `.env` (ne jamais le commiter)
- **Accès contrôlé** : Seules les requêtes autorisées peuvent accéder aux fichiers
- **HTTPS obligatoire** : Toutes les connexions sont sécurisées

## 📊 Avantages par rapport au stockage local

| Aspect | Local | Cloudflare R2 |
|--------|-------|---------------|
| **Performance** | ❌ Limitée à un serveur | ✅ CDN mondial |
| **Évolutivité** | ❌ Limitée | ✅ Illimitée |
| **Coût** | ❌ Stockage serveur | ✅ Pay-per-use |
| **Sécurité** | ❌ Physique | ✅ Clés d'API |
| **Maintenance** | ❌ Manuelle | ✅ Automatique |

## 🚨 Dépannage

### Erreur de connexion

```
❌ Erreur lors du chargement de l'icône elephant depuis Cloudflare: Error: Erreur HTTP 403
```

**Solutions :**
1. Vérifiez les clés d'accès dans votre fichier `.env`
2. Vérifiez que le bucket `icons-fasaha` existe
3. Vérifiez que les fichiers SVG sont uploadés
4. Testez avec `npm run cloudflare:test`

### Fichiers non trouvés

```
⚠️ Impossible de charger elephant.svg depuis Cloudflare
```

**Solutions :**
1. Vérifiez que le fichier existe dans le bucket R2
2. Vérifiez l'orthographe du nom de fichier
3. Vérifiez les permissions du bucket

### Configuration manquante

```
❌ Impossible de charger la configuration Cloudflare
```

**Solutions :**
1. Créez le fichier `.env` à partir de `.env.example`
2. Renseignez toutes les variables Cloudflare requises dans `.env`

## 📚 Ressources

- [Documentation Cloudflare R2](https://developers.cloudflare.com/r2/)
- [Guide de migration](https://developers.cloudflare.com/r2/get-started/)
- [Clés d'accès API](https://developers.cloudflare.com/r2/api/tokens/)

---

**🎉 Migration réussie !** Vos icônes sont maintenant distribuées mondialement via Cloudflare R2 !
