import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home.vue'


const Layout = r => require.ensure([], () => r(require('../views/layout')), 'layout')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '',
    component: Layout,
    redirect: '/',
    children: [{
        path: '/',
        name: 'home',
        component: home,
        meta: {
          title: '必势得云算力'
        }
      },
      // {
      //   path: '/market',
      //   name: 'market',
      //   component: market,
      //   meta: {
      //     title: '矿机商城-必势得'
      //   },
      // }
    ]
  }]
})
