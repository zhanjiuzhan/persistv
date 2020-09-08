import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Notice from '@/components/Notice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/notice.html',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/**',
      name: 'Index',
      component: Index
    }
  ]
})
