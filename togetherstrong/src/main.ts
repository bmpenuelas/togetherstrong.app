import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n';
import vuesax from 'vuesax';
import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import vuesvgicon from 'vue-svgicon';
import socialsharing from 'vue-social-sharing';

require('animate.css/animate.css');

Vue.use(vuesax);

Vue.use(vuesvgicon, {
  classPrefix: 'SvgIcon-',
});

Vue.use(socialsharing);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
