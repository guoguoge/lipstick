import Vue from 'vue'
import Router from 'vue-router'


const Layout = r => require.ensure([], () => r(require('../views/layout')), 'layout')
const home = r => require.ensure([], () => r(require('../views/home')), 'home')
const center = r => require.ensure([], () => r(require('../views/center')), 'center')
const balance = r => require.ensure([], () => r(require('../views/balance')), 'balance')
const withdrawal = r => require.ensure([], () => r(require('../views/withdrawal')), 'withdrawal')
const recharge = r => require.ensure([], () => r(require('../views/recharge')), 'recharge')

const recordAuction = r => require.ensure([], () => r(require('../views/recordAuction')), 'recordAuction')
const recordLipstick = r => require.ensure([], () => r(require('../views/recordLipstick')), 'recordLipstick')
const recordTreasure = r => require.ensure([], () => r(require('../views/recordTreasure')), 'recordTreasure')

const address = r => require.ensure([], () => r(require('../views/address')), 'address')
const addAddress = r => require.ensure([], () => r(require('../views/addAddress')), 'addAddress')
const changePassword = r => require.ensure([], () => r(require('../views/changePassword')), 'changePassword')


const binding = r => require.ensure([], () => r(require('../views/binding')), 'binding')



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
          title: '首页',
          hiddenHeader: true, // true为隐藏header
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
        path: '/withdrawal',
        name: 'withdrawal',
        component: withdrawal,
        meta: {
          title: '提现',
          requireAuth: true, // 登陆后查看
          hiddenTab: true, // true为隐藏tab
        }
      },
      {
        path: '/recharge',
        name: 'recharge',
        component: recharge,
        meta: {
          title: '充值',
          requireAuth: true, // 登陆后查看
          hiddenTab: true, // true为隐藏tab
        }
      },
      {
        path: '/recordAuction',
        name: 'recordAuction',
        component: recordAuction,
        meta: {
          title: '竞拍记录',
          requireAuth: true, // 登陆后查看
          hiddenTab: true, // true为隐藏tab
        }
      },
      {
        path: '/recordLipstick',
        name: 'recordLipstick',
        component: recordLipstick,
        meta: {
          title: '口红机记录',
          requireAuth: true, // 登陆后查看
          hiddenTab: true, // true为隐藏tab
        }
      },
      {
        path: '/recordTreasure',
        name: 'recordTreasure',
        component: recordTreasure,
        meta: {
          title: '夺宝记录',
          requireAuth: true, // 登陆后查看
          hiddenTab: true, // true为隐藏tab
        }
      },
      {
        path: '/address',
        name: 'address',
        component: address,
        meta: {
          title: '收货地址',
          requireAuth: true, // 登陆后查看
          hiddenTab: true, // true为隐藏tab
        }
      },
      {
        path: '/addAddress',
        name: 'addAddress',
        component: addAddress,
        meta: {
          title: '新增收货地址',
          requireAuth: true, // 登陆后查看
          hiddenTab: true, // true为隐藏tab
        }
      },
      {
        path: '/changePassword',
        name: 'changePassword',
        component: changePassword,
        meta: {
          title: '修改密码',
          requireAuth: true, // 登陆后查看
          hiddenTab: true, // true为隐藏tab
        }
      },
      {
        path: '/binding',
        name: 'binding',
        component: binding,
        meta: {
          title: '账号绑定',
          requireAuth: true, // 登陆后查看
          hiddenTab: true, // true为隐藏tab
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
