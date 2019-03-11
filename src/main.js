import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

var app = null
// wait for firebase auth to init before creating the app
firebase.auth().onAuthStateChanged(() => {
  // init app if not already created
  if (!app) {
    app = new Vue({
      router,
      render: function (h) { return h(App) }
    }).$mount('#app')
  }
})


