export default {
  title: 'Icons Fasaha',
  description: 'Icônes artistiques africaines pour le web',
  
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true,
    config: (md) => {
      // Configuration personnalisée pour le markdown
      md.set({
        html: true,
        linkify: true,
        typographer: true
      })
    }
  },
  
  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }
  },
  
  themeConfig: {
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Recherche', link: '/search' },
      { text: 'Installation', link: '/guide/installation' },
      { text: 'Utilisation', link: '/guide/usage' },
      { text: 'Icônes', link: '/icons/' },
      { text: 'GitHub', link: 'https://github.com/mongulu-cm/icons-fasaha' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Utilisation', link: '/guide/usage' },
            { text: 'Personnalisation', link: '/guide/customization' },
            { text: 'Gestion des assets SVG', link: '/guide/svg-assets' },
            { text: 'Exemples SVG', link: '/guide/svg-examples' }
          ]
        }
      ],
      '/': [
        {
          text: 'Documentation',
          items: [
            { text: 'Accueil', link: '/' },
            { text: 'Recherche d\'icônes', link: '/search' }
          ]
        }
      ],
      '/icons/': [
        {
          text: 'Icônes',
          items: [
            { text: 'Toutes les icônes', link: '/icons/' },
            { text: 'Chefferie', link: '/icons/chefferie.html' },
            { text: 'Emblème Foumban', link: '/icons/embleme-foumban.html' },
            { text: 'Masque Tukah', link: '/icons/masque-tukah.html' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mongulu-cm/icons-fasaha' }
    ],

    footer: {
      message: 'Libéré sous licence MIT.',
      copyright: 'Copyright © 2024 Icons Fasaha'
    }
  }
}
