import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/views/Map'

Vue.use(Router)

export default new Router({
  routes: [
    // Register Map component
    {
      path: '/',
      name: 'map',
      component: Map
    }
  ]
})
