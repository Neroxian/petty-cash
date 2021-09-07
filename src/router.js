import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('Home'),
      meta: { title: 'Home', icon : 'mdi mdi-home-outline' }
    },
    {
      path: '/login',
      name: 'login',
      component: loadView('Login'),
      meta: { title: 'Login', lang: 'mr', icon : 'mdi mdi-account' }
    },
    {
      path: '/add',
      name: 'Add',
      component: loadView('Add'),
      meta: {
        title: "Add",
        lang: 'en',
        icon: 'mdi mdi-account'
      }
    },
    {
      path: '/response',
      name: 'response',
      component: loadView('Response'),
      meta: { title: 'Response', lang: 'mr', icon : 'mdi mdi-account' }
    }
  ]
})
