import Vue from 'vue'
import Router from 'vue-router'


const Layout = r => require.ensure([], () => r(require('../views/layout')), 'layout')
const home = r => require.ensure([], () => r(require('../views/home')), 'home')
const login = r => require.ensure([], () => r(require('../views/user/login')), 'login')
const register = r => require.ensure([], () => r(require('../views/user/register')), 'register')
const password = r => require.ensure([], () => r(require('../views/user/password')), 'password')


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
      {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
          title: '登录'
        },
      }, ,
      {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
          title: '注册'
        },
      },
      {
        path: '/password',
        name: 'password',
        component: password,
        meta: {
          title: '找回密码'
        },
      }
    ]
  }]
})
