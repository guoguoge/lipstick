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
    url: 'treasure_cat',
    method: 'post',
  })
}

export const TreasureWin = () => { //分类列表
  return axios.request({
    url: 'treasure_win',
    method: 'post',
  })
}


export const TreasureList = (cat_id) => { //分类列表
  return axios.request({
    url: 'treasure_list',
    data: {
      cat_id: cat_id
    },
    method: 'post',
  })
}

export const TreasureDetail = (token, goods_id) => { //分类列表
  return axios.request({
    url: 'treasure_detail',
    data: {
      token: token,
      goods_id: goods_id
    },
    method: 'post',
  })
}


export const TreasureJoin = (token, goods_id) => { //分类列表
  return axios.request({
    url: 'treasure_join',
    data: {
      token: token,
      goods_id: goods_id
    },
    method: 'post',
  })
}

export const TreasureRecord = (token) => { //分类列表
  return axios.request({
    url: 'treasure_record',
    data: {
      token: token
    },
    method: 'post',
  })
}

export const TreasureFin = (treasure_id) => { //夺宝--获取夺宝中奖人
  return axios.request({
    url: 'treasure_fin',
    data: {
      treasure_id: treasure_id
    },
    method: 'post',
  })
}


export const ACate = (token) => {
  // 竞拍商品分类
  return axios.request({
    url: 'aCate',
    method: 'post',
    data: {
      token: token
    }
  })
}


export const AuctionList = (cate_id) => {
  // 竞拍商品分类
  return axios.request({
    url: 'gAuction',
    method: 'post',
    data: {
      cate_id: cate_id
    }
  })
}

export const AuctionDetail = (goods_id) => {
  // 竞拍商品分类
  return axios.request({
    url: 'auction_detail',
    method: 'post',
    data: {
      goods_id: goods_id
    }
  })
}

export const AuctionTop = (goods_id) => {
  // 竞拍商品分类
  return axios.request({
    url: 'getMaximumBid',
    method: 'post',
    data: {
      goods_id: goods_id
    }
  })
}

export const AuctionStatus = (goods_id) => {
  // 竞拍商品分类
  return axios.request({
    url: 'getAuctionStatus',
    method: 'post',
    data: {
      goods_id: goods_id
    }
  })
}

export const AuctionRecord = (token) => { //竞拍记录
  return axios.request({
    url: 'getAuctionRecord',
    data: {
      token: token
    },
    method: 'post',
  })
}


export const ConsumeList = (token) => { //竞拍记录
  return axios.request({
    url: 'consume_list',
    data: {
      token: token
    },
    method: 'post',
  })
}


export const UserInfoByAuctionId = (token, goods_id) => { //商品详情里获取用户详情
  return axios.request({
    url: 'getUserInfoByAuctionId',
    data: {
      token: token,
      goods_id: goods_id
    },
    method: 'post',
  })
}

export const AddAuction = (token, auction_id, bid_price) => { //商品详情里获取用户详情
  return axios.request({
    url: 'addAuction',
    data: {
      token: token,
      auction_id: auction_id,
      bid_price: bid_price
    },
    method: 'post',
  })
}


export const RuleList = () => { //商品详情里获取用户详情
  return axios.request({
    url: 'rule_list',
    method: 'get',
  })
}

export const CarouselList = (method) => { //竞拍记录
  return axios.request({
    url: 'carousel',
    data: {
      method: method
    },
    method: 'post',
  })
}

export const GetBalance = (token) => { //竞拍记录
  return axios.request({
    url: 'get_balance',
    data: {
      token: token
    },
    method: 'post',
  })
}

export const GetOpenId = (code) => { //竞拍记录
  return axios.request({
    url: `getOpenId?code=${code}`
  })
}
