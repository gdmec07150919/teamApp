// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from 'components/goods/goods.vue'
import seller from 'components/seller/seller.vue'
import ratings from 'components/ratings/ratings.vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
Vue.use(Vuex)
var {store} = require('@/store/index.js')
import {ORDER_STORE} from 'common/js/store.js'
import 'common/stylus/index.styl'
Vue.prototype.GLOBAL = ORDER_STORE
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
import Order from '@/page/order/Order'
import OrderDetailed from '@/page/order/next/OrderDetailed'
import AddRating from '@/page/addRating/AddRating'
import Account from '@/page/account/Account'
import ActionBar from '@/components/header/ActionBar'
const routes = [{path: '/goods', component: goods}, {
  path: '/seller',
  component: seller
}, {path: '/ratings', component: ratings},
  {
      path: '/Home',
      name: 'Home',
      components: {default: null, header: ActionBar},
      props: {header: {title: '首页'}}
    },
    {
      path: '/Order',
      name: 'Order',
      components: {default: Order, header: ActionBar},
      props: {header: {title: '订单'}}
    },
    {
      path: '/OrderDetailed',
      components: {default: OrderDetailed, header: ActionBar},
      props: {header: {title: '订单详情', show: true}}
    },
    {
      path: '/AddRating',
      name: 'AddRating',
      components: {default: AddRating, header: ActionBar},
      props: {header: {title: '添加评价', show: true}}
    },
    {
      path: '/Account',
      name: 'Account',
      components: {default: Account, header: ActionBar},
      props: {header: {title: '我的', show: false}}
    }
 
]
const router = new VueRouter({
  routes,
  linkActiveClass: 'activess'
})

/* eslint-disable no-unused-vars */
const app = new Vue({
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount('#app')
router.push('/goods')
