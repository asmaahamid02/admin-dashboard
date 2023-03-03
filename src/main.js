import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { VDataTable } from 'vuetify/labs/VDataTable'

const vuetify = createVuetify({
  components:{
    ...components,
    VDataTable
  },
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  defaults: {
    VDataTable: {
      fixedHeader: true,
      noDataText: 'Results not found',
    },
  },
})

createApp(App)
.use(vuetify)
.use(router)
.use(store)
.component('EasyDataTable', Vue3EasyDataTable)
.mount('#app')
