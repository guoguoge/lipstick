import axios from '@/libs/api.request'
import qs from 'qs'

export const IMarket = fd => { //用户手机注册
  return axios.request({
    url: 'iMarket',
    data: fd,
    method: 'post'
  })
}


export const Resource = () => { //网站首页源数据
  return axios.request({
    url: 'resource',
    method: 'post'
  })
}

export const Scombination = () => { //网站首页套餐数据
  return axios.request({
    url: 'sCombination',
    method: 'post'
  })
}

export const News = () => { //公告
  return axios.request({
    url: 'getNews',
    method: 'post'
  })
}
