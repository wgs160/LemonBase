define(function(require, exports, module) {
    require('../../../base/js/lib/zepto/zepto.min');
    var Vue = require('../../../base/js/lib/vue/vue.min');
    var VueRouter = require('../../../base/js/lib/vue/vue-router.min');
    var topMenu = new require('../../../base/js/topMenu')();
    var getData = require('../../../base/js/getData');
    var loading = require('../../../base/js/loading');
    var gFunc = require('./gFunc');

    //加载全局方法，提供IOS,android调用
    gFuncObj.java2js = java2js;
    gFuncObj.gErrorTips = getData.gErrorTips;
    gFuncObj.mqtt = getData.getMqtt;
    getData.getMqtt(); // 建立MQTT连接
    //主动请求设备状态

    //开机初始化数据请求方法
    function gBootRequest() {
        var ReturnName;
        getData.gQueryMcInfo(function(result) {
            loading.hide();
            var status;
            if (result === 'fail') { //404 500 等错误
               gFuncObj.gErrorTips("设备连接失败！");
            } else { //成功
                if (result.code === '0') {
                    //是否设备名被修改
                    if (result.data.deviceName) {
                        ReturnName = result.data.deviceName;
                    } else {
                        ReturnName = result.data.productName;
                    }
                    //设备名称
                    $("#mcName").html(ReturnName);

                    //公用运行的设备名称
                    gFuncObj.gMcName = ReturnName;
                    gFuncObj.gMcInfo = result.data;
                    if (result.data.status) {
                        //保存状态
                        gFuncObj.objStatus = result.data.status;
                        java2js("", gFuncObj.objStatus);
                    }
                } else {
                    //gFuncObj.gErrorTips("设备不存在!");
                    gFuncObj.gErrorTips(result.desc);
                }
            }
        },'js/data.js');
        // ,'js/data.js'
    }
    //渲染面板,接受推送
    function java2js(cmd, obj) {
        if (obj) {
            if (typeof(obj) === 'string') {
                if (obj.substring(0, 1) !== '{') {
                    obj = decodeURIComponent(obj);
                }
                obj = JSON.parse(obj);
            }
        } else {
            return;
        }
        //渲染面板
        gFunc.allDraw(obj);
    }
    var DevicesInit = function() {
        var _self = this;
        var $exitBtn = $('#exitBtn'); //后退
        var $switch = $('#switch'); //开关
        _self.options = {};
        //绑定元素

        function init() {
            // 头部菜单
            // 参数2,数组(非必传，不传表示默认全部都需)；头部需要展示模块， 0 ：表示不需要，1：需要
            // 位置：0：表示修改名称；1：分享控制权；2：设备详情；3：删除设备 ；4：分组管理
            topMenu.setHtml('#main', [0, 1, 0, 0, 0]);
            //页面回退监控
            getHistory();

            gBootRequest();

        }
        //页面回退监控
        function getHistory() {
            // 路由器需要一个根组件。
            // 这里使用一个空的组件，直接使用 HTML 作为应用的模板
            window.vueApp = Vue.extend({});

            // 创建一个路由器实例
            // 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
            Vue.use(VueRouter);
            window.vueRouter = new VueRouter();

            // 定义路由规则
            // 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
            // 创建的组件构造函数，也可以是一个组件选项对象。
            vueRouter.map({
                '/index': {
                    component: vueApp
                },
                //设备详情
                '/details': {
                    component: vueApp
                }
            });

            //开始路由
            vueRouter.start(vueApp, '#content');

            //进行重定向
            vueRouter.redirect({
                '*': '/index'
            });

            //变化之前
            vueRouter.beforeEach(function(transition) {
                var fromPath = transition.from.fullPath;
                var toPath = transition.to.fullPath;
                var fromId, toId;
                // console.log(fromPath)
                if (fromPath === '/details' && toPath === '/index') {
                    DDetails.animate(false);
                }else {
                    transition.next();
                }
            });
        }
        return {
            init: init
        };
    };
    return new DevicesInit;
});
