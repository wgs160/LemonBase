/**
 * Created by 15031493 on 2016/8/18.
 */
import Vue from 'vue'
import App from './components/App.vue'
import store from './vuex/store' // import 我们刚刚创建的 store

/*var $script = require("scriptjs");
$script("//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js", function() {
    $('body').html('It works!')
});*/

new Vue({
    el: 'body',
    components: { app:App },
    store: store // 在根组件加入 store，让它的子组件和 store 连接
});
