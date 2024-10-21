<template>
  <div class="container">
    <div class="screen" ref="screenRef">
      <div class="top">
        <Top_ />
      </div>
      <div class="buttom">
        <div class="left">
          <div class="youke">
            <Youke />
          </div>
          <div class="sex">
            <Sex />
          </div>
          <div class="age">
            <Age />
          </div>
        </div>
        <div class="center">
          <div class="chinaMap">
            <ChinaMap />
          </div>
          <div class="youke_30">
            <Youke_30 />
          </div>
        </div>
        <div class="right">
          <div class="top_">
            <Rank_ />
          </div>
          <div class="center_">
            <Year />
          </div>
          <div class="buttom_">
            <Qudao />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script lang="ts">
export default {
  name: 'Data'
}
</script>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
const screenRef = ref<any>()






const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth
  const wh = window.innerHeight
  const widthScale = ww / w
  const heightScale = wh / h
  return Math.min(widthScale, heightScale)
}

const setScale = () => {
  const scale = getScale()
  console.log(scale)
  screenRef.value.style.transform = `scale(${scale}) translate(-50%,-50%)`

}


onMounted(() => {
  setScale()
  window.addEventListener('resize', setScale)
})
</script>

<style scoped lang="scss" scope>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url(../../../assets/img/bg1.png);
  background-size: cover;

  .screen {
    width: 1920px;
    height: 1080px;

    transform-origin: left top;
    position: fixed;
    top: 50%;
    left: 50%;

    .top {
      width: 100%;
      height: 40px;

    }

    .buttom {
      width: 100%;
      height: 1040px;

      display: flex;

      .left {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .youke {
          width: 100%;
          flex: 1.3;
          
         
        }

        .sex {
          width: 100%;
          flex: 1;
       
          
        }

        .age {
          width: 100%;
          flex: 1;
          //边框合并
         
        }

      }

      .center {
        flex: 2;
        height: 100%;
    
        display: flex;
        flex-direction: column;
        .chinaMap {
          flex: 2;
         
        }
        .youke_30 {
          flex: 1;
        }
      }

      .right {
        flex: 1;
        height: 100%;
     
        display: flex;
        flex-direction: column;
        .top_ {
          flex: 1;
         

        }
        .center_ {
          flex: 1;
        
        }
        .buttom_ {
          flex: 1;
         
        }
      }
    }
  }
}
</style>