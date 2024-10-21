<template>
  <div class="layout">
    <div class="left" :class="{ 'fold': foldStore.isFold?true:false }">
      <LeftNav />
    </div>
    <div class="right">
      <div class="topNav">
        <Tabbar />

      </div>
      <div class="main">
        <RouterView  v-if="refresh"/>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>
<script lang="ts" setup>
import {ref,watch,nextTick, onMounted,toRefs} from 'vue'
import { RouterView } from 'vue-router'
import useFoldStore from '@/stores/fold/fold'
import useRefreshStore from '@/stores/refresh'



const foldStore = useFoldStore()
const refreshStore = useRefreshStore()
const refresh = ref(true)


watch(()=>refreshStore.isRefresh,()=>{
  refresh.value = false
  nextTick(()=>{ //响应式数据更新之后，dom渲染完成后调用

    refresh.value = true
  })
})





</script>
<style lang="scss" scoped>
@import '@/styles/common.scss';

.layout {

  width: 100%;
  height: 100vh;
  display: flex;
  // background-image: url('../../assets/img/bg1.png');
  // background-size: cover;
  background-color: #f0f2f5;



  div {

    margin: 2px;
    box-sizing: border-box;
  }



  .left {
    @extend .boxBorder;
    width: $leftWidth;
    height: 100%;
    padding: 10px;
    transition: width 0.3s;
    &.fold {
      width: $minLeftWidth;
 
    }

  }

  .right {
    @extend .boxBorder;
 
    flex: 1;
    height: 100%;

    display: flex;
    flex-direction: column;
    border: 0px;

    .topNav {
      @extend .boxBorder;
      height: $topNavHeight;

    }

    .main {
      @extend .boxBorder;
      flex: 1;
      padding: 20px;
      overflow: auto;
    }
  }
}
</style>