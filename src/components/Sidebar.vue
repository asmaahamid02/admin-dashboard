<template>
  <!-- <v-app-bar
    :clipped-left="mdAndUp"
    :app="mdAndUp"
    :fixed="mdAndUp"
    :elevation="mdAndUp ? 4 : 0"
    color="blue"
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        v-if="!mdAndUp"
        @click.stop="menuOpen = !menuOpen"
      ></v-app-bar-nav-icon>
    </template>
    <v-toolbar-title>App</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
  <v-spacer></v-spacer> -->
  <v-navigation-drawer
    :permanent="mdAndUp"
    app
    hide-overlay
    v-model="menuOpen"
    elevation="10"
  >
  <v-list-item class="px-2 py-5">
    <v-list-item-title class="text-uppercase" align="center">
 
      <v-avatar size="50" class="mr-3">
        <v-img :src="require('../assets/logo.png')"></v-img>
      </v-avatar>
      <span class="font-weight-bold text-uppercase">Holofair</span>
      
    </v-list-item-title>
  </v-list-item>
  <v-divider></v-divider>
    <v-list nav density="compact" active-color="purple" class="py-4">
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.to"
        :active="selectedItem === index"
        @click="changeItem(index)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',

  data() {
    return {
      selectedItem: 0,
      menuOpen: true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' },
        { title: 'Users', icon: 'mdi-account', to: '/users' },
        { title: 'Step Form', icon: 'mdi-pen', to: '/step-form' },
    
      ],
    }
  },
  computed: {
    mdAndUp() {
      return this.$vuetify.display.mdAndUp
    },
  },
  methods: {
    changeItem(index) {
      this.selectedItem = index
      //save to local storage
      localStorage.setItem('selectedItem', index)      
    },
  },
  mounted() {
    this.selectedItem = parseInt(localStorage.getItem('selectedItem') || 0)
  }
}
</script>

<style scoped></style>
