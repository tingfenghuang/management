<template>
    <el-button size="small" type="primary" :icon="Refresh" circle @click="refresh"></el-button>
    <el-button size="small" type="primary" :icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" type="primary" :icon="Setting" circle @click="setting"></el-button>
    <div class="avatar"><img :src=avatar alt=""></div>
    <el-button @click="logOut"> {{ nickName }}</el-button>
    <el-drawer v-model="drawer" title="Setting" size="30%">
        <template #>
            <el-form>
                <el-form-item label='change Color'>

                    <el-color-picker v-model="color" show-alpha :predefine="predefineColors" />

                </el-form-item>
                <el-form-item label="dark mode">
                    <el-switch v-model="dark" class="mt-2" style="margin-left: 18px" inline-prompt size="small"
                        :active-icon="MoonNight" :inactive-icon="Sunny" @change="darkMode" />
                </el-form-item>
            </el-form>
        </template>

    </el-drawer>
</template>

<script lang="ts">
export default {
    name: 'Function'
}
</script>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { Refresh, FullScreen, Setting, Avatar, MoonNight, Sunny } from '@element-plus/icons-vue'
import useRefreshStore from '@/stores/refresh'
import useUserStore from '@/stores/moudel/user'












const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
let { nickName, avatar } = userStore.getV()
const refreshStore = useRefreshStore()
const drawer = ref(false)
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
const dark = ref(false)








const refresh = () => {
    refreshStore.isRefresh = !refreshStore.isRefresh
}
const fullScreen = () => {

    let full = document.fullscreenElement
    if (full) {
        document.exitFullscreen()
    } else {
        document.documentElement.requestFullscreen()
    }
}
const setting = () => {
    drawer.value = true
}
const darkMode = () => {
   const html= document.documentElement
   dark.value?html.className='dark':html.className=''
}


const logOut = () => {
    //路由跳转

    userStore.logout().then((res: any) => {
        // console.log(res)
        if (res.code == 200) {
            nickName.value = ''
            localStorage.removeItem('TOKEN')
            router.push({ path: '/login', query: { redirect: route.path } })
        } else {
            alert(res.message)
        }
    })


}



</script>
<style lang="scss" scoped>
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    background-size: cover;
    margin-left: 10px;
    margin-right: 10px;

    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 50%;

    }

}
</style>