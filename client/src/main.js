import Vue from 'vue'
import VueRouter  from 'vue-router'
import App from './App'
import routerMap from './router'

Vue.use(VueRouter);

let router = new VueRouter();
routerMap(router);

new Vue({
  el: 'body',
  components: { App }
});

//router.start(App, '#app');


