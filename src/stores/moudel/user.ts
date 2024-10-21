import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'

import { routeImportant } from '@/router/routesLink'
const useUserStore = defineStore('user', () => {
    //组合式写法

    let token = ''
    let nickName = ref('')
    let avatar = ref('')
    const userLogin = (data: any) => {
        return reqLogin(data)
            .then((res: any) => {
                // console.log(res)
                if (res.code === 200) {
                    token = res.data as string
                    localStorage.setItem('TOKEN', token)//保存token
                    return 'ok'
                } else {
                    //返回错误信息
                    return res.data
                }
            })
    }//一定成功
    const logout = () => {
        return reqLogout()
    }
    const userInfo = () => {
        return reqUserInfo()
    }

    const getV = () => {


        return {

            nickName,
            avatar

        }
    }
    const routes_Link = routeImportant
    return {
        userLogin,
        routes_Link,
        userInfo,
        getV,
        logout
    }


})

export default useUserStore
