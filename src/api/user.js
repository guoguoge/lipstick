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

export const AddAddress = (token, name, tel, address) => { //添加收货地址
  return axios.request({
    url: 'add_address',
    data: {
      token: token,
      name: name,
      tel: tel,
      address: address
    },
    method: 'post',
  })
}

export const AddressList = (token) => { //收货地址列表
  return axios.request({
    url: 'list_address',
    data: {
      token: token
    },
    method: 'post',
  })
}

export const SetAddress = (token, address_id) => { //设置默认收货地址
  return axios.request({
    url: 'set_address',
    data: {
      token: token,
      address_id: address_id
    },
    method: 'post',
  })
}

export const DelAddress = (token, address_id) => { //添加收货地址
  return axios.request({
    url: 'del_address',
    data: {
      token: token,
      address_id: address_id
    },
    method: 'post',
  })
}


export const ChangePassword = (tel, old_password, password, confirm_password) => { //修改密码
  return axios.request({
    url: 'change_password',
    data: {
      tel: tel,
      old_password: old_password,
      password: password,
      confirm_password: confirm_password
    },
    method: 'post',
  })
}

export const SetIcon = (fd) => { //上传头像
  return axios.request({
    url: 'set_icon',
    data: fd,
    method: 'post',
  })
}

export const TreasureCat = () => { //分类列表
  return axios.request({
    url: 'del_address',
    method: 'post',
  })
}
