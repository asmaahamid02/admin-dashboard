<template>
  <v-col>
    <v-hover v-slot:default="{ isHovering, props }" open-delay="200">
      <v-card
        v-bind:="props"
        class="pa-2 ma-2"
 :color="color"
        :elevation="isHovering ? 16 : 2"
      >
       <v-row
        align="center"
        no-gutters
        justify="space-around"

      >
       <v-col>
        <v-btn icon :color="btnColor" elevation="0">
        <v-icon :color="iconColor"> {{ icon }} </v-icon>
        </v-btn>
       </v-col>
         <v-col>
          <v-card-title color="white" class="font-weight-bold text-uppercase">
                {{ title }}
             </v-card-title>
                <v-card-subtitle color="white" class="font-weight-medium">
                    {{ subtitle }} 
                    <v-badge
                        v-if="value"
                        :color="isPositive ? 'green' : 'red'"
                        :content="isPositive ? '+' + value : '-' + value"
                        class="ml-2"
                        inline
                        small
                    ></v-badge>                                          
                </v-card-subtitle>
            </v-col>
    
        </v-row>
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
    isPositive: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      required: true,
    },
    iconColor: {
      type: String,
      default: 'white',
    },
    color: {
      type: String,
      default: 'white',
    },
    btnColor: {
      type: String,
      default: 'cyan-lighten-2',
    },
  },
}
</script>

<style scoped></style>
