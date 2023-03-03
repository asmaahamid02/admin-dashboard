<template>

<Header />
    <v-row
        align="start"
        no-gutters
        style="height: 150px;"
        class="mt-5 px-2"
      >
    <Card  
    v-for="card in cards"
    :key="card.title"
    :title="card.title"
    :subtitle="card.subtitle"
    :icon="card.icon"
    :iconColor="card.iconColor"
    :value="card.value" 
    :isPositive="card.isPositive"
    :btnColor="card.btnColor"
    />
    
  </v-row>
  <v-divider></v-divider>
</template>

<script>
import Card from './Card.vue'
import Header from './Header.vue'
export default {
  name: 'Dashboard',
  components:{
    Card,
    Header
  },
  data(){
    return {
    cards:[
      {
        title: 'users',
        subtitle: '12,500',
        icon: 'mdi-account-multiple',
        iconColor: 'cyan-darken-2',
        value: '40%',
        btnColor: 'cyan-lighten-4',
      },
      {
        title: 'visits',
        subtitle: '1,522,800',
        icon: 'mdi-eye',
        iconColor: 'green-darken-2',
        value: '20%',
        isPositive: false,
        btnColor: 'green-lighten-4',
      },
      {
        title: 'work hours',
        subtitle: '124',
        icon: 'mdi-hours-24',
        iconColor: 'blue-darken-2',
        btnColor: 'blue-lighten-4',
      },
      {
        title: 'fees',
        subtitle: '$12,500',
        icon: 'mdi-currency-usd',
        iconColor: 'purple-darken-2',
        value: '65%',
        btnColor: 'purple-lighten-4',
      },
    ],}
  }
}
</script>
