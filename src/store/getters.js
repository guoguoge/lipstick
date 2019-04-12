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
  url: state => state.user.url,
  top: state => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
}

export default getters
