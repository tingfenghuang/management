import { ElMessage } from 'element-plus'
import axios from 'axios'

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL, // 请求的基础地址
    timeout: 5000, // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use((config) => {
    // 获取本地token
    const token = localStorage.getItem('TOKEN')
    if (token) {
        config.headers.token = token
        // console.log(config.headers.token)
    }
    // config给服务器携带公共参数
    return config
}, (error) => {
    // 请求错误时的处理
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    let message = ''
    // 检查error.response是否存在
    if (error.response) {
        const status = error.response.status
        switch (status) {
            case 400:
                message = '请求错误'
                break
            case 401:
                message = '未授权，请登录'
                break
            case 403:
                message = '拒绝访问'
                break
            case 404:
                message = '请求地址出错'
                break
            case 500:
                message = '服务器内部错误'
                break
            default:
                message = '未知错误'
        }
    } else {
        message = '网络异常，请稍后再试'
    }

    ElMessage({
        message,
        type: 'error'
    })

    return Promise.reject(error)
})

export default request