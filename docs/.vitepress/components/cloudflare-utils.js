// Utilitaires pour accéder aux icônes depuis Cloudflare R2
import { CLOUDFLARE_CONFIG } from '../../../cloudflare-config.js'

/**
 * Classe utilitaire pour accéder aux icônes depuis Cloudflare R2
 */
export class CloudflareIcons {
  constructor() {
    // Configuration Cloudflare R2 (chargée depuis le fichier de config)
    this.accountId = CLOUDFLARE_CONFIG.accountId
    this.accessKey = CLOUDFLARE_CONFIG.accessKeyId
    this.secretKey = CLOUDFLARE_CONFIG.secretAccessKey
    this.bucketName = CLOUDFLARE_CONFIG.bucketName
    this.baseUrl = CLOUDFLARE_CONFIG.baseUrl
    this.availableIcons = CLOUDFLARE_CONFIG.availableIcons
    this.headers = CLOUDFLARE_CONFIG.requestHeaders
    this.svgPromises = new Map()
    this.svgCache = new Map()
    this.iconsCache = null
    this.iconsPromise = null
  }

  /**
   * Génère l'URL pour accéder à une icône SVG depuis Cloudflare R2
   * @param {string} iconName - Nom de l'icône (sans extension)
   * @returns {string} URL complète vers l'icône
   */
  getIconUrl(iconName) {
    return `${this.baseUrl}/${iconName}.svg`
  }

  /**
   * Récupère le contenu SVG d'une icône depuis Cloudflare R2
   * @param {string} iconName - Nom de l'icône
   * @returns {Promise<string>} Contenu SVG
   */
  async fetchIconSvg(iconName) {
    if (this.svgCache.has(iconName)) {
      return this.svgCache.get(iconName)
    }

    if (this.svgPromises.has(iconName)) {
      return this.svgPromises.get(iconName)
    }

    const fetchTask = (async () => {
      try {
        const url = this.getIconUrl(iconName)
        const response = await fetch(url, {
          method: 'GET',
          headers: this.headers
        })

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`)
        }

        const svgText = await response.text()
        this.svgCache.set(iconName, svgText)
        return svgText
      } catch (error) {
        console.error(`Erreur lors du chargement de l'icône ${iconName} depuis Cloudflare:`, error)
        this.svgPromises.delete(iconName)
        this.svgCache.delete(iconName)
        return null
      } finally {
        this.svgPromises.delete(iconName)
      }
    })()

    this.svgPromises.set(iconName, fetchTask)
    return fetchTask
  }

  /**
   * Charge toutes les icônes depuis Cloudflare R2
   * @param {{ forceRefresh?: boolean }} [options]
   * @returns {Promise<Array>} Liste des icônes avec leurs métadonnées
   */
  async loadAllIcons(options = {}) {
    const { forceRefresh = false } = options

    if (!forceRefresh && this.iconsCache) {
      return this.iconsCache
    }

    if (!forceRefresh && this.iconsPromise) {
      return this.iconsPromise
    }

    try {
      console.log('🔗 Chargement des icônes depuis Cloudflare R2...')
      console.log(`📦 Bucket: ${this.bucketName}`)
      console.log(`🔗 Base URL: ${this.baseUrl}`)

      const uniqueIcons = Array.from(new Set(this.availableIcons || []))

      const loadTask = Promise.all(
        uniqueIcons.map(async (iconName) => {
          console.log(`📥 Chargement de ${iconName}.svg...`)
          const svgContent = await this.fetchIconSvg(iconName)

          if (svgContent) {
            console.log(`✅ ${iconName}.svg chargé (${svgContent.length} caractères)`)
            return this.generateMetadata(iconName, svgContent)
          }

          console.warn(`⚠️  Impossible de charger ${iconName}.svg depuis Cloudflare`)
          return null
        })
      ).then((results) => {
        const icons = results.filter(Boolean)
        console.log(`🎉 ${icons.length} icônes chargées avec succès depuis Cloudflare R2`)
        this.iconsCache = icons
        this.iconsPromise = null
        return icons
      }).catch((error) => {
        this.iconsPromise = null
        throw error
      })

      this.iconsPromise = loadTask
      return await loadTask
    } catch (error) {
      console.error('❌ Erreur lors du chargement des icônes depuis Cloudflare:', error)
      this.iconsPromise = null
      return []
    }
  }

