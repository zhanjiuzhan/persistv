import axios from 'axios'
import router from '@/router/routers'
import { Notification, MessageBox } from 'element-ui'
import Config from '@/config'
import { getToken } from './auth'

const service = axios.create({
  baseURL: process['env']['BASE_API'],
  timeout: Config.timeout
});

service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken()
    }
    config.headers['Content-Type'] = 'application/json'
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
);

service.interceptors.response.use(
  response => {
    const code = response.data.code;
    if (!code) {
      console.error(response);
      // 解析格式有问题 那就到登陆画面
      //window.location.href = "http://yyums.4366.com/login.do";
    }
    if(code === 200) {
      return response.data.data;
    }
    else {
      Notification.error({title: response.data.msg});
      return Promise.reject(response);
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.data.status;
    } catch (e) {
      const errorMsg = error.toString();
      if (errorMsg.indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求超时',
          duration: 2500
        });
        return Promise.reject(error);
      }
      if (errorMsg.indexOf('Error: Network Error') !== -1) {
        Notification.error({
          title: '网络请求异常',
          duration: 2500
        });
        return Promise.reject(error);
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
      router.push({ path: '/401' });
    } else {
      const errorMsg = error.response.data.message;
      if (errorMsg !== undefined) {
        Notification.error({
          title: errorMsg,
          duration: 3000
        });
      }
      return Promise.reject(error);
    }
  }
);
export default service;
