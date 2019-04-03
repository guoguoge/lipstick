import axios from '@/libs/api.request'
import qs from 'qs'

export const Logout = (token) => { //用户退出登录
  let postData = qs.stringify({
    token: token,
  })
  return axios.request({
    url: 'logout',
    data: postData,
    method: 'post',
  })
}

export const Login = (tel, password) => { //用户--手机登录
  return axios.request({
    url: 'login',
    data: {
      tel: tel,
      password: password
    },
    method: 'post',
  })
}

export const Register = (name, tel, tel_code, password) => { //用户手机注册
  return axios.request({
    url: 'regist',
    data: {
      name: name,
      tel: tel,
      tel_code: tel_code,
      password: password,
    },
    method: 'post'
  })
}

export const Reset = (tel, tel_code, password) => { //用户手机注册
  return axios.request({
    url: 'reset',
    data: {
      tel: tel,
      tel_code: tel_code,
      password: password,
    },
    method: 'post'
  })
}

export const SendMessage = (tel) => { //发送手机验证码
  return axios.request({
    url: 'send_message',
    data: {
      tel: tel,
    },
    method: 'post',
  })
}
