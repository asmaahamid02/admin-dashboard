<template>
  <v-toolbar class="mt-5 px-4" flat width="100%" color="white">
    <v-toolbar-title
      class="font-weight-black text-purple text-uppercase"
      align="left"
      >{{ title }}</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-btn icon class="mr-2">
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <v-badge bordered bottom color="green" dot offset-x="5" offset-y="30">
      <v-avatar size="40">
        <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
      </v-avatar>
    </v-badge>
  </v-toolbar>
  <v-divider></v-divider>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 'Dashboard',
    },
    icon: {
      type: String,
      default: 'mdi-magnify',}
  },
}
</script>

<style scoped></style>
