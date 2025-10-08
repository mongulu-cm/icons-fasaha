<template>
  <div class="search-form">
    <!-- Formulaire de recherche -->
    <div class="search-container">
      <div class="search-input-wrapper">
        <div class="search-icon">🔍</div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Tapez le nom d'une icône..."
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
          <span class="results-count">
            {{ filteredIcons.length }} icône{{ filteredIcons.length > 1 ? 's' : '' }}
          </span>
          <span v-if="searchQuery.trim()" class="search-term">pour "{{ searchQuery }}"</span>
          <span v-else class="all-icons">Toutes les icônes disponibles</span>
        </div>

        <div class="icons-grid">
          <div
            v-for="icon in filteredIcons"
            :key="icon.name"
            class="icon-item"
          >
            <div class="icon-preview">
              <div class="icon-svg" v-html="icon.preview"></div>
            </div>

            <div class="icon-info">
              <h4 class="icon-name">{{ icon.name }}</h4>
              <p class="icon-description">{{ icon.description }}</p>
              <div class="icon-category">{{ icon.category }}</div>
            </div>

            <div class="icon-actions">
              <button @click="copyCode(icon)" class="action-button">
                📋 Copier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { loadIconsFromCloudflare } from './cloudflare-utils.js'

// Données réactives
const searchQuery = ref('')

// Données des icônes
const icons = ref([])
const loading = ref(true)
const error = ref(null)

// Charger les données depuis Cloudflare R2
onMounted(async () => {
  try {
    loading.value = true
    error.value = null

    // Charger les icônes depuis Cloudflare R2
    const cloudflareIcons = await loadIconsFromCloudflare()
    icons.value = cloudflareIcons

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

// Icônes de secours si Cloudflare ne fonctionne pas
function getFallbackIcons() {
  return [
    {
      name: "Elephant",
      description: "Icône d'éléphant africain, symbole de force et de sagesse.",
      category: "Nature",
      tags: ["éléphant", "afrique", "nature", "force", "sagesse"],
      culturalContext: "L'éléphant est un symbole important dans la culture africaine",
      preview: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/><circle cx="6" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="18" cy="18" r="2"/><path d="M9 6h6"/><path d="M9 12h6"/><path d="M9 18h6"/></svg>`,
      usageExample: `import { Elephant } from 'icons-fasaha';

<Elephant size={32} color="#8B4513" />`
    },
    {
      name: "Baobab",
      description: "Arbre emblématique d'Afrique, symbole de longévité et de protection.",
      category: "Nature",
      tags: ["baobab", "arbre", "afrique", "longévité", "protection"],
      culturalContext: "Le baobab est un arbre sacré dans de nombreuses cultures africaines",
      preview: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M8 16h8"/><circle cx="12" cy="4" r="2"/><path d="M6 20h12"/><path d="M8 20v-4"/><path d="M16 20v-4"/><path d="M10 8v8"/><path d="M14 8v8"/></svg>`,
      usageExample: `import { Baobab } from 'icons-fasaha';

<Baobab size={24} color="#228B22" />`
    }
  ]
}

// Icônes filtrées selon la recherche
const filteredIcons = computed(() => {
  if (!searchQuery.value.trim()) {
    return icons.value
  }

  const query = searchQuery.value.toLowerCase().trim()

  return icons.value.filter(icon => {
    return (
      icon.name.toLowerCase().includes(query) ||
      icon.description.toLowerCase().includes(query) ||
      icon.tags.some(tag => tag.toLowerCase().includes(query)) ||
      icon.category.toLowerCase().includes(query)
    )
  })
})

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
</script>

<style scoped>
.search-form {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

/* Champ de recherche */
.search-container {
  margin-bottom: 2rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 0 16px;
  transition: border-color 0.2s ease;
  max-width: 500px;
  margin: 0 auto;
}

.search-input-wrapper:focus-within {
  border-color: var(--vp-c-brand);
}

.search-icon {
  font-size: 18px;
  color: var(--vp-c-text-3);
  margin-right: 12px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 16px 0;
  font-size: 16px;
  color: var(--vp-c-text-1);
  outline: none;
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.clear-button {
  background: none;
  border: none;
  font-size: 16px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;
  margin-left: 8px;
}

.clear-button:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
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
  align-items: center;
  gap: 8px;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.results-count {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
}

.search-term {
  color: var(--vp-c-text-2);
  font-style: italic;
}

.icons-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.icon-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s ease;
}

.icon-item:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.icon-preview {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.icon-svg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-svg svg {
  width: 100%;
  height: 100%;
  max-width: 40px;
  max-height: 40px;
  width: 40px;
  height: 40px;
  object-fit: contain;
  color: var(--vp-c-text-1);
  fill: currentColor;
}

.icon-info {
  flex: 1;
}

.icon-name {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  font-weight: 600;
}

.icon-description {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.4;
}

.icon-category {
  background: var(--vp-c-brand);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}

.icon-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.action-button {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.action-button:hover {
  background: var(--vp-c-bg-soft);
}

/* Responsive */
@media (max-width: 768px) {
  .search-form {
    padding: 1rem;
  }

  .icons-grid {
    grid-template-columns: 1fr;
  }

  .icon-item {
    flex-direction: column;
    text-align: center;
  }

  .icon-actions {
    justify-content: center;
  }
}
</style>
