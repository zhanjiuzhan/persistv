import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index'

Vue.use(Router)

export const routerMap = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/template'),
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
    component: () => import('@/layout'),
    redirect: 'analyzeResult',
    children: [
      {
        path: 'analyzeResult',
        component: () => import('@/views/analyseResult'),
        name: '分析结果',
        meta: { title: '分析结果', icon: 'index', noCache: true, affixTags: true }
      }
    ]
  },
  {
    path: '/maintain',
    component: () => import('@/layout'),
    redirect: 'maintain',
    children: [
      {
        path: 'maintain',
        component: () => import('@/views/system/maintain'),
        name: '安全策略',
        meta: { title: '安全策略', icon: 'sys-tools', noCache: true, affixTags: true }
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  routes: routerMap
})
