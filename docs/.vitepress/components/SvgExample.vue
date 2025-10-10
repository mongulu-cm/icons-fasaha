<template>
  <div class="svg-example">
    <div class="svg-example-header">
      <h4>{{ title }}</h4>
      <div class="svg-example-actions">
        <button @click="copyCode" class="copy-btn" :title="copied ? 'Copié !' : 'Copier le code'">
          {{ copied ? '✓' : '📋' }}
        </button>
      </div>
    </div>
    
    <div class="svg-example-content">
      <div class="svg-preview">
        <div class="svg-container" v-html="svgContent"></div>
      </div>
      
      <div class="svg-code">
        <pre><code class="language-svg">{{ code }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  svgContent: {
    type: String,
    required: true
  }
})

const copied = ref(false)

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Erreur lors de la copie:', err)
  }
}
</script>

<style scoped>
.svg-example {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
}

.svg-example-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-border);
}

.svg-example-header h4 {
  margin: 0;
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
}

.copy-btn {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

.svg-example-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.svg-preview {
  padding: 16px;
  background: var(--vp-c-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}

.svg-container {
  font-size: 48px;
  color: var(--vp-c-text-1);
}

.svg-code {
  background: var(--vp-c-bg-soft);
  border-left: 1px solid var(--vp-c-border);
}

.svg-code pre {
  margin: 0;
  padding: 16px;
  background: transparent;
  font-size: 12px;
  line-height: 1.4;
  overflow-x: auto;
}

.svg-code code {
  color: var(--vp-c-text-2);
  background: none;
  padding: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  word-spacing: normal;
  word-wrap: normal;
  line-height: 1.4;
  tab-size: 2;
  hyphens: none;
}

/* Responsive */
@media (max-width: 768px) {
  .svg-example-content {
    grid-template-columns: 1fr;
  }
  
  .svg-code {
    border-left: none;
    border-top: 1px solid var(--vp-c-border);
  }
  
  .svg-container {
    font-size: 32px;
  }
}
</style>
