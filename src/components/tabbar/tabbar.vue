<template>
    <div class="tabbar">
        <div class="tabbarLeft">
            <Bread />
        </div>
        <div class="tabbarRight">
           <Function />
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Tabbar'
}
</script>
<script setup lang="ts">
import Function from './function.vue';
import Bread from './bread.vue';

</script>
<style scoped>
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    /*左右均分 */
    .tabbarLeft {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbarRight {
        display: flex;
        align-items: center;
        margin-right: 20px;


    }

    :deep(.el-button) {
        background: transparent;
        border: 1px solid #ccc;
    

        &:hover {
            background-color: rgba(128, 128, 128, 0.6)
        }
    }
    :deep(.el-dropdown){
       background-color: transparent;
     
       &:hover{
         
            border: none;
       }
  

    }

}
</style>