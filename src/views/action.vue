<template>
<div class="userBox">
  <x-header :left-options="{showBack: false}">竞拍</x-header>
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
  <toast width="18rem" v-model="toast" type="text">{{toastText}}</toast>
</div>
</template>

<script>
import {
  Tab,
  TabItem,
  XHeader,
  Swiper,
  XButton,
  SwiperItem,
  Toast
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
  ACate,
  TreasureWin,
  AuctionList,
  CarouselList,
  GetOpenId
}
from '@/api/user'

import Commodity from "#/commodity";
import Marquee from "#/marquee";


export default {
  data() {
    return {
      swiper: 0,
      img: require('@/assets/notice.png'),
      swiperList: [],
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
      rowList: [],
      swiperShow: true,
      toast: false,
      toastText: ''
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
      'url',
      'openid'
    ])
  },
  components: {
    Tab,
    TabItem,
    XHeader,
    Swiper,
    Commodity,
    Marquee,
    XButton,
    SwiperItem,
    Toast
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
      CarouselList(4).then(res => {
        this.treasureList = []
        let data = checkRequest(res, false)
        if (checkRequest(res, false)) {
          data.forEach(item => {
            if (item.type == 2) {
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
        if (data.length) this.newList = data
        else {
          this.newList = ['暂无用户中奖消息消息']
        }
      })
      this.getList()
    },
    getList(id) {
      this.rowList = []
      this.swiperShow = id ? false : true
      AuctionList(id).then(res => {
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
        path: 'actionCommodityDetail',
        query: {
          id: this.swiperList[swiper].goods_id
        }
      })
    },
    formatUrl(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
      if (r != null) return unescape(r[2]);
      return null;
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.init()
    GetOpenId(this.formatUrl('code')).then(res => {
      if (res.data.openid && res.data.openid != this.openid) {
        this.$store.dispatch('SetOpenID', res.data.openid)
      }
    })
    // window.location.href = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.appid}&secret=${this.secret}&code=${this.formatUrl('code')}&grant_type=authorization_code`
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
        .align-middle {
            font-size: 12px;
        }
        /deep/b {
            color: #E91195;
        }
        img {
            width: 20px;
            height: 20px;
            position: absolute;
            bottom: 25%;
            left: 2rem;
        }
    }
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
