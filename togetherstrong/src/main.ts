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
import * as firebase from 'firebase/app';
import 'firebase/auth';

require('animate.css/animate.css');

Vue.use(vuesax);

Vue.use(vuesvgicon, {
  classPrefix: 'SvgIcon-',
});

Vue.use(socialsharing);

if (process.env.NODE_ENV == 'development') {
  const firebaseJsonConfig = {
    apiKey: 'AIzaSyCI6caZbmT4KGNAk_hvzmVr6LdyygZ0BWI',
    authDomain: 'togetherstrongapp-dev.firebaseapp.com',
    databaseURL: 'https://togetherstrongapp-dev.firebaseio.com',
    projectId: 'togetherstrongapp-dev',
    storageBucket: 'togetherstrongapp-dev.appspot.com',
    messagingSenderId: '465635438291',
    appId: '1:465635438291:web:f7a1a34b8fd7f44b342e26',
    measurementId: 'G-DSC0ES34VB',
  };
  firebase.initializeApp(firebaseJsonConfig);
} else {
  fetch('/__/firebase/init.json').then(async response => {
    firebase.initializeApp(await response.json());
  });
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
