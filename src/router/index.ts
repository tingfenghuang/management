import { createRouter, createWebHashHistory } from 'vue-router'
import { routesLink } from './routesLink'
const router = createRouter({
  history: createWebHashHistory(),
  routes: routesLink,
  // scrollBehavior 是 Vue Router 的一个配置选项，
  // 用于控制路由切换时页面滚动的位置。它的作用是决定当路由变化时，
  // 页面应该滚动到哪个位置
  scrollBehavior: () => ({
    top: 0,
    left: 0
  })
})


export default router
