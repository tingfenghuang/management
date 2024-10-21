<template>
    <div class="leftNav">
        <Logo />
        <el-scrollbar height='' class="scrollbar">
         <transition>
               <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="white" text-color="black" active-text-color="red" :collapse="foldStore.isFold">
                <MenuComponent :rLink="rLink"></MenuComponent>
            </el-menu>
         </transition>

        </el-scrollbar>
    </div>

</template>
<script lang="ts">

export default {
    name: 'LeftNav',
}

</script>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import Logo from './logo.vue'
import MenuComponent from './menu.vue'
import { toRaw } from 'vue'
import useUserStore from '@/stores/moudel/user'
import useFoldStore from '@/stores/fold/fold'

const userStore = useUserStore()
const { routes_Link } = userStore
const rLink = toRaw(routes_Link)
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const $route = useRoute()
const foldStore = useFoldStore()

//获取.el-popper.is-light










</script>
<style lang="scss" scoped>
// @import '@/styles/common.scss';

//动画
.v-enter-active {
  opacity: 0;
}
.v-leave-active {
  opacity: 0;
}
.v-enter-from {
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
}



.leftNav {
    // @extend .boxBorder;

    width: 100%;
    height: 100%;


    padding: calc(($topNavHeight / 2) - 10px) 0;
    box-sizing: border-box;

    .scrollbar {
        width: 100%;
        height: calc(100% - $topNavHeight);
        

        margin: 10px 0;

        // .el-menu-vertical-demo ::v-deep .el-popper.is-light{
        //     background-color: transparent;
        //     /* 穿透父组件样式 */
        // }

    }
}
</style>