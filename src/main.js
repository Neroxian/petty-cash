import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import Add from '@/components/Add.vue'
import History from '@/components/History.vue'
import Accountant_table from '@/components/Accountant_table.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {
    path:'/',
    name:'Home',
    component: Home
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  },
  {
    path:'/add',
    name:'Add',
    component: Add
  },
  {
    path:'/history',
    name:'History',
    component: History
  },
  {
    path:'/accountant',
    name:'accountant',
    component: Accountant_table
  }
]

const router = new VueRouter({
  mode : 'history',
  base : process.env.BASE_URL,
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
