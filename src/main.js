import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/myrouter/router.js'
import store from '@/store/index.js'

Vue.config.productionTip = false
Vue.use(ElementUI);



new Vue({
  render: h => h(App),
  router,
  store 
}).$mount('#app')
