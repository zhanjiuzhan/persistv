import axios from 'axios'
import Config from '@/config'
import { getToken } from './auth'

const service = axios.create({
  baseURL: process['env']['BASE_API'],
  timeout: Config.timeout
})

// todo: 需要将异常统一处理，以提示框的形式弹出，不能reject，让组件去catch。

service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { data: resData, status } = response
    if (status < 400) {
      const { data, code } = resData
      if (code === 20000) {
        return data
      }
    } else if (status === 400) {
      console.log('Bad Request')
    } else if (status === 401) {
      console.log('Unauthorized')
    } else if (status === 403) {
      console.log('Forbidden')
    } else if (status === 404) {
      console.log('Not Found')
    } else if (status === 405) {
      console.log('Method Not Allowed')
    } else if (status === 408) {
      console.log('Request Time-out')
    } else if (status === 500) {
      console.log('Internal Server Error')
    } else if (status === 501) {
      console.log('Not Implemented')
    } else if (status === 502) {
      console.log('Bad Gateway')
    } else if (status === 503) {
      console.log('Service Unavailable')
    }
    return Promise.reject(resData)
  },
  error => {
    return Promise.reject(error)
  }
);
export default service
