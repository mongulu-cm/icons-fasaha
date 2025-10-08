<template>
  <div class="simple-icon-search">
    <!-- Champ de recherche -->
    <div class="search-container">
      <div class="search-input-wrapper">
        <div class="search-icon">🔍</div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher une icône..."
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

    <!-- Résultats de recherche -->
    <div class="search-results">
      <!-- Message si aucun résultat -->
      <div v-if="searchQuery && filteredIcons.length === 0" class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>Aucune icône trouvée</h3>
        <p>Aucune icône ne correspond à "{{ searchQuery }}"</p>
        <button @click="clearSearch" class="clear-search-btn">
          Effacer la recherche
        </button>
      </div>

      <!-- Message si pas de recherche -->
      <div v-else-if="!searchQuery" class="search-prompt">
        <div class="prompt-icon">🎨</div>
        <h3>Recherchez une icône</h3>
        <p>Tapez le nom d'une icône, sa description ou ses tags pour commencer</p>
        <div class="search-examples">
          <span class="example-tag" @click="searchExample('éléphant')">éléphant</span>
          <span class="example-tag" @click="searchExample('masque')">masque</span>
          <span class="example-tag" @click="searchExample('royal')">royal</span>
          <span class="example-tag" @click="searchExample('nature')">nature</span>
        </div>
      </div>

      <!-- Liste des icônes trouvées -->
      <div v-else class="icons-list">
        <div class="results-header">
          <span class="results-count">
            {{ filteredIcons.length }} icône{{ filteredIcons.length > 1 ? 's' : '' }} trouvée{{ filteredIcons.length > 1 ? 's' : '' }}
          </span>
          <span class="search-term">pour "{{ searchQuery }}"</span>
        </div>

        <div class="icons-grid">
          <div
            v-for="icon in filteredIcons"
            :key="icon.name"
            class="icon-item"
            @click="selectIcon(icon)"
          >
            <div class="icon-preview">
              <div class="icon-svg" v-html="icon.preview"></div>
            </div>
            
            <div class="icon-info">
              <h3 class="icon-name">{{ icon.name }}</h3>
              <p class="icon-description">{{ icon.description }}</p>
              <div class="icon-meta">
                <span class="icon-category">{{ icon.category }}</span>
                <div class="icon-tags">
                  <span v-for="tag in icon.tags.slice(0, 3)" :key="tag" class="tag">
                    {{ tag }}
                  </span>
                  <span v-if="icon.tags.length > 3" class="more-tags">
                    +{{ icon.tags.length - 3 }}
                  </span>
                </div>
              </div>
            </div>

            <div class="icon-actions">
              <button
                @click.stop="copyCode(icon)"
                class="action-btn copy-btn"
                title="Copier le code"
              >
                📋
              </button>
              <button
                @click.stop="viewDetails(icon)"
                class="action-btn details-btn"
                title="Voir les détails"
              >
                👁️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de détails -->
    <div v-if="selectedIconDetails" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <div class="modal-title">
            <div class="modal-icon" v-html="selectedIconDetails.preview"></div>
            <div class="modal-info">
              <h2>{{ selectedIconDetails.name }}</h2>
              <p class="modal-category">{{ selectedIconDetails.category }}</p>
            </div>
          </div>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
          <div class="modal-description">
            <p>{{ selectedIconDetails.description }}</p>
            <p class="cultural-context">
              <strong>Contexte culturel :</strong> {{ selectedIconDetails.culturalContext }}
            </p>
          </div>

          <div class="modal-tags">
            <span class="tags-label">Tags :</span>
            <span
              v-for="tag in selectedIconDetails.tags"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>

          <div class="modal-examples">
            <h3>Code d'utilisation</h3>
            <div class="code-block">
              <pre><code>{{ selectedIconDetails.usageExample }}</code></pre>
              <button @click="copyCode(selectedIconDetails)" class="copy-code-btn">
                Copier le code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast de notification -->
    <div v-if="showToast" class="toast" :class="{ show: showToast }">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Données réactives
const searchQuery = ref('')
const selectedIconDetails = ref(null)
const showToast = ref(false)
const toastMessage = ref('')

// Données des icônes (chargées depuis le fichier JSON)
const icons = ref([])

// Charger les données depuis le fichier JSON
onMounted(async () => {
  try {
    const response = await fetch('/icons-fasaha/icons.json')
    const data = await response.json()
    icons.value = data.icons || []
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
    icons.value = []
  }
})

