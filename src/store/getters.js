import Cookies from 'js-cookie'
//
// const TokenKey = 'Admin-Token'


const getters = {
  width: width => width.user.width,
  token: state => state.user.token,
  telphone: state => state.user.telphone,
  id: state => state.user.id,
  username: state => state.user.name,
  avater: state => state.user.avater,
  openid: state => state.user.openid,
  url: state => state.user.url,
  appid: state => state.user.appid,
  secret: state => state.user.secret,
  top: state => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
}

export default getters
