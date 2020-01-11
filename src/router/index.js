import Vue from 'vue';
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)
let router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/',
      component: Login
    }
  ]
})
export default router;
