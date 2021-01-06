import router from './routers'
import store from '@/store'
import Config from '@/config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  to.meta.title && (document.title = to.meta.title + ' - ' + Config.webName)

  NProgress.start()

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 获取用户信息,从而获取用户权限，设置画面组件的可访问性
      if (store.getters.roles.length === 0) {
        store.dispatch('user/getInfo').then(res => {
          next()
        }).catch((err) => {
          console.log(err)
          store.dispatch('user/logout').then(() => {
            next({ path: '/login' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 回到登陆页面，并在登陆后重定向回要前往的页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

  // 判断是否前往 login 画面
  // 已经登陆就获取用户权限， 动态显示菜单栏， 创建路由，并更新位置
  // 没有登陆 就重定向到登陆页面
})

router.afterEach(() => {
  NProgress.done()
})
