/**
 * [showSpinner description]
 * 这个页面是用来判断路由全线的直接承接的router的路由守卫 再导入到main
 * @type {[type]}
 */

import Cookies from 'js-cookie'
import Store from './store'
import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({
  easing: 'ease',
  speed: 300,
  showSpinner: true
}) // NProgress Configuration

import {
  getUserInfo
} from '@/libs/util'


router.beforeEach((to, from, next) => {
  /* 全局前置钩子 */
  NProgress.start() // start progress bar
  document.title = to.meta.title || '惠民折扣'
  window.scrollTo(0, 0)
  console.log(to);
  if (to.meta.requireAuth) { //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登录的
    if (getUserInfo()) {
      next();
    } else {
      next('/login')
      NProgress.done()
    }
  } else if (to.meta.loginDisabled) { //登录之后通过cookie来判断user底下的页面禁止用户再次进入
    if (getUserInfo()) {
      next('/')
      NProgress.done()
    } else {
      next();
    }
  } else {
    next();
  }
})

router.beforeResolve((to, from, next) => {
  /* 全局解析守卫 */
  next()
})

router.afterEach((to, from) => {
  /* 全局后置钩子 */
  NProgress.done()
})
