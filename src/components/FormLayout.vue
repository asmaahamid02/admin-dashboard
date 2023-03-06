<template>
  <v-container>
    <v-card elevation="2" width="700" class="mx-auto">
      <v-card-title class="font-weight-bold text-uppercase">
      <slot name="title"></slot>
      </v-card-title>  
      <v-card-subtitle class="font-weight-medium">
        <slot name="subtitle"></slot>
      </v-card-subtitle>
      <v-card-text>
   <slot name="content"></slot>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
    export default {
        name: 'FormLayout'
    }
</script>