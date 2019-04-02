import Cookies from 'js-cookie'
//
// const TokenKey = 'Admin-Token'


const getters = {
  width: width => width.user.width,
  token: state => state.user.token,
  telphone: state => state.user.telphone,
  username: state => state.user.name,
  url: state => state.user.url,
  top: state => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
}

export default getters
