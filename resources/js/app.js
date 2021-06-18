
require('./bootstrap');
// Admin lte 3 theme
require('admin-lte')

window.Vue = require('vue');
// Vuex
import store from './store/store'
// Vue router
import router from './router'
// Sweet Alert
import Swal from 'sweetalert2'
window.Swal = Swal;

// Toastr
import toastr from 'toastr'
window.toastr = toastr;
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

// moment js
import moment from 'moment';
window.moment = moment;

// Vue.filter('time', (a)=>{
//     return moment(a).format("dddd, MMMM Do YYYY, h:mm:ss a");
// })


Vue.component('home', require('./components/backend/home.vue').default);
// Vue.component('nav-bar', require('./components/Nav.vue').default);

const app = new Vue({
    router,
    store,
    el: '#app',
});
