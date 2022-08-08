import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => { return Promise.reject(error) })
// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (error.request.status === 401) {
      Message.error('登录已失效,请重新登录')
      store.dispatch('user/logout')
      this.$router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
)
export default service
