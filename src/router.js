import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/views/Map'
import SignUp from '@/views/SignUp'
import LogIn from '@/views/LogIn'

Vue.use(Router)

export default new Router({
  routes: [
    // Register Map component
    {
      path: '/',
      name: 'map',
      component: Map
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp    
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    }
  ]
})
