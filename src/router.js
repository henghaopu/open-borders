import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/views/Map'
import SignUp from '@/views/SignUp'
import LogIn from '@/views/LogIn'
import UserProfile from '@/views/UserProfile'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // Register Map component
    {
      path: '/',
      name: 'map',
      component: Map,
      meta: {
        requiresAuth: true
      }
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
    },
    {
      path: '/userprofile/:id',
      name: 'userprofile',
      component: UserProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
/**
 * fire a function before each route is loaded in
 * to: is the route we're going to
 * from: is the route we're coming from
 * next: is a function to say where we go next
 */
router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some( rec => rec.meta.requiresAuth )) {
    // check auth state of user 
    let user = firebase.auth().currentUser
    if (user) {
      // user signed in, preceed to route
      next()
    } else {
      // no user signed in, redirect to login
      next( { name: 'login'})
    }
  } else {
    next()
  }
})

export default router