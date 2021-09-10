import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}

const routes= [
    {
      path: '/',
      name: 'home',
      component: loadView('Home'),
      meta: { title: 'Home', icon : 'mdi mdi-home-outline'}
    },
    {
      path: '/login',
      name: 'login',
      component: loadView('Login'),
      meta: { title: 'Login', lang: 'mr', icon : 'mdi mdi-account'}
    },
    {
      path: '/add',
      name: 'Add',
      component: loadView('Add'),
      meta: {
        title: "Add",
        lang: 'en',
        icon: 'mdi mdi-account',
        requiresAuth:true,
        centralAuth:true,
        accountantAuth:false
      }
    },
    {
      path: '/response',
      name: 'response',
      component: loadView('Response'),
      meta: { title: 'Response', lang: 'mr', icon : 'mdi mdi-account',requiresAuth:true, centralAuth:true, accountantAuth:false }
    },
    {
      path: '/history',
      name: 'History',
      component: loadView('History'),
      meta: { title: 'History', lang: 'mr', icon : 'mdi mdi-account',requiresAuth:true, centralAuth:true, accountantAuth:false }
    },
    {
      path: '/accountant',
      name: 'Accountant_table',
      component: loadView('Accountant_table'),
      meta: { title: 'Accountant_table', lang: 'mr', icon : 'mdi mdi-account',requiresAuth:true, centralAuth:false, accountantAuth:true }
    },
    {
      path: '/historyn',
      name: 'Historynew',
      component: loadView('Historynew'),
      meta: { title: 'Historynew', lang: 'mr', icon : 'mdi mdi-account',requiresAuth:true, centralAuth:true, accountantAuth:false }
    }
  ]
  const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let role = sessionStorage.getItem('role')
    if (!sessionStorage.getItem('user-token')) {
      next({
        name:'login'
      });
    } else {
      if(to.matched.some(record=>record.meta.centralAuth)){
        if(role==='Central Manager'){
          next();
        }
        else{
          next({name:'login'});
        }
      }
      else if(to.matched.some(record=>record.meta.accountantAuth)){
        if(role==='Accountant'){
          next();
        }
        else{
          next({name:'login'});
        }
      }
      next();
    }
  } else {
    next();
  }
});
export default router