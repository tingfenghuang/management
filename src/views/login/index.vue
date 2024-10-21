<template>
  <div class="login">
    <el-form class="form" :model="loginForm" :rules="rules" ref="formRef">
      <h1>hello</h1>
      <h2>welcome to my website</h2>
      <el-form-item prop="username">
        <el-input placeholder="" :prefix-icon="User" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="" type="password" :prefix-icon="Lock" v-model="loginForm.password"
          show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" color="rgba(128, 128, 128, 1)" @click="loginRequest" :plain="true">login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Login'
}

</script>


<script lang="ts" setup>
import { ref, h } from "vue"
import { User, Lock } from "@element-plus/icons-vue"
import { reactive } from "vue"
import useUserStore from "@/stores/moudel/user"
import { useRouter,useRoute } from "vue-router"
import { ElNotification, ElMessage } from "element-plus"

//获取当前时间
const date = new Date()
const hour = date.getHours()
let timeQuantum = hour < 12 ? 'morning' : (hour < 18 ? 'afternoon' : 'evening')
const route=useRoute()
const router = useRouter()

const loginForm = reactive({
  username: 'admin',
  password: '111111'
})
const rules = reactive({
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' },//trigger: 'blur'失去焦点时触发
    //账号必须英文，且要多于3位数
    { pattern: /^[a-zA-Z]{3,}$/, message: 'Username must be English and more than 3 digits', trigger: 'blur' }
    

  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    //必须含有字符和数字
    // { pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: 'Password must contain letters and numbers', trigger: 'blur' }
    //密码必须是六个数字
    { pattern: /^\d{6,}$/, message: 'Password must be six digits', trigger: 'blur' }
  ],
})


const userStore = useUserStore()
const formRef = ref()
const openVn = () => {
  ElMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Form check is '),
      h('i', { style: 'color: teal' }, 'failure'),
    ]),
  })
}
const loginRequest = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      const result = userStore.userLogin(loginForm)
      // console.log(result)
      result.then((res) => {
        // console.log(res)
        if (res === 'ok') {
          if(route.query.redirect){
            router.push(route.query.redirect as string)
          }else{
            router.push('/layout')
          }
          ElNotification({
            title: `Good ${timeQuantum}`,
            message: 'Welcome to my website',
            type: 'success',
          })
        } else {
          ElNotification({
            title: 'Login failed',
            message: 'Please check your username and password',
            type: 'error',
          })

        }
      })
    } else {
      openVn()
    }
  })


}

</script>
<style lang="scss" scoped>

.login {
  width: 100%;
  height: 100vh;
  background: url('@/assets/img/background.png') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    width: 400px;
    height: 300px;
    background-color: rgba(128, 128, 128, 0.08);
    border: 2px solid rgba(128, 128, 128, 0.7);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    box-sizing: border-box;


    h1 {
      text-align: left;
      font-size: 40px;

      box-sizing: border-box;
      margin-bottom: 20px;

    }

    h2 {
      text-align: left;
      font-size: 16px;

      box-sizing: border-box;
      margin-bottom: 40px;
    }
  
      --el-button-text-color: red;


    :deep(.el-input__wrapper) {
      background: transparent;
    }
    :deep(.el-button){
       background: transparent;
       border: 0px;
       &:hover{
         background-color: rgba(128, 128, 128, 0.7)
       }
    }



   
  }

}
</style>