import {
  Login,
  Logout
} from '@/api/user'

import Cookies from 'js-cookie'

// import {
//   Message
// } from 'iview';

import {
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  jsonpReturn,
  checkRequest
} from '@/libs/util'

const user = {
  state: {
    token: getUserInfo().token,
    telphone: getUserInfo().tel,
    name: getUserInfo().name,
    width: document.body.clientWidth,
    url: 'http://129.28.67.91/Hmzk/public/',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_TELPHONE: (state, telphone) => {
      state.telphone = telphone
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      console.log(userInfo);
      const username = userInfo.tel.trim()
      const autoLogin = userInfo.autoLogin
      return new Promise((resolve, reject) => {
        Login(username, userInfo.password).then(response => {
          const data = checkRequest(response, false)
          console.log(data);
          if (checkRequest(response, false)) {
            // Message.success({
            //   content: '欢迎回到必势得',
            //   duration: 2,
            //   closable: true
            // })
            commit('SET_TOKEN', data.token) // 存入token
            commit('SET_NAME', data.name) // 存入name
            commit('SET_TELPHONE', data.tel) // 存入tel
            if (autoLogin) {
              setUserInfo(data, Config.expirationTime)
              if (getUserInfo()) {
                console.log(getUserInfo());
                resolve(response)
              }
            } else {
              setUserInfo(data)
              if (getUserInfo()) {
                console.log(getUserInfo());
                resolve(response)
              }
            }
          } else {
            // Message.error({
            //   content: '账号或密码错误',
            //   duration: 10,
            //   closable: true
            // })
            reject(error)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        Logout(state.token).then(() => {
          commit('SET_TOKEN', '') // 存入token
          commit('SET_NAME', '') // 存入name
          commit('SET_TELPHONE', '') // 存入tel
          removeUserInfo()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息 必势得直接忽略这个步骤
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          // 由于mockjs 不支持自定义状态码只能这样hack\
          console.log(getToken());
          if (!response.data) {
            reject('Verification failed, please login again.')
          }

          const data = response.data
          console.log(data.roles);
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array!')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({
      commit,
      dispatch
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
