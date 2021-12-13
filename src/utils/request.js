import axios from 'axios'
import Config from '@/config'
import { getToken, getRefreshToken, setToken, setRefreshToken } from './auth'
import { refreshToken } from '@/api/login'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'

let blockList = []
let isRefresh = false

const service = axios.create({
  baseURL: process['env']['NODE_ENV'] === 'production' ? window.config.BASE_API : process['env']['BASE_API'],
  timeout: Config.timeout
})

service.interceptors.request.use(
  config => {
    store.dispatch('checkCurrentTime', store.getters.whiteList.includes(config.url))
    if (getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    } else if (config.headers['Content-Type'].endsWith('urlencoded')) {
      config.data = qs.stringify(config.data)
    }

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
      } else if (code === 402) {
        const { config } = response
        if (!isRefresh) {
          isRefresh = true
          refreshToken({ refreshToken: getRefreshToken() }).then(res => {
            isRefresh = false
            const { accessToken, refreshToken } = res
            setToken(accessToken)
            setRefreshToken(refreshToken)
            blockList.forEach(callback => callback())
            blockList = []
            return service(config)
          })
        }
        return new Promise((resolve, reject) => {
          blockList.push(() => {
            resolve(service(config))
          })
        })
      } else if (!code && !data && resData) {
        return resData
      }
    } else if (status === 400) {
      Message('Bad Request')
    } else if (status === 401) {
      Message('Unauthorized')
    } else if (status === 403) {
      Message('Forbidden')
    } else if (status === 404) {
      Message('Not Found')
    } else if (status === 405) {
      Message('Method Not Allowed')
    } else if (status === 408) {
      Message('Request Time-out')
    } else if (status === 500) {
      Message('Internal Server Error')
    } else if (status === 501) {
      Message('Not Implemented')
    } else if (status === 502) {
      Message('Bad Gateway')
    } else if (status === 503) {
      Message('Service Unavailable')
    }
    return Promise.reject(resData)
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
