<template>
  <Header title="users" />
  <v-container>
    <Modal @addUser="addUser"/>
    <v-text-field
      v-model="search"
      prepend-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="v_headers"
      :items="users"
      v-model:items-per-page="itemsPerPage"
      :search="search"
    >
      <template v-slot:item.controls="props">
        <v-btn icon elevation="0" class="bg-transparent mr-2">
          <v-icon color="green">mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          elevation="0"
          class="bg-transparent"
          @click="deleteItem(props.item.columns.id)"
        >
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import usersData from '../data/users.json'
import Header from './Header.vue'
import Modal from './Modal.vue'
import { ref, onMounted } from 'vue'

export default {
  name: 'Users',
  components: {
    Header,
    Modal
  },
  setup() {
    const users = ref([])
    const easy_headers = ref([
      { text: 'ID', value: 'id', sortable: true },
      { text: 'Name', value: 'name', sortable: true },
      { text: 'Email', value: 'email', sortable: true },
      { text: 'Phone', value: 'phone', sortable: false },
      { text: 'Address', value: 'address', sortable: false },
      { text: '', value: 'controls', sortable: false },
    ])

    const v_headers = ref([
      { title: 'ID', key: 'id', sortable: true },
      { title: 'Name', key: 'name', sortable: true },
      { title: 'Email', key: 'email', sortable: true },
      { title: 'Phone', key: 'phone', sortable: false },
      { title: 'Address', key: 'address', sortable: false },
      { title: '', key: 'controls', sortable: false },
    ])
    const itemsPerPage = ref(10)
    const search = ref('')
    const searchField = ref('name')

    onMounted(() => {
      users.value = usersData
    })

    const deleteItem = (id) => {
      const foundItem = users.value.find((item) => item.id === id)

      //delete item
      if (foundItem) {
        const index = users.value.indexOf(foundItem)
        users.value.splice(index, 1)
      }
    }

    const addUser = (userData) => {
     const id = users.value.length + 1
     const name = `${userData.firstName} ${userData.lastName}`
      const newUser = {
        id,
        name,
        ...userData
      }
      users.value.unshift(newUser)      
    }

    return {
      users,
      v_headers,
      easy_headers,
      itemsPerPage,
      search,
      searchField,
      deleteItem,
      addUser
    }
  },
}
</script>

<style scoped>
tbody > tr:nth-child(odd) {
  background-color: #f5f5f5;
}

tbody > tr:hover {
  background-color: #e0e0e0;
}
</style>
