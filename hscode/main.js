import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// Vue.prototype.websiteUrl = 'http://wangsw.aiquanyouxuan.vip'; 
Vue.prototype.websiteUrl = 'http://192.168.0.104:2181';
App.mpType = 'app'

import i18n from './lang/index' ;
Vue.prototype._i18n = i18n;

const app = new Vue({
	i18n,
    ...App
})
app.$mount();