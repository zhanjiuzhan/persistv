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
            next({ ...to, replace: true })
          }).catch(error => {
            console.log(error.message)
            NProgress.done()
          })
        } else {
          if (store.getters.loadMenus) {
            store.dispatch('user/updateLoadMenus', false).then(() => {
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
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
  setTimeout(() => {
    if (location.pathname === '/login') return
    router.app.notify('页面会话超时请重新登录', '提示', {
      showCancelButton: false,
      confirmButtonText: '确定',
      type: 'warning'
    }).then(() => {
      store.dispatch('user/logout').then(() => {
        location.reload();
      })
    })
  }, store.getters.logoutInterval * 1000 * 60)
})

router.afterEach(() => {
  NProgress.done()
})
