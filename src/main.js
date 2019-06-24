import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission' // permission control

import axios from 'axios';
Vue.prototype.$axios = axios;
import QS from 'qs'
Vue.prototype.qs = QS;

import './index.less'

// import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
