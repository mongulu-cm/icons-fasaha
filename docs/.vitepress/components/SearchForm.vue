<template>
  <div class="search-form">
    <!-- Barre de recherche principale -->
    <div class="main-search-container">
      <div class="search-header">
        <h1 class="search-title">Icons Fasaha</h1>
        <p class="search-subtitle">Icônes artistiques africaines pour le web</p>
      </div>
      
      <div class="search-input-wrapper">
        <div class="search-icon">🔍</div>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="`Rechercher ${icons.length} icônes...`"
          class="search-input"
          @input="handleSearch"
        />
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="clear-button"
          title="Effacer la recherche"
        >
          ✕
        </button>
      </div>
    </div>

    <!-- Filtres et options -->
    <div class="filters-container">
      <div class="filters-left">
        <div class="filter-group">
          <label class="filter-label">Style :</label>
          <div class="filter-options">
            <button 
              v-for="style in availableStyles" 
              :key="style"
              @click="selectedStyle = style"
              :class="['filter-button', { active: selectedStyle === style }]"
            >
              {{ style }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="filters-right">
        <div class="view-options">
          <button 
            @click="viewMode = 'grid'"
            :class="['view-button', { active: viewMode === 'grid' }]"
            title="Vue grille"
          >
            ⚏
          </button>
          <button 
            @click="viewMode = 'list'"
            :class="['view-button', { active: viewMode === 'list' }]"
            title="Vue liste"
          >
            ☰
          </button>
        </div>
      </div>
    </div>

    <!-- Liste des icônes disponibles -->
    <div class="icons-section">
      <!-- État de chargement -->
      <div v-if="loading" class="loading-message">
        <div class="loading-icon">⏳</div>
        <h3>Chargement des icônes...</h3>
        <p>Connexion à Cloudflare R2...</p>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="error" class="error-message">
        <div class="error-icon">⚠️</div>
        <h3>Erreur de chargement</h3>
        <p>{{ error }}</p>
        <p>Utilisation des icônes de secours locales.</p>
      </div>

      <!-- Liste des icônes -->
      <div v-else class="icons-list">
        <div class="results-header">
          <div class="results-info">
            <span class="results-count">
              {{ filteredIcons.length }} icône{{ filteredIcons.length > 1 ? 's' : '' }}
            </span>
            <span v-if="searchQuery.trim()" class="search-term">pour "{{ searchQuery }}"</span>
          </div>
          
          <!-- Tags de filtres actifs -->
          <div class="active-filters" v-if="hasActiveFilters">
            <span 
              v-if="searchQuery.trim()" 
              class="filter-tag"
              @click="clearSearch"
            >
              Recherche: "{{ searchQuery }}" ✕
            </span>
            <span 
              v-if="selectedStyle !== 'Tous'"
              class="filter-tag"
              @click="selectedStyle = 'Tous'"
            >
              Style: {{ selectedStyle }} ✕
            </span>
            <button @click="clearAllFilters" class="reset-button">
              RESET
            </button>
          </div>
        </div>

        <div class="icons-grid" :class="{ 'list-view': viewMode === 'list' }">
          <div
            v-for="icon in filteredIcons"
            :key="icon.name"
            class="icon-item"
            :class="{ 'list-item': viewMode === 'list' }"
            @click="showIconDetails(icon)"
          >
            <div class="icon-preview">
              <div class="icon-svg" v-html="icon.preview"></div>
            </div>
            <div class="icon-name-label">{{ icon.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modale de détails de l'icône -->
    <div v-if="selectedIcon" class="icon-modal-overlay" @click="closeIconDetails">
      <div class="icon-modal" @click.stop>
        <div class="modal-header">
          <div class="modal-title">
            <h2>{{ selectedIcon.name }}</h2>
            <span class="icon-id">{{ selectedIcon.name.toLowerCase() }}</span>
          </div>
          <button @click="closeIconDetails" class="close-button">✕</button>
        </div>

        <div class="modal-content">
          <!-- Section de prévisualisation -->
          <div class="preview-section">
            <div class="large-icon-preview" :class="{ 'large-size': isLargePreview }">
              <div class="icon-display" v-html="selectedIcon.preview"></div>
            </div>
            <div class="preview-controls">
              <button @click="togglePreviewSize" class="size-toggle-button">
                {{ isLargePreview ? '📏 Taille normale' : '🔍 Taille réelle' }}
              </button>
            </div>
          </div>

          <!-- Section des détails -->
          <div class="details-section">
            <div class="icon-info-detail">
              <h3>Description</h3>
              <p>{{ selectedIcon.description }}</p>
              
              <h3>Contexte culturel</h3>
              <p>{{ selectedIcon.culturalContext }}</p>
              
              <h3>Catégorie</h3>
              <div class="category-badge">{{ selectedIcon.category }}</div>
              
              <h3>Tags</h3>
              <div class="tags-container">
                <span v-for="tag in selectedIcon.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>

            <div class="code-section">
              <h3>Code d'utilisation</h3>
              <div class="code-block">
                <pre><code>{{ selectedIcon.usageExample }}</code></pre>
                <button @click="copyCode(selectedIcon)" class="copy-code-button">
                  📋 Copier le code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { loadIconsFromCloudflare } from './cloudflare-utils.js'

// Données réactives
const searchQuery = ref('')

// Données des icônes
const icons = ref([])
const loading = ref(true)
const error = ref(null)

// Modale de détails
const selectedIcon = ref(null)
const isLargePreview = ref(false)

// Filtres et vues
const selectedStyle = ref('Tous')
const viewMode = ref('grid')
const availableStyles = ref(['Tous', 'Solid', 'Regular', 'Light', 'Thin'])

// Icônes filtrées selon la recherche et les filtres
const filteredIcons = computed(() => {
  let filtered = icons.value

  // Filtre par recherche
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(icon => {
      return (
        icon.name.toLowerCase().includes(query) ||
        icon.description.toLowerCase().includes(query) ||
        icon.tags.some(tag => tag.toLowerCase().includes(query)) ||
        icon.category.toLowerCase().includes(query)
      )
    })
  }

  // Filtre par style (pour l'instant, on garde tous les styles)
  // Plus tard, on pourra ajouter la logique de filtrage par style

  return filtered
})

// Vérifier s'il y a des filtres actifs
const hasActiveFilters = computed(() => {
  return searchQuery.value.trim() || selectedStyle.value !== 'Tous'
})

// Watcher pour ajuster les SVG quand les données changent
watch([() => filteredIcons.value, () => selectedIcon.value, () => viewMode.value], () => {
  fitAllRenderedSvgs()
})

// Charger les données depuis Cloudflare R2
onMounted(async () => {
  try {
    loading.value = true
    error.value = null

    // Charger les icônes depuis Cloudflare R2
    const cloudflareIcons = await loadIconsFromCloudflare()
    
    // Enrichir les icônes avec les informations générées si elles manquent
    icons.value = cloudflareIcons.map(icon => ({
      ...icon,
      preview: normalizeSvg(icon.preview), // Normaliser le SVG pour un affichage correct
      description: icon.description || generateDescription(icon.name),
      culturalContext: icon.culturalContext || generateCulturalContext(icon.name),
      tags: icon.tags || generateTags(icon.name),
      category: icon.category || 'Culture',
      usageExample: icon.usageExample || `import { ${icon.name} } from 'icons-fasaha';\n\n<${icon.name} size={32} color="#8B4513" />`
    }))

    console.log(`✅ ${icons.value.length} icônes chargées depuis Cloudflare R2`)
  } catch (error) {
    console.error('❌ Erreur lors du chargement des icônes depuis Cloudflare:', error)
    error.value = 'Impossible de charger les icônes depuis Cloudflare R2'

    // Fallback avec des données locales
    icons.value = getFallbackIcons()
  } finally {
    loading.value = false
  }
})

// Ajustement dynamique: recadrer le viewBox selon le contenu réel (getBBox)
function fitSvgToContent(svg) {
  try {
    // Forcer des styles de base
    svg.removeAttribute('width')
    svg.removeAttribute('height')
    svg.style.width = '100%'
    svg.style.height = '100%'
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')

    // Calculer le bounding box réel des éléments
    const bbox = svg.getBBox()
    if (bbox && isFinite(bbox.width) && bbox.width > 0 && isFinite(bbox.height) && bbox.height > 0) {
      svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`)
    }
  } catch (e) {
    // Ignorer silencieusement si le SVG n'est pas encore dans le DOM ou getBBox échoue
  }
}

function fitAllRenderedSvgs() {
  nextTick(() => {
    const svgs = document.querySelectorAll('.icon-svg svg, .icon-display svg')
    svgs.forEach((svg) => fitSvgToContent(svg))
  })
}

onMounted(() => {
  fitAllRenderedSvgs()
})

// Fonction pour normaliser les SVG et assurer un affichage correct
function normalizeSvg(svgString) {
  if (!svgString) return svgString
  
  // Créer un parser DOM temporaire
  const parser = new DOMParser()
  const doc = parser.parseFromString(svgString, 'image/svg+xml')
  const svg = doc.querySelector('svg')
  
  if (!svg) return svgString
  
  // Forcer un viewBox si absent
  if (!svg.hasAttribute('viewBox')) {
    const width = svg.getAttribute('width') || '24'
    const height = svg.getAttribute('height') || '24'
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }
  
  // Supprimer les attributs width et height pour permettre le scaling
  svg.removeAttribute('width')
  svg.removeAttribute('height')
  
  // S'assurer que preserveAspectRatio est défini
  if (!svg.hasAttribute('preserveAspectRatio')) {
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  }
  
  // Ajouter une classe pour le styling
  svg.setAttribute('class', 'normalized-svg')
  
  return svg.outerHTML
}

// Fonction pour générer une description à partir du nom de l'icône
function generateDescription(iconName) {
  // Dictionnaire de descriptions personnalisées pour les icônes africaines
  const customDescriptions = {
    'Elephant': "Icône d'éléphant africain, symbole de force, de sagesse et de mémoire ancestrale.",
    'Baobab': "Arbre emblématique d'Afrique, symbole de longévité, de protection et de résilience.",
    'Chefferie': "Symbole de l'autorité traditionnelle et de la hiérarchie sociale dans les sociétés africaines.",
    'Emblemefoumban': "Représentation artistique des symboles royaux du royaume Bamoun.",
    'Masktukah': "Masque traditionnel utilisé dans les cérémonies et rituels culturels africains.",
    'Drum': "Tambour traditionnel africain, instrument de communication, de célébration et de transmission culturelle.",
    'Djembe': "Instrument de percussion traditionnel, symbole de la musique et de la danse africaine.",
    'Kente': "Motif de tissu traditionnel africain, symbole de richesse culturelle et d'identité.",
    'Adinkra': "Symbole visuel africain porteur de sagesse et de philosophie ancestrale.",
    'Pyramid': "Représentation des pyramides africaines, symbole de grandeur et d'héritage historique.",
    'Calabash': "Calebasse traditionnelle, récipient ancestral symbole d'hospitalité et de partage.",
    'Cowrie': "Coquillage cauris, ancien symbole de richesse et de commerce en Afrique.",
    'Ashanti': "Symbole du peuple Ashanti, représentant la culture et les traditions ghanéennes.",
    'Giraffe': "Girafe africaine, symbole d'élégance, de vision et de grâce naturelle.",
    'Lion': "Lion d'Afrique, symbole de courage, de royauté et de puissance.",
    'Zebra': "Zèbre africain, symbole d'unicité et d'harmonie dans la diversité.",
  }

  // Si une description personnalisée existe, l'utiliser
  if (customDescriptions[iconName]) {
    return customDescriptions[iconName]
  }

  // Sinon, générer une description basique
  const formattedName = iconName
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .toLowerCase()
  
  return `Icône représentant ${formattedName}, élément de la culture et de l'art africain.`
}

// Fonction pour générer un contexte culturel
function generateCulturalContext(iconName) {
  const contexts = {
    'Elephant': "L'éléphant est vénéré dans de nombreuses cultures africaines comme symbole de sagesse, de mémoire ancestrale et de force communautaire.",
    'Baobab': "Le baobab est considéré comme l'arbre de vie dans de nombreuses cultures africaines, lieu de rassemblement et de transmission du savoir.",
    'Chefferie': "La chefferie représente l'autorité traditionnelle et le système de gouvernance ancestral encore présent dans de nombreuses sociétés africaines.",
    'Emblemefoumban': "L'emblème de Foumban symbolise la richesse culturelle du royaume Bamoun au Cameroun, centre d'art et d'écriture traditionnelle.",
    'Masktukah': "Les masques traditionnels jouent un rôle central dans les cérémonies africaines, servant de lien entre le monde visible et spirituel.",
    'Drum': "Le tambour est bien plus qu'un instrument : c'est un moyen de communication, de célébration et de préservation de la mémoire collective.",
  }

  return contexts[iconName] || `Élément important de la culture africaine, porteur de significations profondes et de traditions ancestrales.`
}

// Fonction pour générer des tags
function generateTags(iconName) {
  const tagMap = {
    'Elephant': ['éléphant', 'afrique', 'nature', 'force', 'sagesse', 'mémoire'],
    'Baobab': ['baobab', 'arbre', 'afrique', 'longévité', 'protection', 'nature'],
    'Chefferie': ['autorité', 'tradition', 'hiérarchie', 'chefferie', 'pouvoir'],
    'Emblemefoumban': ['royal', 'bamoun', 'emblème', 'royaume', 'cameroun'],
    'Masktukah': ['masque', 'cérémonie', 'rituel', 'tradition', 'spirituel'],
    'Drum': ['tambour', 'musique', 'tradition', 'communication', 'célébration'],
  }

  const defaultTags = [iconName.toLowerCase(), 'afrique', 'culture', 'tradition', 'art']
  return tagMap[iconName] || defaultTags
}

// Icônes de secours si Cloudflare ne fonctionne pas
function getFallbackIcons() {
  const icons = [
    {
      name: "Elephant",
      preview: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/><circle cx="6" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="18" cy="18" r="2"/><path d="M9 6h6"/><path d="M9 12h6"/><path d="M9 18h6"/></svg>`,
    },
    {
      name: "Baobab",
      preview: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h8"/><circle cx="12" cy="4" r="2"/><path d="M6 20h12"/><path d="M8 20v-4"/><path d="M16 20v-4"/><path d="M10 8v8"/><path d="M14 8v8"/></svg>`,
    }
  ]

  // Enrichir chaque icône avec les informations générées
  return icons.map(icon => ({
    ...icon,
    preview: normalizeSvg(icon.preview), // Normaliser le SVG
    description: generateDescription(icon.name),
    category: 'Nature',
    tags: generateTags(icon.name),
    culturalContext: generateCulturalContext(icon.name),
    usageExample: `import { ${icon.name} } from 'icons-fasaha';\n\n<${icon.name} size={32} color="#8B4513" />`
  }))
}

// Méthodes
const handleSearch = () => {
  // La recherche est automatique grâce à computed
}

const clearSearch = () => {
  searchQuery.value = ''
}

const copyCode = async (icon) => {
  try {
    await navigator.clipboard.writeText(icon.usageExample)
    // Feedback visuel simple
    console.log('Code copié !')
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
  }
}

// Méthodes pour la modale
const showIconDetails = (icon) => {
  selectedIcon.value = icon
  isLargePreview.value = false
}

const closeIconDetails = () => {
  selectedIcon.value = null
  isLargePreview.value = false
}

const togglePreviewSize = () => {
  isLargePreview.value = !isLargePreview.value
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedStyle.value = 'Tous'
}
</script>

<style scoped>
.search-form {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--vp-c-bg);
}

/* Barre de recherche principale */
.main-search-container {
  text-align: center;
  margin-bottom: 3rem;
}

.search-header {
  margin-bottom: 2rem;
}

.search-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, var(--vp-c-brand), #8B4513);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.search-subtitle {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  padding: 0 20px;
  transition: all 0.3s ease;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-input-wrapper:focus-within {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.search-icon {
  font-size: 20px;
  color: #666;
  margin-right: 16px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 20px 0;
  font-size: 18px;
  color: var(--vp-c-text-1);
  outline: none;
}

.search-input::placeholder {
  color: #999;
}

.clear-button {
  background: none;
  border: none;
  font-size: 18px;
  color: #999;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  margin-left: 12px;
}

.clear-button:hover {
  background: #f5f5f5;
  color: #666;
}

/* Filtres et options */
.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--vp-c-border);
}

.filters-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-options {
  display: flex;
  gap: 0.5rem;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.filter-button:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.filter-button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.filters-right {
  display: flex;
  align-items: center;
}

.view-options {
  display: flex;
  gap: 0.5rem;
}

.view-button {
  padding: 0.5rem;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-button:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.view-button.active {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* Section des icônes */
.icons-section {
  min-height: 400px;
}

/* État de chargement */
.loading-message {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-2);
}

.loading-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.loading-message h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.loading-message p {
  margin: 0;
}

/* Message d'erreur */
.error-message {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-2);
  background: rgba(220, 38, 38, 0.05);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 8px;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.error-message h3 {
  margin: 0 0 0.5rem 0;
  color: #dc2626;
}

.error-message p {
  margin: 0.5rem 0;
}

/* Message initial */
.initial-message {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-2);
}

.message-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.initial-message h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.initial-message p {
  margin: 0;
}

/* Liste des icônes */
.icons-list {
  margin-top: 1rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.results-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.results-count {
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.search-term {
  color: var(--vp-c-text-2);
  font-style: italic;
}

.active-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-tag {
  background: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #ddd;
}

.filter-tag:hover {
  background: #e0e0e0;
  color: #333;
}

.reset-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.reset-button:hover {
  background: #c82333;
}

.icons-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
}

.icons-grid.list-view {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.icon-item {
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.icon-item:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
  background: #f8f9fa;
}

.icon-item.list-item {
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  padding: 1rem 1.5rem;
}

.icon-item.list-item .icon-preview {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.icon-preview {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65), 0 6px 16px rgba(15, 23, 42, 0.12);
  transition: all 0.3s ease;
  overflow: hidden;
}

.icon-preview::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: linear-gradient(
    45deg,
    rgba(148, 163, 184, 0.18) 25%,
    transparent 25%,
    transparent 50%,
    rgba(148, 163, 184, 0.18) 50%,
    rgba(148, 163, 184, 0.18) 75%,
    transparent 75%
  );
  background-size: 12px 12px;
  opacity: 0.55;
}

.icon-item:hover .icon-preview {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  transform: scale(1.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 10px 24px rgba(15, 23, 42, 0.2);
}

.icon-svg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  position: relative;
  z-index: 1;
}

.dark .search-form .icon-preview {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.92) 0%, rgba(17, 24, 39, 0.94) 100%);
  border-color: rgba(148, 163, 184, 0.35);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 12px 28px rgba(0, 0, 0, 0.45);
}

.dark .search-form .icon-preview::before {
  background-image: linear-gradient(
    45deg,
    rgba(148, 163, 184, 0.28) 25%,
    transparent 25%,
    transparent 50%,
    rgba(148, 163, 184, 0.28) 50%,
    rgba(148, 163, 184, 0.28) 75%,
    transparent 75%
  );
  opacity: 0.45;
}

.dark .search-form .icon-item:hover .icon-preview {
  background: linear-gradient(135deg, rgba(45, 55, 72, 0.95) 0%, rgba(23, 30, 44, 0.96) 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 14px 30px rgba(0, 0, 0, 0.55);
}

.icon-name-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  transition: all 0.3s ease;
}

.icon-item:hover .icon-name-label {
  color: var(--vp-c-brand);
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .search-form {
    padding: 1rem;
  }

  .search-title {
    font-size: 2rem;
  }

  .search-input-wrapper {
    max-width: 100%;
    padding: 0 16px;
  }

  .search-input {
    padding: 16px 0;
    font-size: 16px;
  }

  .filters-container {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .filters-left {
    justify-content: center;
  }

  .filter-group {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .filter-options {
    flex-wrap: wrap;
    justify-content: center;
  }

  .results-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .active-filters {
    justify-content: center;
  }

  .icons-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    padding: 1rem;
  }

  .icon-preview {
    width: 60px;
    height: 60px;
  }

  .icon-name-label {
    font-size: 0.8rem;
  }
}

/* Styles pour la modale */
.icon-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.icon-modal {
  background: var(--vp-c-bg);
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--vp-c-border);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.modal-title h2 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
  font-weight: 600;
}

.icon-id {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
  font-family: monospace;
  margin-left: 0.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.modal-content {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.preview-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.large-icon-preview {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 2px solid var(--vp-c-border);
  transition: all 0.3s ease;
}

.large-icon-preview.large-size {
  width: 400px;
  height: 400px;
}

.icon-display {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.large-icon-preview.large-size .icon-display {
  padding: 40px;
}

.size-toggle-button {
  padding: 0.75rem 1.5rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.size-toggle-button:hover {
  background: var(--vp-c-brand-dark, #1a5f99);
  transform: translateY(-1px);
}

.details-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.icon-info-detail h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  font-weight: 600;
}

.icon-info-detail p {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.category-badge {
  background: var(--vp-c-brand);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  margin-bottom: 1rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  border: 1px solid var(--vp-c-border);
}

.code-section {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
}

.code-block {
  position: relative;
}

.code-block pre {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  padding: 1rem;
  margin: 0 0 1rem 0;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.4;
}

.code-block code {
  color: var(--vp-c-text-1);
}

.copy-code-button {
  width: 100%;
  padding: 0.75rem;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.copy-code-button:hover {
  background: var(--vp-c-brand-dark, #1a5f99);
}

/* Responsive pour la modale */
@media (max-width: 768px) {
  .icon-modal-overlay {
    padding: 1rem;
  }
  
  .modal-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .large-icon-preview {
    width: 150px;
    height: 150px;
  }
  
  .large-icon-preview.large-size {
    width: 250px;
    height: 250px;
  }
  
  .modal-header {
    padding: 1rem 1.5rem;
  }
}
</style>
