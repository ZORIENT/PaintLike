// 该文件用来创建Vuex中的store

// 引入Vue
import Vue from "vue"
// 引入Vuex
import Vuex from "vuex"
// 使用Vuex插件
Vue.use(Vuex)

// 准备actions，用来响应组件中的动作
const actions={}

// 准备mutations，用来操作数据（state）
const mutations={}

// 准备state，用于存储数据
const state={
    isLogin:false,
}

// 准备getters，用于将数据进行加工
const getters={}

// 创建store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
})