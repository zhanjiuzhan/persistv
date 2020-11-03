import axios from 'axios'
import { Notification, MessageBox } from 'element-ui'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/'
})
