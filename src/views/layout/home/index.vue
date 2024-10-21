<template>
    <el-card>
        <div class="box">
            <!-- <img src="https://haowallpaper.com/link/common/file/previewFileImg/15039191010872640" alt="" class="avatar">
          -->
            <img :src="avatar" alt="" class="avatar">
            <div class="content">
                <h3>welcome to my Website</h3>
                <p>{{ nickName }}</p>
            </div>


        </div>
    </el-card>
    <!-- <img src="@/assets/icons/3.svg" alt="" style="height: 500px; margin:auto; display: block;"> -->

</template>

<script lang="ts">
export default {
    name: 'Home'
}
</script>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import useUserStore from '@/stores/moudel/user'


const userStore = useUserStore()
const { nickName, avatar } = userStore.getV()





</script>
<style lang="scss" scoped>
.box {
    display: flex;
    align-items: center;

    .content {
        margin-left: 20px;

        h3 {
            font-size: 24px;
            font-weight: 600;
        }

        p {
            font-size: 16px;
            color: #999;
        }
    }
}
</style>