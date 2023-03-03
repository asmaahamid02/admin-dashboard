<template>
  <v-card>
    <v-layout>
      <Sidebar />
      <v-main width="100%" style="min-height:100vh">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Sidebar,
  },
}
</script>

<style scoped></style>
