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
      },
      {
        path: 'analyzeResult/:testName/sampleDetail',
        hidden: true,
        component: () => import('@/views/analyseResult/SampleDetail'),
        name: 'sampleDetailList',
        meta: { title: '报告一览', noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: () => import('@/layout'),
    hidden: true,
    redirect: 'center',
    children: [
      {
        path: 'center',
        component: () => import('@/views/user/profile'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  routes: routerMap
})
