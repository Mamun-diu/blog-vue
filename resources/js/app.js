
require('./bootstrap');
require('admin-lte')

window.Vue = require('vue');

import router from './router'

import Swal from 'sweetalert2'
window.Swal = Swal;

// CommonJS
// const Swal = require('sweetalert2')


Vue.component('home', require('./components/backend/home.vue').default);
// Vue.component('nav-bar', require('./components/Nav.vue').default);

const app = new Vue({
    router,
    el: '#app',
});
