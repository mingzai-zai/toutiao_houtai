import Vue from 'vue';
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
import Welcome from '@/views/Welcome.vue'
import Postlist from '@/views/Postlist.vue'

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
      path: '/index',
      component: Index,
      redirect: { name: 'Welcome' },
      children: [
        {
          // r如果这里path写了/welcome的话可以在上面设置重定向
          // 或者把两个path改成  '/'
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'Postlist',
          path: 'postlist',
          component: Postlist
        }
      ]
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
