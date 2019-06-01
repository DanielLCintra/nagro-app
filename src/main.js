import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import http from './service/http'
import store from './store/index'
import router from './router'
import EventBus from './plugins/event-bus'

import Toast from './components/Toast.vue'
import Loading from './components/Loading.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'

import './filters/cpfFilter'
import './mixins'


Vue.prototype.$http = http
Vue.config.productionTip = false

function registerGlobalComponents() {
  Vue.component('confirm-dialog', ConfirmDialog)
  Vue.component('loading', Loading)
  Vue.component('toast', Toast)
}

Vue.use(EventBus)

registerGlobalComponents()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
