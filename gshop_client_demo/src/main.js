import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import './mock/mockServer'
import './filters'
import VueLazyload from 'vue-lazyload'
// or with options
const loadimage = require('./assets/loading.gif');
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadimage,
  attempt: 1
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
