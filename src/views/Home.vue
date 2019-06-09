<template>
<div class="userBox">
  <x-header :left-options="{showBack: false}">夺宝</x-header>
  <tab>
    <tab-item v-for="(item,index) in tabList" :key="index" :selected="index===0" @on-item-click="tabClick(index)">{{item.name}}</tab-item>
  </tab>
  <swiper v-if="swiperList" v-show="swiperShow" @click.native="click(swiper)" loop v-model="swiper" auto :interval="2800" :min-moving-distance="120" dots-position="center" :show-desc-mask="false">
    <swiper-item class="swiper-demo-img" v-for="(item, index) in swiperList" :key="index"><img :src="item.img" width="100%"></swiper-item>
  </swiper>
  <Marquee :newList="newList" />
  <div v-if="rowList.length">
    <Commodity :item="item" v-for="(item,index)  in  rowList" />
  </div>
  <div class="noCommodity" v-else>
    抱歉,当前分类暂无商品<br> 请先查看其他分类
    <x-button class="button" @click.native="goBack">前 往</x-button>
  </div>
</div>
</template>

<script>
import {
  Tab,
  TabItem,
  XHeader,
  Swiper,
  XButton,
  SwiperItem
} from 'vux'

import {
  jsonpReturn, //处理返回的数据
  checkRequest,
  dateToTime
}
from '@/libs/util'

import {
  mapGetters
} from 'vuex'

import {
  ChangePassword, //发送短信验证码
  TreasureCat,
  TreasureWin,
  TreasureList,
  CarouselList,
}
from '@/api/user'

import Commodity from "#/commodity";
import Marquee from "#/marquee";


export default {
  data() {
    return {
      swiper: 0,
      swiperList: [],
      tabList: [{
        id: 0,
        name: '全部商品'
      }],
      newList: [],
      rowList: [],
      swiperShow: true
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
    XButton,
    SwiperItem,
    Marquee
  },
  methods: {
    init() {
      TreasureCat(this.token, 4).then(res => {
        let data = checkRequest(res, false)
        data.forEach((item) => {
          this.tabList.push({
            id: item.id,
            name: item.cat_name,
          })
        })
        console.log(checkRequest(res, false));
      })
      CarouselList(4).then(res => {
        this.treasureList = []
        let data = checkRequest(res, false)
        if (checkRequest(res, false)) {
          data.forEach(item => {
            if (item.type == 1) {
              this.swiperList.push({
                img: this.url + item.carousel,
                goods_id: item.goods_id
              })
            }
          })
        }
        console.log(checkRequest(res, false));
      })
      TreasureWin().then(res => {
        let data = checkRequest(res, false)
        console.log(data, 'data');
        if (data.length) this.newList = data
        else {
          this.newList = ['暂无用户中奖消息消息']
        }
      })

      this.getList() // 获取夺宝商品列表
    },
    getList(id) { // 获取夺宝商品列表
      this.rowList = []
      this.swiperShow = id ? false : true
      TreasureList(id).then(res => {
        let data = checkRequest(res, false)
        if (data.length) {
          for (let i = 0; i < data.length; i++) {
            data[i].publishTimeNew = dateToTime(data[i].start);
          }
          data.sort((a, b) => {
            return b.publishTimeNew > a.publishTimeNew ? 1 : -1;
          })
          this.rowList = data
          console.log(checkRequest(res, false));
        }
      })
    },
    tabClick(index) {
      this.getList(this.tabList[index].id)
    },
    onClick(i) {
      console.log(i)
    },
    goBack() {
      this.getList()
    },
    click(swiper) {
      console.log(swiper);
      this.$router.push({
        path: 'commodityDetail',
        query: {
          id: this.swiperList[swiper].goods_id
        }
      })
    },
    dateToTime(str) {
      return (new Date(str.replace(/-/g, '/'))).getTime(); //用/替换日期中的-是为了解决Safari的兼容
    },
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
    .noCommodity {
        color: #E91195;
        padding: 2rem 0;
        /deep/.button {
            margin-top: 1rem;
            width: 30%;
            color: #E91195;
            border: 1px solid #E91195;
        }
    }
}
</style>
