import Vue from 'vue';
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)
let router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'Index',
      path: '/',
      component: Index
    }
  ]
})
// 登录页以外的才需要token以后要清楚别人的需要别麻木做
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('houtai_user_token')
    if (token) {
      next();
    } else {
      next({ name: 'Login' })
    }
  }
})
export default router;
