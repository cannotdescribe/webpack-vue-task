import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import app from "./monitor/app.vue";

Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(app)
});