  /**
   * Génère les métadonnées d'une icône basée sur son nom et contenu
   * @param {string} iconName - Nom de l'icône
   * @param {string} svgContent - Contenu SVG
   * @returns {Object} Métadonnées de l'icône
   */
  generateMetadata(iconName, svgContent) {
    // Mapping des métadonnées par nom d'icône
    const metadataMap = {
      'elephant': {
        description: "Icône d'éléphant africain, symbole de force et de sagesse.",
        category: "Nature",
        tags: ["éléphant", "afrique", "nature", "force", "sagesse"],
        culturalContext: "L'éléphant est un symbole important dans la culture africaine",
        usageExample: `import { Elephant } from 'icons-fasaha';

<Elephant size={32} color="#8B4513" />`
      },
      'baobab': {
        description: "Arbre emblématique d'Afrique, symbole de longévité et de protection.",
        category: "Nature",
        tags: ["baobab", "arbre", "afrique", "longévité", "protection"],
        culturalContext: "Le baobab est un arbre sacré dans de nombreuses cultures africaines",
        usageExample: `import { Baobab } from 'icons-fasaha';

<Baobab size={24} color="#228B22" />`
      },
      'drum': {
        description: "Tambour traditionnel africain, instrument de communication et de célébration.",
        category: "Musique",
        tags: ["tambour", "musique", "tradition", "communication", "célébration"],
        culturalContext: "Le tambour est central dans la musique et la communication africaines",
        usageExample: `import { Drum } from 'icons-fasaha';

<Drum size={28} color="#B87333" />`
      },
      'chefferie': {
        description: "Symbole de l'autorité traditionnelle et de la hiérarchie sociale dans les sociétés africaines.",
        category: "Autorité",
        tags: ["autorité", "tradition", "hiérarchie", "chefferie"],
        culturalContext: "Représente l'autorité traditionnelle dans les sociétés africaines",
        usageExample: `import { Chefferie } from 'icons-fasaha';

<Chefferie size={32} color="#8B4513" />`
      },
      'emblemefoumban': {
        description: "Représentation artistique des symboles royaux du royaume Bamoun.",
        category: "Royal",
        tags: ["royal", "bamoun", "emblème", "royaume"],
        culturalContext: "Emblème du royaume Bamoun au Cameroun",
        usageExample: `import { Emblemefoumban } from 'icons-fasaha';

<Emblemefoumban size={24} color="#DAA520" />`
      },
      'masktukah': {
        description: "Masque traditionnel utilisé dans les cérémonies et rituels culturels.",
        category: "Cérémoniel",
        tags: ["masque", "cérémonie", "rituel", "tradition"],
        culturalContext: "Masque utilisé dans les cérémonies traditionnelles africaines",
        usageExample: `import { Masktukah } from 'icons-fasaha';

<Masktukah size={28} color="#B87333" />`
      }
    }

    const metadata = metadataMap[iconName.toLowerCase()] || {}

    // Générer l'aperçu SVG
    const previewSvg = this.generatePreviewSvg(svgContent, iconName)

    return {
      name: this.formatIconName(iconName),
      description: metadata.description || `Icône ${iconName}`,
      category: metadata.category || 'Général',
      tags: metadata.tags || [iconName.toLowerCase()],
      culturalContext: metadata.culturalContext || '',
      preview: previewSvg,
      usageExample: metadata.usageExample || `import { ${this.formatIconName(iconName)} } from 'icons-fasaha';

<${this.formatIconName(iconName)} size={24} color="#333" />`,
      cloudflareUrl: this.getIconUrl(iconName)
    }
  }

  /**
   * Génère un aperçu SVG pour l'icône
   * @param {string} svgContent - Contenu SVG complet
   * @param {string} iconName - Nom de l'icône
   * @returns {string} SVG d'aperçu
   */
  generatePreviewSvg(svgContent, iconName) {
    try {
      // Extraire le contenu SVG (sans les balises externes si présentes)
      let cleanSvg = svgContent

      // Si le contenu contient des balises SVG complètes
      if (svgContent.includes('<svg') && svgContent.includes('</svg>')) {
        const svgMatch = svgContent.match(/<svg[^>]*>(.*)<\/svg>/s)
        if (svgMatch) {
          cleanSvg = svgMatch[1]
        }
      }

      // Nettoyer le contenu
      cleanSvg = cleanSvg.replace(/<!--[\s\S]*?-->/g, '') // Supprimer les commentaires
      cleanSvg = cleanSvg.replace(/\s+/g, ' ') // Normaliser les espaces
      cleanSvg = cleanSvg.trim()

      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${cleanSvg}</svg>`
    } catch (error) {
      console.error(`Erreur lors de la génération de l'aperçu pour ${iconName}:`, error)
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>`
    }
  }

  /**
   * Formate le nom de l'icône en PascalCase
   * @param {string} iconName - Nom de l'icône
   * @returns {string} Nom formaté
   */
  formatIconName(iconName) {
    return iconName
      .split(/[-_]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('')
  }

  /**
   * Test de connexion à Cloudflare R2
   * @returns {Promise<boolean>} État de la connexion
   */
  async testConnection() {
    try {
      // Tester avec une icône qui devrait exister
      const testIcon = this.availableIcons[0] || 'elephant'
      const testUrl = this.getIconUrl(testIcon)

      const response = await fetch(testUrl, {
        method: 'HEAD',
        headers: this.headers
      })

      if (response.ok) {
        console.log(`✅ Connexion à Cloudflare R2 réussie !`)
        console.log(`📁 Bucket: ${this.bucketName}`)
        console.log(`🔗 URL de test: ${testUrl}`)
        return true
      } else {
        console.error(`❌ Échec de connexion (${response.status}): ${response.statusText}`)
        return false
      }
    } catch (error) {
      console.error('❌ Erreur de connexion à Cloudflare:', error.message)
      return false
    }
  }
}

// Instance globale
export const cloudflareIcons = new CloudflareIcons()

// Fonction d'aide pour charger les icônes depuis Cloudflare
export async function loadIconsFromCloudflare(options) {
  return await cloudflareIcons.loadAllIcons(options)
}

// Fonction d'aide pour tester la connexion
export async function testCloudflareConnection() {
  return await cloudflareIcons.testConnection()
}
