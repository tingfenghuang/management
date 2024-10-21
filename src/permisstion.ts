import router from "./router"
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/stores/moudel/user'
import pinia from "./stores"
import { toRefs } from 'vue'
nprogress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)
let { nickName, avatar } = toRefs(userStore.getV())


//获取本地token


router.beforeEach((to: any, from, next) => {
    document.title = to.meta.title || 'vite.App'
    //访问某个路由之前的操作
    //to:即将要进入的目标路由对象
    //from:当前导航正要离开的路由
    //next:进入下一个钩子
    const token = localStorage.getItem('TOKEN')
    if (token) {

        if (to.path === '/login') {
            next('/layout')
        } else {
            if (!nickName.value) {
                const result = userStore.userInfo()
                // console.log(result)
                result.then((res: any) => {

                    if (res.code === 200) {
                        nickName.value = res.data.name
                        avatar.value = res.data.avatar
                    } else {
                        alert(res.message)
                    }

                })
                next()

            } else {
                next()

            }
        }

    } else {
        if (to.path === '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }

    nprogress.start()
    next()

})
router.afterEach((to, from, next) => {

    //访问某个路由之后的操作
    //to:即将要进入的目标路由对象
    //from:当前导航正要离开的路由
    nprogress.done()

})