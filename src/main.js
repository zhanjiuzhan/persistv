import 'babel-polyfill'
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import './styles/index.scss'
import './styles/theme.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'mavon-editor/dist/css/index.css'

import App from './App'
import store from '@/store'
import router from '@/router/routers'
import permission from '@/components/Permission'

import '@/icons' // icon
import '@/router/index'

Vue.use(permission)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
