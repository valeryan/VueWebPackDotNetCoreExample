import '../scss/site.scss';

import 'popper.js';
import 'bootstrap';

import Vue from 'vue';

Vue.component('counter', require('./components/counter/counter.vue').default);
Vue.component('todos', require('./components/todos/todos.vue').default);

const app = new Vue({
  el: '#app-root'
});
