import Vue from 'vue'
import App from './App'
import router from './router/routers'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

new Vue({
  el: '#app',
  router,
  components: { App },
  render: h => h(App)
})
