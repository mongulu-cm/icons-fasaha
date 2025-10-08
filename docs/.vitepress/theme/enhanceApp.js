export default {
  enhanceApp({ app, router, siteData }) {
    // Amélioration de la coloration syntaxique pour SVG
    if (typeof window !== 'undefined') {
      // Attendre que le DOM soit chargé
      router.afterEach(() => {
        setTimeout(() => {
          // Améliorer la coloration des blocs SVG
          const svgBlocks = document.querySelectorAll('div[class*="language-svg"] pre code')
          svgBlocks.forEach(block => {
            if (!block.classList.contains('enhanced')) {
              block.classList.add('enhanced')
              enhanceSvgSyntax(block)
            }
          })
        }, 100)
      })
    }
  }
}

function enhanceSvgSyntax(element) {
  let content = element.textContent
  
  // Coloration basique pour SVG
  content = content
    // Balises SVG
    .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)([^&]*?)(&gt;)/g, (match, open, tag, attrs, close) => {
      return `${open}<span class="token tag">${tag}</span>${enhanceAttributes(attrs)}${close}`
    })
    // Attributs
    .replace(/([a-zA-Z-]+)(=)("([^"]*)"|'([^']*)')/g, (match, name, eq, value) => {
      return `<span class="token attr-name">${name}</span><span class="token punctuation">${eq}</span><span class="token attr-value">${value}</span>`
    })
    // Commentaires
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="token comment">$1</span>')
    // Entités HTML
    .replace(/(&[a-zA-Z]+;)/g, '<span class="token entity">$1</span>')
  
  element.innerHTML = content
}

function enhanceAttributes(attrs) {
  if (!attrs) return ''
  
  return attrs
    .replace(/([a-zA-Z-]+)(=)("([^"]*)"|'([^']*)')/g, (match, name, eq, value) => {
      return ` <span class="token attr-name">${name}</span><span class="token punctuation">${eq}</span><span class="token attr-value">${value}</span>`
    })
    .replace(/\s+/g, ' ')
}
