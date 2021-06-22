import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Push from '../views/Push.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '首页',
    component: Login
  },
  {
    path: '/home',
    name: '个人中心',
    component: Home
  },
  {
    path: '/push',
    name: '消息推送',
    component: Push
  }
]

const router = new VueRouter({
  routes
})

export default router
