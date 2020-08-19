import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import _ from 'lodash'
import $ from 'jquery'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Loading)

Vue.prototype._ = _
Vue.prototype.$ = $
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
