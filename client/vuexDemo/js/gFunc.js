/* 中间部分内容加载 */
define(function(require, exports, module) {
    require('../../../base/css/sweetalert.css');
    var toucher = require('../../../base/js/util/touch/touch');
    var Vue = require('../../../base/js/lib/vue/vue.min');
    var getData = require('../../../base/js/getData');
    var loading = require('../../../base/js/loading');
    var bottomBox = require('../../../base/js/bottomBox');
    var sweetalert = require('../../../base/js/util/alert/sweetalert.min');
    var config = require('./config');
    var timesflag = true;
    var timeout = null;
    var configData = {};

    var gFunc = function() {

        //默认属性
        configData = JSON.parse(JSON.stringify(config));
        configData.oldStatus = {}; //保存的数据
        configData.typewidth = 1500;
        configData.typeleft = 0;
        configData.moveX = 0; //头部移动距离
        configData.headerList = []; //头部需展示的信息，除定时任务
        
        var myVue = new Vue({
            el: '#content',
            data: configData,
            ready: function() {
                var _this = this;
                touchTop(_this);
            },
            watch: {
                //监听是否离线
                'status.onlineStatus': function(val, oldVal) {
                    var _this = this;
                    var type = val === '0' ? true : false;
                    require.async('../../../base/js/onlineStatus', function(onlineStatus) {
                        onlineStatus.init({
                            show: type // true .显示离线页面  false 不显示离线页面
                        });
                    });
                    getData.getJsbridge('status', {
                        'onlineStatus': val
                    });
                },
                //监听照明变化
                'setLight': function(val, oldVal) {
                    setLight();
                },
                //监听风速变化
                'wind': function(val, oldVal) {
                    setWindspeed();
                },
                //监听关机
                'status.C_POWER': function(val, oldVal) {
                    var _this = this;
                    if (val === '0') {
                        bottomBox.init({
                            show: false
                        });
                    }
                },
                
                //监听是否有故障
                'warnCode': function(val, oldVal) {
                    var _this = this;
                    var faultWarnStr;
                    var txt = '',
                        tel = '4008-365-365';

                    //错误编码
                    if (_this.faultWarn[val]) {
                        txt = _this.faultWarn[val];
                        tel = _this.faultWarnTel || tel;
                        faultWarnStr = '<p class="icon main-icon-font">&#xe606;</p>' +
                            '<p class="txt">' + txt + '，联系客服<a class="g-tel" href="tel:' + tel + '">' + tel + '</a></p>';
                        require.async(['../../../base/js/util/alert/sweetalert.min', '../../../base/css/sweetalert.css'], function(sweetalert) {
                            sweetalert({
                                title: '',
                                text: "<div class='g-w-error'>" + faultWarnStr + "</div>",
                                customClass: 'errorAlert',
                                html: true,
                                showCancelButton: true,
                                closeOnConfirm: true,
                                confirmButtonText: "马上联系",
                                cancelButtonText: "取消"
                            }, function(bool) {
                                if (bool) {
                                    //马上联系操作
                                    window.location.href = 'tel:' + tel + '';
                                }

                            });
                        });
                    }

                },
                //监听头部列表
                'headerList': function(val, oldVal) {
                    var _this = this;
                    getTopWidth(_this);
                },

                //监听头部移动距离
                'typeleft': function(val, oldVal) {
                    var _this = this;
                    _this.moveX = val;
                }
                
            },
            methods: {
                //面板开启关闭
                getSwitch: function(type) {

                    var sw = type === '1' ? '0' : '1';
                    var param = {
                        'C_POWER': sw
                    }
                    loading.show(5, "255,255,255,0");

                    loading.hide();
                    this.status.C_POWER = sw;

                    //提交控制中心
                    postAction(param);

                },
                gotoFood:function(){
                    window.location.href = 'foodList.html';
                },
                //设置功能
                setFun: function(item, event) {
                    var ele = event.currentTarget;
                    var key =item.key;
                    var $item = $(ele).parents('.item');
                    var _this = this;
                    var funVal = ''; //功能值
                    var param = {};


                    //不可点击
                    if ($item.hasClass('disabled') || (!item.isPower && _this.status.C_POWER === '0')) {
                        return;
                    }
                    _this.trigger = key;

                    if (item.type.component === '1') {
                        funVal = _this.status[key] > '0' ? '0' : '1';
                        param[key] = funVal;
                        _this.status[key] = funVal;

                        //按钮互斥
                        if(item.hasOwnProperty("disabledKey")){
                            item.disabledKey.forEach(function (_keyName) {
                                _this.btnList.forEach(function (_btn) {
                                    if(_btn.key == _keyName){
                                        if(_this.status[item.key]> 0){
                                            _btn.disabled = false;
                                        }else{
                                            _btn.disabled = true;
                                        }
                                    }
                                })
                            })
                        }

                        //提交控制中心
                        postAction(param);

                    }else if (item.type.component === '2') { //打开选择列表
                        
                        var disabled = {};


                        require.async('../../../base/js/bottomList', function(bottomList) {
                            bottomList.init({
                                show: true,
                                title: item['name'],
                                titleTip: '',
                                leftBtn: '取消',
                                rightBtn: null,
                                leftBtnCallback: null,
                                rightBtnCallback: null,
                                clickCallback: listCallback,
                                list: item.type.mapping, //列表
                                listIcon: '', //图标列表
                                active: _this.status[key], //选中
                                disabled: disabled //不可点类型
                            });
                        });

                        //callback
                        function listCallback(data) {
                            // 是否相同功能
                            if (data.id !== _this.status[key]) {
                                param[key] = data.id;
                                _this.status[key] = data.id;

                                //按钮互斥
                                if(item.hasOwnProperty("disabledKey")){
                                    item.disabledKey.forEach(function (_keyName) {
                                        _this.btnList.forEach(function (_btn) {
                                            if(_btn.key == _keyName){
                                                if(_this.status[item.key]> 0){
                                                    _btn.disabled = false;
                                                }else{
                                                    _btn.disabled = true;
                                                }
                                            }
                                        })
                                    })
                                }

                                //提交控制中心
                                postAction(param);
                            }

                        }
                    }
                }
            }
        });

        //头部滑动
        function touchTop(_this) {
            var maxWidth = 0;
            var el = _this.$els.getwidth;

            //滑动
            toucher(el).on('swipeStart', function(e) {
                maxWidth = _this.typeleft;
                startX = -parseInt($(this).css('left'));
                $(this).css({
                    '-webkit-transition': 'none'
                });
            }).on('swipe', function(e) {
                moveX = rangeControl(startX - e.moveX, maxWidth);
                $(this).css({
                    'left': '-' + moveX + 'px'
                });

                configData.moveX = moveX;
                return false;
            }).on('swipeEnd', function(e) {
                $(this).css({
                    '-webkit-transition': 'left 300ms linear'
                });
            });
        }

        //设置顶部信息
        function getTopWidth(_this) {
            //节点
            var el = _this.$els.getwidth;
            var children = el.children;
            //父节点宽度
            var parentsWidth = $(el).parent().width();
            //转数组
            var chlArray = Array.prototype.slice.call(children);
            var w = 0;
            chlArray.forEach(function(o, i) {
                w += $(o).width();
            });
            w = w;

            _this.typewidth = w;
            _this.typeleft = (w - parentsWidth) < 0 ? 0 : (w - parentsWidth);
        }

        //提交控制中心
        function postAction(cmd) {
            return false;

            //清理定时
            if (timeout) {
                clearTimeout(timeout);
            }

            getData.getExecuteCmd(cmd, function(data) {

                if (data === 'fail') { //404 500 等错误
                    setProps(configData.status, configData.oldStatus);
                    loading.hide();
                } else {
                    if (data.code === "0") {
                        //成功

                        //定时，等待MQTT推送设备状态
                        timeout = setTimeout(function() {
                            setProps(configData.status, configData.oldStatus);
                            loading.hide();
                        }, configData.delay);

                    } else {
                        //失败
                        loading.hide();
                        getData.gErrorTips(data.desc);
                        setProps(configData.status, configData.oldStatus);
                    }
                }
            });
        };

        //面板渲染
        function allDraw(obj) {
            if (obj.onlineStatus ) {
                loading.hide();
                //替换新状态
                configData.trigger = null;
                setProps(configData.status, obj);
                var status = JSON.parse(JSON.stringify(configData.status));
                configData.oldStatus = status;
                //设置
                setTopType();
                if (obj.onlineStatus) {
                    //设备状态反馈，清理定时
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                }
            }
        }
        //设置头部模式
        function setTopType() {
            var typeArr = [];
            configData.btnList.forEach(function(o, i) {
                var param = {};
                if (o.isHeaderShow && o.key !== 'C_Timing') {
                    if (o.isHeaderShow.show && o.isHeaderShow.shwoVal.indexOf(configData.status[o.key]) > -1) {
                        param['param'] = o.name;
                        o.type.mapping.forEach(function(obj, index) {
                            if (obj.id == configData.status[o.key]) {
                                param['exp'] = obj.type;
                            }
                        })
                        typeArr.push(param);
                    }
                }
            });
            configData.headerList = typeArr;
        }
        //对比
        function rangeControl(num, max) {
            var num = Math.max(num, 0);
            return Math.min(num, max);
        }

        // 修改对象属性
        function setProps(originObj, newObj) {
            for (var i in newObj) {
                if (originObj.hasOwnProperty(i)) {
                    if (typeof newObj[i] === 'object' && newObj[i] instanceof Array) {
                        originObj[i] = newObj[i].slice(0);
                    } else if (typeof newObj[i] === 'object' && newObj[i] instanceof Object) {
                        originObj[i] = JSON.parse(JSON.stringify(newObj[i]));
                    } else {
                        originObj[i] = newObj[i];
                    }
                }
            }
            return originObj;
        }

        return {
            allDraw: allDraw
        };

    };

    return new gFunc;
});
