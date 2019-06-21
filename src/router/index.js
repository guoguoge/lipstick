import Vue from 'vue'
import Router from 'vue-router'


const Layout = r => require.ensure([], () => r(require('../views/layout')), 'layout')
const home = r => require.ensure([], () => r(require('../views/home')), 'home')
const action = r => require.ensure([], () => r(require('../views/action')), 'action')
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

const commodityDetail = r => require.ensure([], () => r(require('../views/commodityDetail')), 'commodityDetail')
const actionCommodityDetail = r => require.ensure([], () => r(require('../views/actionCommodityDetail')), 'actionCommodityDetail')

const binding = r => require.ensure([], () => r(require('../views/binding')), 'binding')

const game = r => require.ensure([], () => r(require('../views/game')), 'game')

const login = r => require.ensure([], () => r(require('../views/user/login')), 'login')
const register = r => require.ensure([], () => r(require('../views/user/register')), 'register')
const password = r => require.ensure([], () => r(require('../views/user/password')), 'password')

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
    path: '',
    component: Layout,
    redirect: '/center',
    children: [{
        path: '/',
        name: 'home',
        component: home,
        meta: {
          title: '首页',
          hiddenHeader: true, // true为隐藏header
          tab: 0,
        }
      },
      {
        path: '/action',
        name: 'action',
        component: action,
        meta: {
          title: '竞拍',
          hiddenHeader: true, // true为隐藏header
          tab: 0,
        }
      },
      {
        path: '/commodityDetail',
        name: 'commodityDetail',
        component: commodityDetail,
        meta: {
          title: '夺宝详情',
          hiddenTab: true, // true为隐藏tab
          hiddenHeader: true, // true为隐藏header
          tab: 0,
        }
      },
      {
        path: '/actionCommodityDetail',
        name: 'actionCommodityDetail',
        component: actionCommodityDetail,
        meta: {
          title: '竞拍详情',
          hiddenTab: true, // true为隐藏tab
          hiddenHeader: true, // true为隐藏header
          tab: 1,
        }
      },
      {
        path: '/center',
        name: 'center',
        component: center,
        meta: {
          title: '我的',
          requireAuth: true, // 登陆后查看
          hiddenHeader: true, // true为隐藏header
          tab: 1,
        }
      },
      {
        path: '/balance',
        name: 'balance',
        component: balance,
        meta: {
          title: '账户余额',
          requireAuth: true, // 登陆后查看
          tab: 3,

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
          tab: 3,

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
          tab: 3,

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
          tab: 3,

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
          tab: 3
        }
      },
      {
        path: '/game',
        name: 'game',
        component: game,
        meta: {
          title: '口红机游戏',
          requireAuth: true, // 登陆后查看
          hiddenTab: true, // true为隐藏tab
          tab: 0,
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
          tab: 3,
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
          tab: 3,

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
          tab: 3,
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
          tab: 3,
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
          tab: 3
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
