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
import * as VeeValidate from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { messages } from 'vee-validate/dist/locale/zh_TW.json'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Loading)
Vue.use(VModal)

Vue.prototype._ = _
Vue.prototype.$ = $
Vue.prototype.$bus = new Vue()

Object.keys(rules).forEach(rule => {
  VeeValidate.extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  })
})

VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
