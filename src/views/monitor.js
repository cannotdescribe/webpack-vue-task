import Vue from 'vue';
import ElementUI from 'element-ui';
import Nav from "../components/nav.vue";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(Nav)
});