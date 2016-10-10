<template>
    <p><input type="button" value="续{{s_num}}s" @click="increment"/></p>
    <p><input type="button" value="减{{s_num}}s" @click="minus"/></p>
    <p><input type="text" v-model="thisNum" /></p>
</template>

<script>
    import { incrementCounter,minusCounter,updateMessage } from '../vuex/actions'
    import { getNum } from '../vuex/getters'
    export default {
        vuex: {
            actions: {
                increment: incrementCounter,
                minus: minusCounter,
                updateMessage:updateMessage
            },
            getters: {
                // 注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
                s_num: getNum
            }
        },
        computed: {
            thisNum: {
                get () {
                    return this.s_num
                },
                set (val) {
                    this.updateMessage(val)
                }
            }
        }

    }
</script>