import '../scss/site.scss';

import 'popper.js';
import 'bootstrap';

import Vue from 'vue';


Vue.component('counter', require('./components/counter/counter.vue.html'));
Vue.component('todos', require('./components/todos/todos.vue.html'));


const app = new Vue({
    el: '#app-root'
});
