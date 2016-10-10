/**
 * Created by 15031493 on 2016/8/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 创建一个对象来保存应用启动时的初始状态
const state = {
    // TODO: 放置初始状态
    count: 0,
    s_num:1
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
    // TODO: 放置我们的状态变更函数
    INCREMENT (state,val) {
        state.count += val
    },
    MINUS (state,val){
        state.count -= val
    },
    UPDATEMESSAGE (state,val){
        state.s_num = val
    }
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations,
    strict: process.env.NODE_ENV !== 'production'
})