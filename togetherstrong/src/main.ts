import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import i18n from './i18n';
import vuesax from 'vuesax';
import vuesvgicon from 'vue-svgicon';
import socialsharing from 'vue-social-sharing';
import webnotifications from '@/plugins/WebNotifications';
import { initFirebase } from '@/utils/FirebaseAuth';

import 'vuesax/dist/vuesax.css';
import 'material-icons/iconfont/material-icons.css';
import 'animate.css/animate.css';

Vue.use(vuesax);

Vue.use(vuesvgicon, {
  classPrefix: 'SvgIcon-',
});

Vue.use(socialsharing);

Vue.use(webnotifications);

Vue.config.productionTip = false;

const init = async () => {
  // Wait for all the async pieces needed before initializing Vue
  await Promise.all([initFirebase()]);

  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
  }).$mount('#app');
};

init();