// Icônes filtrées selon la recherche
const filteredIcons = computed(() => {
  if (!searchQuery.value.trim()) {
    return []
  }

  const query = searchQuery.value.toLowerCase().trim()
  
  return icons.value.filter(icon => {
    // Recherche dans le nom
    if (icon.name.toLowerCase().includes(query)) {
      return true
    }
    
    // Recherche dans la description
    if (icon.description.toLowerCase().includes(query)) {
      return true
    }
    
    // Recherche dans les tags
    if (icon.tags.some(tag => tag.toLowerCase().includes(query))) {
      return true
    }
    
    // Recherche dans la catégorie
    if (icon.category.toLowerCase().includes(query)) {
      return true
    }
    
    return false
  })
})

// Méthodes
const handleSearch = () => {
  // La recherche est automatique grâce à computed
}

const clearSearch = () => {
  searchQuery.value = ''
}

const searchExample = (example) => {
  searchQuery.value = example
}

const selectIcon = (icon) => {
  selectedIconDetails.value = icon
}

const closeModal = () => {
  selectedIconDetails.value = null
}

const copyCode = async (icon) => {
  try {
    await navigator.clipboard.writeText(icon.usageExample)
    showToastMessage('Code copié !')
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
    showToastMessage('Erreur lors de la copie')
  }
}

const viewDetails = (icon) => {
  selectedIconDetails.value = icon
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}
</script>

<style scoped>
.simple-icon-search {
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
  box-shadow: 0 0 0 3px rgba(66, 184, 131, 0.1);
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

/* Résultats de recherche */
.search-results {
  min-height: 400px;
}

/* Message de recherche vide */
.search-prompt {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-2);
}

.prompt-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.search-prompt h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.5rem;
}

.search-prompt p {
  margin: 0 0 2rem 0;
  font-size: 1.1rem;
}

.search-examples {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.example-tag {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  border: 1px solid var(--vp-c-border);
}

.example-tag:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
}

/* Aucun résultat */
.no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-2);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
}

.clear-search-btn {
  margin-top: 1rem;
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.clear-search-btn:hover {
  background: var(--vp-c-brand-dark);
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
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.icon-item:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.icon-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  min-height: 60px;
}

.icon-svg {
  font-size: 2.5rem;
  color: var(--vp-c-text-1);
  transition: transform 0.2s ease;
}

.icon-item:hover .icon-svg {
  transform: scale(1.1);
}

.icon-info {
  text-align: center;
}

.icon-name {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
  font-weight: 600;
}

.icon-description {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  font-size: 0.9rem;
}

.icon-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.icon-category {
  background: var(--vp-c-brand);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.icon-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
}

.tag {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
}

.more-tags {
  background: var(--vp-c-text-3);
  color: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.icon-actions {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.icon-item:hover .icon-actions {
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.action-btn:hover {
  background: var(--vp-c-bg-soft);
  transform: scale(1.1);
}

.copy-btn:hover {
  background: var(--vp-c-brand);
  color: white;
}

.details-btn:hover {
  background: #6366f1;
  color: white;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-content {
  background: var(--vp-c-bg);
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.modal-icon {
  font-size: 3rem;
  color: var(--vp-c-text-1);
}

.modal-info h2 {
  margin: 0 0 0.25rem 0;
  color: var(--vp-c-text-1);
}

.modal-category {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  padding: 4px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background: var(--vp-c-bg-soft);
}

.modal-body {
  padding: 1.5rem;
}

.modal-description {
  margin-bottom: 1.5rem;
}

.modal-description p {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.cultural-context {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand);
}

.modal-tags {
  margin-bottom: 1.5rem;
}

.tags-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-right: 8px;
}

.modal-examples h3 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
}

.code-block {
  position: relative;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
}

.code-block pre {
  margin: 0;
  color: var(--vp-c-text-1);
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  line-height: 1.4;
  overflow-x: auto;
}

.copy-code-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 11px;
  transition: background 0.2s ease;
}

.copy-code-btn:hover {
  background: var(--vp-c-brand-dark);
}

/* Toast */
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--vp-c-brand);
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  z-index: 3000;
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s ease;
}

.toast.show {
  transform: translateY(0);
  opacity: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .simple-icon-search {
    padding: 1rem;
  }
  
  .icons-grid {
    grid-template-columns: 1fr;
  }
  
  .search-examples {
    justify-content: center;
  }
  
  .modal-content {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
  
  .modal-header {
    padding: 1rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
}
</style>
