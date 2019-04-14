<template>
<div class="userBox">
  <tab>
    <tab-item v-for="(item,index) in tabList" :key="index" :selected="index===0" @on-item-click="tabClick(index)">{{item.name}}</tab-item>
  </tab>
  <swiper :list="swiperList" loop v-model="swiper" auto :interval="2800" :min-moving-distance="120" dots-position="center" :show-desc-mask="false"></swiper>
  <div class="marquee">
    <img :src="img" width="100%">
    <marquee>
      <marquee-item v-for="(item,index) in noticeList" :key="index" @click.native="onClick(i)" class="align-middle" v-html="item"></marquee-item>
    </marquee>
  </div>
  <div v-if="rowList.length">
    <Commodity :item="item" v-for="(item,index)  in  rowList" />
  </div>
  <div class="noCommodity" v-else>
    抱歉,当前分类暂无商品<br> 请先查看其他分类
  </div>
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
  ACate,
  TreasureWin,
  AuctionList
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
          img: require('@/assets/action.png'),
          title: ''
        },
        {
          url: 'javascript:',
          img: require('@/assets/action.png'),
          title: ''
        },
        {
          url: 'javascript:',
          img: require('@/assets/action.png'),
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
      ],
      tabList: [{
        id: 0,
        name: '全部商品'
      }],
      newList: [],
      rowList: []
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
      'url',
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
    init() {
      ACate(this.token).then(res => {
        let data = checkRequest(res, false)
        data.forEach((item) => {
          this.tabList.push({
            id: item.cate_id,
            name: item.cat_name,
          })
        })
        console.log(checkRequest(res, false));
      })
      this.getList()
    },
    getList(id) {
      this.rowList = []
      AuctionList(id).then(res => {
        let data = checkRequest(res, false)
        this.rowList = data
        console.log(checkRequest(res, false));
      })
    },
    tabClick(index) {
      this.getList(this.tabList[index].id)
    },
    onClick(i) {
      console.log(i)
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #f7f7f7;
    padding-bottom: 0.5rem;
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
    .noCommodity {
        color: #E91195;
        padding: 2rem 0;
    }
}
</style>
