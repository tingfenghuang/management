<template>
 <div class="top">
    <div class="left">
        <button class="lbtn" @click="$router.push('/')">
            Home
        </button>
    </div>
    <div class="center">
        <h1>Smart Tourism</h1>
    </div>
    <div class="right">
        <button>Statistical Data</button>
        <button>{{ time }}</button>
    </div>
 </div>
</template>
<script lang="ts">
export default {
  name: 'Top_'
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
//获取时间
const time = ref('')
const timer = setInterval(() => {
  const now = new Date()
  time.value = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
}, 1000)


</script>
<style lang="scss">
.top{
    width: 100%;
    height: 100%;
    display: flex;
 
    .left{
        flex: 1;
        height: 100%;
    
        .lbtn{
            width: 60px;
            height: 40px;
            border-radius: 5px;
            border:none;
            background-color:skyblue;
            text-align: center;
            line-height: 40px;
            float: right;
            cursor: pointer;
        }
    }
    .center{
        flex:2;
        height: 100%;
        
        h1{
            text-align: center;
            line-height: 40px;
            font-size: 24px;
        }
    }
    .right{
        flex: 1;
        height: 100%;
      
        display: flex;
        justify-content: space-between;
        button{
            border:#ddd 1px solid;
            background-color: transparent

        };
        
    }
}


</style>