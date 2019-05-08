import {
  Login,
  Logout
} from '@/api/user'

import Cookies from 'js-cookie'
import Config from '../../config'

// import {
//   Message
// } from 'iview';

import {
  setUserInfo,
  getUserInfo,
  removeUserInfo,
  setAvater,
  getAvater,
  removeAvater,
  jsonpReturn,
  checkRequest
} from '@/libs/util'

const user = {
  state: {
    token: getUserInfo().token,
    id: getUserInfo().id,
    telphone: getUserInfo().tel,
    name: getUserInfo().name,
    avater: getAvater(),
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
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_TELPHONE: (state, telphone) => {
      state.telphone = telphone
    },
    SET_AVATER: (state, avater) => {
      state.avater = avater
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      console.log(userInfo);
      const username = userInfo.tel.trim()
      return new Promise((resolve, reject) => {
        Login(username, userInfo.password).then((response) => {
          const data = checkRequest(response)
          console.log(data);
          if (checkRequest(response)) {
            commit('SET_TOKEN', data.token) // 存入token
            commit('SET_NAME', data.name) // 存入name
            commit('SET_NAME', data.name) // 存入name
            commit('SET_TELPHONE', data.tel) // 存入tel
            commit('SET_ID', data.id) // 存入tel
            commit('SET_AVATER', data.icon) // 存入tel
            setUserInfo(data, Config.expirationTime)
            setAvater(data.icon, Config.expirationTime)
            console.log(data);
            resolve(data)
            // if (autoLogin) {
            //   setUserInfo(data, Config.expirationTime)
            //   if (getUserInfo()) {
            //     console.log(getUserInfo());
            //     resolve(response)
            //   }
            // } else {
            //   setUserInfo(data)
            //   if (getUserInfo()) {
            //     console.log(getUserInfo());
            //     resolve(response)
            //   }
            // }
          } else {
            resolve(data)
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
          commit('SET_AVATER', '') // 存入icon
          removeUserInfo()
          removeAvater()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    SetAvater({
      commit,
      state
    }, avater) {
      return new Promise((resolve, reject) => {
        console.log(avater);
        commit('SET_AVATER', avater) // 存入icon
        setAvater(avater, Config.expirationTime)
        console.log(getAvater());
        resolve()
      })
    },

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
