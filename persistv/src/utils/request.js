import axios from 'axios'
import router from '@/router/routers'
import { Notification, MessageBox} from 'element-ui'
import Config from '@/config'

const service = axios.create({
  baseURL:process['env']['BASE_API'],
  timeout: Config.timeout
})

service.interceptors.request.use(
  config => {
    // 用户Token
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Notification.error({
        title: response['message']
      })
      return Promise.reject(response)
    } else {
      return response.data
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.data.status
    } catch (e) {
      const errorMsg = error.toString()
      if (errorMsg.indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 2500
        })
        return Promise.reject(error)
      }
      if (errorMsg.indexof('Error: Network Error') !== -1) {
        Notification.error({
          title: '网络请求异常',
          duration: 2500
        })
        return Promise.reject(error)
      }
    }
    if (code === 401) {
      MessageBox.confirm(
        '登陆状态已经过期，请重新登陆', '系统提示', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        // 退出并logout，并且location.reload()
      })
    } else if (code === 403) {
      router.push({ path: '/401' })
    } else {
      const errorMsg = error.response.data.message
      if (errorMsg !== undefined) {
        Notification.error({
          title: errorMsg,
          duration: 3000
        })
      }
      return Promise.reject(error)
    }
  }
)
export default service