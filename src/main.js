import Vue from 'vue'
import App from './App.vue'

// 引入重置css
import "./assets/css/reset.css"

// 引入图标库
import "./assets/iconfont/iconfont.css"

// 引入动画库
import "animate.css"

// 引入vue-router路由器
import VueRouter from "vue-router"
import router from "./router"

// 引入store
import store from "./store"

// 引入element-ui
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// 使用路由插件
Vue.use(VueRouter)

// 使用elementui
Vue.use(ElementUI)


new Vue({
  render: h => h(App),

  // 前一个router是配置项，后一个router是引入的router包的名字
  router:router,

  // 全局事件总线
  beforeCreate() {
    Vue.prototype.$bus=this;
  },

  store,

}).$mount('#app')
