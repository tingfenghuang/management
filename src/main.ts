import 'element-plus/dist/index.css'

import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import pinia from './stores'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'//暗黑模式
import allComponent from './components'




import App from './App.vue'
// 引入 router
import router from './router'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
//引入svg图标
import 'virtual:svg-icons-register'
app.use(pinia)
app.use(router)
app.use(allComponent)


// // 获取环境变量
// console.log(import.meta.env)
import "./styles/index.scss"
import './permisstion'

app.mount('#app')

