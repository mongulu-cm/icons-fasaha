import DefaultTheme from 'vitepress/theme'
import './custom.css'
import SearchForm from '../components/SearchForm.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // Enregistrer le composant globalement
    app.component('SearchForm', SearchForm)
  }
}
