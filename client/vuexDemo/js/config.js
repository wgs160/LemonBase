/* 空调面板配置
 * 相应图标请看css/iconfont/dome.html
 */
define(function(require, exports, module) {
    var config = {
        trigger: null, //当前被点击
        send: 0, //0 单命令  1 全命令
        delay: 5000, //超时时间，状态回退 单位毫秒
        online: '', //是否离线 0 离线，1在线
        power: '0', // 是否关机 0 关机，1开机
        //===================以下配置项=========================//
        status: { //设备状态定义以及初始设置，需写完整，不然不被记录
            C_POWER: "0", //开关
            C_LIGHT: '0', //照明
            C_WINDSPEED: '0',//风速
            C_CLEAN: '0',//蒸汽洗
            onlineStatus: '',
            faultWarn: '0'
        },
        oldStatus: {},

        //底部按钮列表
        btnList: [{
            key: 'C_WINDSPEED', //字段名
            val: ['0', '1', '2', '3','4'], //值范围
            icon: ['&#xe690;','&#xe690;','&#xe692;', '&#xe68d;', '&#xe69a;'], //图标
            name: '风速', //按钮名
            isPower: false, //关机下是否可操作 false 不可操作  true 可操作
            disabled: true, //是否不可点击 false 不可点击，true 可点击
            disabledKey:["C_CLEAN"],//互斥对象
            type: { //组件类型
                component: '2', //组件名 (1，普通按钮 2，底部选择列表)
                mapping: [
                {
                    id: '0',
                    type: '关'
                },
                {
                    id: '1',
                    type: '1档'
                }, {
                    id: '2',
                    type: '2档'
                }, {
                    id: '3',
                    type: '3档'
                }, {
                    id: '4',
                    type: '4档'
                }]
            },
            isHeaderShow: { //是否头部显示
                show: true, //是否显示
                shwoVal: [ '1', '2', '3'] //显示范围值
            }
        }, {
            key: 'C_LIGHT', //字段名
            val: ['0', '1'], //值范围
            icon: ['&#xe691;','&#xe691;'], //图标
            name: '照明', //按钮名
            isPower: true, //关机下是否可操作 false 不可操作  true 可操作
            disabled: true, //是否不可点击 false 不可点击，true 可点击
            type: { //组件类型
                component: '1', //组件名 (1，普通按钮 2，底部选择列表)
                mapping: [{
                    id: '0',
                    type: '关闭'
                }, {
                    id: '1',
                    type: '开启'
                }]
            },
            isHeaderShow: { //是否头部显示
                show: true, //是否显示
                shwoVal: ['1'] //显示范围值
            }
        },{
            key: 'C_CLEAN', //字段名
            val: ['0', '1'], //值范围
            icon: ['&#xe69b;','&#xe69b;'], //图标
            name: '蒸汽洗', //按钮名
            isPower: false, //关机下是否可操作 false 不可操作  true 可操作
            disabled: true, //是否不可点击 false 不可点击，true 可点击
            disabledKey:["C_WINDSPEED"],//互斥对象
            type: { //组件类型
                component: '1', //组件名 (1，普通按钮 2，底部选择列表)
                mapping: [{
                    id: '0',
                    type: '关闭'
                }, {
                    id: '1',
                    type: '开启'
                }]
            },
            isHeaderShow: { //是否头部显示
                show: true, //是否显示
                shwoVal: [ '1'] //显示范围值
            }
        }],
        //故障
        faultWarn: {
            "0x02": '电压波动',
            "0x04": '煤气泄漏',
            "0x08": '电机堵转',
            "0x10": '点火失败',
            "0x20": '燃烧定时失效',
            "0x40": '防火墙故障',
            "0x80": '设备漏电'
        },
        //故障电话
        faultWarnTel: '4008-365-365'
    }

    return config;
})
