<template>
<div class="">
  <x-header :left-options="{showBack: false}">夺宝</x-header>
  <tab>
    <tab-item v-for="n in 8" :key="n" :selected="n===1">夺宝奇兵{{ n }}</tab-item>
  </tab>
  <swiper :list="swiperList" loop v-model="swiper" auto :interval="2800" :min-moving-distance="120" :show-desc-mask="false"></swiper>
</div>
</template>

<script>
import {
  Tab,
  TabItem,
  XHeader,
  Swiper
} from 'vux'

import {
  jsonpReturn, //处理返回的数据
  checkRequest
}
from '@/libs/util'

import {
  mapGetters
} from 'vuex'

import {
  ChangePassword, //发送短信验证码
}
from '@/api/user'


export default {
  data() {
    return {
      swiper: 0,
      swiperList: [{
          url: 'javascript:',
          img: require('@/assets/home.png'),
          title: ''
        },
        {
          url: 'javascript:',
          img: require('@/assets/home.png'),
          title: ''
        },
        {
          url: 'javascript:',
          img: require('@/assets/home.png'),
          title: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
    ])
  },
  components: {
    Tab,
    TabItem,
    XHeader,
    Swiper
  }
}
</script>

<style lang="less" scoped>
</style>
