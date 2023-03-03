import { createStore } from 'vuex'
import users from '../data/users.json'

const store = createStore({
  state: {
    user: null,
    loginError: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    SET_LOGIN_ERROR(state, error) {
      state.loginError = error
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
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    loginError: (state) => state.loginError,
  },
})

export default store
