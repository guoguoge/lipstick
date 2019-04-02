import axios from '@/libs/api.request'
import qs from 'qs'
// export const login = ({
//   tel,
//   password
// }) => {
//   const data = {
//     tel,
//     password
//   }
//   return axios.request({
//     url: 'iUserLogin',
//     data,
//     method: 'post'
//   })
// }

export const Login = (tel, password) => { //用户手机登录
  let postData = qs.stringify({
    tel: tel,
    password: password,
  })
  return axios.request({
    url: 'iUserLogin',
    data: postData,
    method: 'post',
  })
}

export const Logout = (token) => { //用户退出登录
  let postData = qs.stringify({
    token: token,
  })
  return axios.request({
    url: 'iUserLogout',
    data: postData,
    method: 'post',
  })
}

export const Register = (name, tel, password, password_confirm, tel_code) => { //用户手机注册
  return axios.request({
    url: 'iUserRegist',
    data: {
      name: name,
      tel: tel,
      password: password,
      password_confirm: password_confirm,
      tel_code: tel_code,
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
