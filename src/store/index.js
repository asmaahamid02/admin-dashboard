import { createStore } from 'vuex'
import users from '../data/users.json'

const store = createStore({
  state: {
    user: null,
    loginError: null,
    formSchema: {
      fields:[
        {
          id: 1,
          inputType: 'Text',
          inputLabel: '',
          inputPlaceholder: '',
          inputRequired: false,
        }
      ]
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    SET_LOGIN_ERROR(state, error) {
      state.loginError = error
    },
    SET_FORM_SCHEMA(state, schema) {
      state.formSchema = schema
    },
  },
  actions: {
    login({ commit }, user) {
      //check data
      console.log('[store]', user)
      const foundUser = users.find(
        (u) => u.email === user.email && u.password === user.password
      )
      if (!foundUser) {
        return commit('SET_LOGIN_ERROR', 'Invalid email or password')
      }

      commit('SET_LOGIN_ERROR', null)
      return commit('SET_USER', {
        id: foundUser.id,
        name: foundUser.name,
        token: Math.random().toString(36).slice(2),
      })
    },
    addFormField({}, field) {
      this.state.formSchema.fields.push(field)
    },
    removeFormField({}, id) {
      const field = this.state.formSchema.fields.find(f => f.id === id)
      const index = this.state.formSchema.fields.indexOf(field)
      const newFields = this.state.formSchema.fields.splice(index, 1)
      const newSchema = {
        fields: newFields
      }

      this.commit('SET_FORM_SCHEMA', newSchema)
    },    
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    loginError: (state) => state.loginError,
    formFields: (state) => state.formSchema.fields,
  },
})

export default store
