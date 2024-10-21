<template>
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="fold.isFold ?'Fold':'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in cacuRoute" :key="item.path" :to="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts">
export default {
    name: 'Bread'
}
</script>
<script lang="ts" setup>
import { Fold, Expand} from '@element-plus/icons-vue'
import { RouterView} from 'vue-router'
import { ref, computed} from 'vue'
import { useRoute} from 'vue-router'
import useFoldStore from '@/stores/fold/fold'
const fold = useFoldStore()

const changeIcon = () => {
    fold.isFold = !fold.isFold
}
const $route = useRoute()
//计算属性
const cacuRoute = computed(() => {
  
    if($route.matched.length > 2) {
       //不要第二个
       return [$route.matched[1], ...$route.matched.slice(2)]
    }else {
        
        return [$route.matched[1]]
    }
})

    


</script>













<style scoped lang="scss">

</style>
