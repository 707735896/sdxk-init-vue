// import Vue from 'vue';
// import iView from 'iview';
import router from './router';

// import 'babel-polyfill';
// import './libs/filter';
import './permission';
import BaseService from './service/BaseServive';

import App from './app.vue';
import alert from './components/MessageBox/alert';
import confirm from './components/MessageBox/confirm';
import Table from './components/Table/myTable';
// 总定义全局组建
import '@/components/customComponent'

// Vue.use(iView);
Vue.use(alert);
Vue.use(confirm);
Vue.use(Table);
Vue.prototype.$ajax = BaseService;


new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
