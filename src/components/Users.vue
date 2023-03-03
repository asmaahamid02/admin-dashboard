<template>
  <Header title="users" icon="mdi-account-plus" />
  <v-container>
    <!-- <v-table>
      <thead>
        <tr class="text-uppercase">
          <th class="font-weight-bold text-purple">name</th>
          <th class="font-weight-bold text-purple">email</th>
          <th class="font-weight-bold text-purple">phone</th>
          <th class="font-weight-bold text-purple">address</th>
          <th class="font-weight-bold text-purple"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="text-left">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address }}</td>
          <td>
            <v-btn icon elevation="0" class="bg-transparent mr-2">
              <v-icon color="green">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon elevation="0" class="bg-transparent">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table> -->
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
    <!-- <v-row>
        <v-col cols="12" md="6">
            <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-select
            v-model="searchField"
            :items="headers"
            label="Search Field"
            item-title="text"
            item-value="value"
            ></v-select>
        </v-col>
    </v-row>
    <EasyDataTable
    :headers="easy_headers"
    :items="users"
    header-background-color="#3f51b5"
    :rows-items="[10,25,50,100]"
    rows-per-page="5"
    :search-field="searchField"
    :search-value="search"
    >
<template v-slot:item.controls="props">
    <v-btn icon elevation="0" class="bg-transparent mr-2">
        <v-icon color="green">mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon elevation="0" class="bg-transparent">
        <v-icon color="red">mdi-delete</v-icon>
    </v-btn>
</template>
</EasyDataTable> -->
  </v-container>
</template>

<script>
import usersData from '../data/users.json'
import Header from './Header.vue'
import { ref, onMounted } from 'vue'

export default {
  name: 'Users',
  components: {
    Header,
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

    return {
      users,
      v_headers,
      easy_headers,
      itemsPerPage,
      search,
      searchField,
      deleteItem,
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
