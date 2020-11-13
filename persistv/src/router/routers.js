import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'

Vue.use(Router)

export const routerMap = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    hidden: true
  },
  {
    path: '/404',
    component: () => import(''),
    hidden: true
  },
  {
    path: '/401',
    component: () => import(''),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/features/redirect')
      }
    ]
  },
  {
    path: '/',
    component: import('@/layout'),
    name: '首页',
    meta: { title: '', icon: '', noCache: true, affix: true }
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => {{ y: 0 }},
  routes: routerMap
})
