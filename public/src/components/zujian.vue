<template>
    <div class="bs_block">
        <p class="h2">组件</p>

        <p class="h3">prop</p>
        <p>父级数据传递到组件</p>
        <p>驼峰写法要成小横杠连接</p>
        <my-component msg="9999"></my-component>

        <p class="h3">动态Props</p>
        <p>必须在当前组件的data中初始化变量名，否则会报错</p>
        <input v-model="parentMsg">
        <br>
        <child :my-message="parentMsg"></child>

        <p class="h3">自定义事件,动态组件</p>
        <a href="component.html" target="_blank">点我</a>
    </div>
</template>

<script>

    module.exports = {
        data: function () {
            return {'parentMsg':''}
        },
        components:{
            'my-component': {
                template: '<div>A custom component!{{msg}}</div>',
                // 声明 props
                props: ['msg']
            },
            'child':{
                props: ['myMessage'],
                template: '<p>{{myMessage}}</p>'
            }
        }
    }
</script>