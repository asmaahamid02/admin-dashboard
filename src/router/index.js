import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Users from '../components/Users.vue'
import Dashboard from '../components/Dashboard.vue'
import StepFormPage from '../views/StepFormPage.vue'
import store from '../store'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    component: Home,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'users',
        name: 'users',
        component: Users,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'step-form',
        name: 'step-form-page',
        component: StepFormPage,
        meta: {
          requiresAuth: true,
        },
      }
    ],
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  //update store
  const user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    store.commit('SET_USER', user)
  }

  //check auth
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //check if user is logged in
    if (!store.getters.isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  } else {
    //if not requires auth, redirect to home if logged in
    if (store.getters.isLoggedIn) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
