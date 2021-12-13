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
        name: 'AnalyseResult',
        meta: { title: '数据分析', icon: 'index', affixTags: true }
      },
      {
        path: 'analyzeResult/:testName/sampleDetail',
        hidden: true,
        component: () => import('@/views/analyseResult/SampleDetail'),
        name: 'SampleDetail',
        meta: { title: '报告一览' }
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
