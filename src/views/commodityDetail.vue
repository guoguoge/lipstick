<template>
<div class="userBox">
  <x-header :left-options="{showBack: false}">夺宝</x-header>
  <tab>
    <tab-item v-for="(item,index) in 8" :key="index" :selected="index===0">夺宝奇兵 {{index}}</tab-item>
  </tab>
  <swiper :list="swiperList" loop v-model="swiper" auto :interval="2800" :min-moving-distance="120" dots-position="center" :show-desc-mask="false"></swiper>
  <div class="marquee">
    <img :src="img" width="100%">
    <marquee>
      <marquee-item v-for="(item,index) in noticeList" :key="index" @click.native="onClick(i)" class="align-middle" v-html="item"></marquee-item>
    </marquee>
  </div>
  <Commodity v-for="(item,index)  in  4" />

</div>
</template>

<script>
import {
  Tab,
  TabItem,
  XHeader,
  Swiper,
  Marquee,
  MarqueeItem
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

import Commodity from "#/commodity";


export default {
  data() {
    return {
      swiper: 0,
      img: require('@/assets/notice.png'),
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
      ],
      noticeList: [
        `公告 : 恭喜张三三获得 <b>荣耀手机</b> 一部  `,
        `公告 : 恭喜林俊杰获得 <b>苹果手机</b> 一部  `,
        `公告 : 恭喜周杰伦获得 <b>苹果手机</b> 一部  `,
        `公告 : 恭喜张国荣获得 <b>荣耀手机</b> 一部  `,
        `公告 : 恭喜张三三获得 <b>小米手机</b> 一部  `,
        `公告 : 恭喜张三三获得 <b>荣耀手机</b> 一部  `,
        `公告 : 恭喜张三三获得 <b>小米手机</b> 一部  `,
        `公告 : 恭喜张三三获得 <b>荣耀手机</b> 一部  `,
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
    Swiper,
    Commodity,
    Marquee,
    MarqueeItem
  },
  methods: {
    onClick(i) {
      console.log(i)
    }
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #f7f7f7;
    .marquee {
        background: white;
        padding: 10px;
        position: relative;
        /deep/b {
            color: #E91195;
        }
        img {
            width: 20px;
            height: 20px;
            position: absolute;
            left: 2rem;

        }
    }
}
</style>
