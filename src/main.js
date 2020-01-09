import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(VueResource)
//使用vue-socket.io
import VueSocketIO from 'vue-socket.io'
import Store from './model/store'
var roomid = window.location.hash.split('=')[1]
Store.set('roomid',roomid)
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://a.itying.com?roomid=' + roomid,
    vuex: {
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}))
//定义路由组件
import Home from './component/Carte.vue'
import Start from './component/Start.vue'
import Search from './component/Search.vue'
import Cart from './component/Cart.vue'
import Hot from './component/menu/Hot.vue'
import All from './component/menu/All.vue'
import Detail from './component/Detail.vue'
import Order from './component/Order.vue'
import Success from './component/Success.vue'

//定义路由
const routes = [
  { path: '/start', component: Start },
  { path: '/carte', component: Home },
  { path: '/search', component: Search },
  { path: '/cart', component: Cart },
  { path: '/detail', component: Detail },
  { path: '/order', component: Order },
  { path: '/success', component: Success }
]
//创建 router 实例
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})
import './assets/build/css/style.scss'
import './assets/build/css/common.scss'
new Vue({
  el: '#app',
  router:router,
  sockets:{
    connect:function(){
        console.log('链接成功')
    }  
},
  render: h => h(App)
})
