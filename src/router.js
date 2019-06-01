import Vue from 'vue'
import Router from 'vue-router'
import growersRoutes from './features/Growers/routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    growersRoutes
  ]
})
