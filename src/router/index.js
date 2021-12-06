import router from './routers'
import store from '@/store'
import Config from '@/config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  to.meta.title && (document.title = to.meta.title + ' - ' + Config.webName)
  NProgress.start()

  if (getToken()) {
    if (to.path === '/login') {
      next()
    } else {
      const { changePasswordFlag } = JSON.parse(sessionStorage.getItem('userInfo'))
      if (changePasswordFlag === 'Y' && to.path === '/user/center') {
        next()
        NProgress.done()
        return
      }
      if (changePasswordFlag === 'Y') {
        next('/user/center')
        NProgress.done()
      } else {
        if (store.getters.addRouters.length === 0) {
          store.dispatch('generateRouters').then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ replace: true })
          }).catch(error => {
            Message({
              message: error.message,
              type: 'error'
            })
            next(`/login?redirect=${to.path}`)
          })
        } else {
          if (store.getters.loadMenus) {
            store.dispatch('updateLoadMenus', false).then(() => {
              store.dispatch('generateRouters').then(() => {
                router.addRoutes(store.getters.addRouters)
                next({ replace: true })
              })
            }).catch(error => {
              Message({
                message: error.message,
                type: 'error'
              })
              next(`/login?redirect=${to.path}`)
            })
          } else {
            next()
          }
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
