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
      if (store.getters.addRouters.length === 0) {
        store.dispatch('generateRouters').then(() => {
          router.addRoutes(store.getters.addRouters)
          next({ ...to, replace: true })
        }).catch(error => {
          console.log(error)
          NProgress.done()
        })
      } else {
        if (store.getters.loadMenus) {
          store.dispatch('user/updateLoadMenus').then(() => {
            store.dispatch('generateRouters').then(() => {
              router.addRoutes(store.getters.addRouters)
              next({ ...to, replace: true })
            })
          })
        } else {
          next()
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
