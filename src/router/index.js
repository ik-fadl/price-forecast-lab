import comodities from '@/comodities'
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'init',
      redirect: 'dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/master',
      name: 'master',
      beforeEnter: (to, from, next) => {
        if (!to.query.id) {
          to.query.id = comodities.default.id
          to.query.comodity = comodities.default.key
        }
        next()
      },
      component: () => import('../views/master/MasterView.vue'),
    },
    {
      path: '/forecast',
      name: 'forecast',
      beforeEnter: (to, from, next) => {
        if (!to.query.id) {
          to.query.id = comodities.default.id
          to.query.comodity = comodities.default.key
        }
        next()
      },
      component: () => import('../views/forecast/ForecastView.vue'),
    },
    {
      path: '/uji',
      name: 'uji',
      beforeEnter: (to, from, next) => {
        if (!to.query.id) {
          to.query.id = comodities.default.id
          to.query.comodity = comodities.default.key
        }
        next()
      },
      component: () => import('../views/uji/UjiView.vue'),
    },
  ],
})

export default router
