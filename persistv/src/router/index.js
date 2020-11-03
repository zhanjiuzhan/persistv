import router from './routers'
import Config from '@/config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress.configure({ showSpinner: false })

// const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  to.meta.title && (document.title = to.meta.title + ' - ' + Config.webName)

  NProgress.start()

  // 权限验证,获取登陆token
  // 判断是否前往 login 画面
  // 已经登陆就获取用户权限， 动态显示菜单栏， 创建路由，并更新位置
  // 没有登陆 就重定向到登陆页面
})

router.afterEach(() => {
  NProgress.done()
})
