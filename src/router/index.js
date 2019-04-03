import Vue from 'vue'
import Router from 'vue-router'


const Layout = r => require.ensure([], () => r(require('../views/layout')), 'layout')
const home = r => require.ensure([], () => r(require('../views/home')), 'home')
const center = r => require.ensure([], () => r(require('../views/center')), 'center')
const balance = r => require.ensure([], () => r(require('../views/balance')), 'balance')



const login = r => require.ensure([], () => r(require('../views/user/login')), 'login')
const register = r => require.ensure([], () => r(require('../views/user/register')), 'register')
const password = r => require.ensure([], () => r(require('../views/user/password')), 'password')


Vue.use(Router)

const router = new Router({
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
          title: '首页'
        }
      },
      {
        path: '/center',
        name: 'center',
        component: center,
        meta: {
          title: '我的',
          requireAuth: true // 登陆后查看
        }
      },
      {
        path: '/balance',
        name: 'balance',
        component: balance,
        meta: {
          title: '账户余额',
          requireAuth: true // 登陆后查看
        }
      },
      {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
          title: '登录',
          hiddenHeader: true, // true为隐藏header
          hiddenTab: true, // true为隐藏tab
          loginDisabled: true,
        },
      }, ,
      {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
          title: '注册',
          hiddenTab: true, // true为隐藏tab
          loginDisabled: true,
        },
      },
      {
        path: '/password',
        name: 'password',
        component: password,
        meta: {
          title: '找回密码',
          hiddenTab: true, // true为隐藏tab
          loginDisabled: true,
        },
      }
    ]
  }]
})

export default router
