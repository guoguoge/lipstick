<template>
<div class="userBox">
  <x-header ref="header" solt="header" title="竞拍详情"><a slot="right" @click="show3 = true">规则</a></x-header>
  <div class="panel">
    <ActionBubble v-if="goodStatus != '未开始'" :mess="commodity.list"></ActionBubble>
    <div class="coverImg">
      <img :src="'http://'+ commodity.cover_img" width="100%">
    </div>

    <div class="countDown">
      <span>{{countDownTitle}}</span>
      <span class="count" v-show="step != 3"><b>{{time.a || 0}}</b> 天<b>{{time.b || 0}}</b> 时 <b>{{time.c || 0}}</b> 分 <b>{{time.d || 0}}</b> 秒</span>
    </div>
    <div v-if="topName" class="top">
      当前最高出价:<br><span class="name">昵称: {{topName || '暂无出价信息'}}</span><br>价格: <span class="price">{{topPrice}} 元</span>
    </div>
    <div v-else class="top">
      暂无出价信息
    </div>
    <div class="info">
      <span>商品名:{{commodity.name}}</span>
      <span @click="show = true">分享</span>
    </div>

    <div class="details">
      <span>参与人数：{{commodity.hot}} 人</span>
      <span>最低出价：{{commodity.bottom_price}} 元</span>
      <span>状态：{{goodStatus}}</span>
    </div>

    <div class="step">
      <Step :number="step" :status="2"></Step>
    </div>

    <div class="rule">
      竞拍规则<br>1. 所有产品都是随机靠运气抽取，所有产品可支持专柜验货<br>2. 一个星期内可收到货
    </div>

    <div class="img">
      <img :src="item" width="100%" v-for="(item,index) in imgList">
    </div>

    <div class="buttonGroup">
      <x-button class="button" :class="step!=1?'over':''" :disabled="step !=1 " :gradients="['#FF16A4', '#FF16A4']" @click.native="join">{{buttonTitle}}</x-button>
    </div>

    <popup v-model="show" position="bottom">
      <div>
        <div style="padding:1rem 4rem;">
          <divider>分享到</divider>
        </div>
        <div class="invite">
          <div class="wechat">
            <img :src="wechat" width="100%" style="margin-bottom:0.5rem;" @click="wechatShare"> 微信
          </div>
          <div class="friend">
            <img :src="friend" width="100%" style="margin-bottom:0.5rem;" @click="circleShare"> 朋友圈
          </div>
        </div>
      </div>
    </popup>

    <popup v-model="show2" position="bottom">
      <div class="pay">
        <div class="">
          <p>当前最高价格:<span class="lip">{{topPrice || '暂无出价信息'}} 元</span></p>
          <p>竞拍加价价格:<span class="lip">{{commodity.raise_price}} 元</span></p>
        </div>
        <div class="flexBox">
          <x-button class="button" @click.native="show2 = false">取 消</x-button>
          <x-button class="button" @click.native="submit">支 付</x-button>
        </div>
      </div>
    </popup>

    <popup v-model="show3" position="bottom" should-scroll-top-on-show>
      <h4>竞拍规则</h4>
      <div style="padding: 15px;" v-html="rule"></div>
      <div style="padding: 15px;">
        <x-button @click.native="show3 = false" plain type="primary">关闭</x-button>
      </div>
    </popup>
  </div>

  <toast width="20rem" v-model="toast" type="text">{{toastText}}</toast>
  <loading :show="loading" :text="'参与竞拍'"></loading>
</div>
</template>

<script>
import {
  XHeader,
  XButton,
  Actionsheet,
  Popup,
  Divider,
  Group,
  Cell,
  Flexbox,
  FlexboxItem,
  Toast,
  Loading
} from 'vux'

import {
  jsonpReturn, //处理返回的数据
  checkRequest,
  formatDate
}
from '@/libs/util'

import {
  mapGetters
} from 'vuex'

import {
  ChangePassword, //发送短信验证码
  AuctionDetail,
  AuctionTop,
  AuctionStatus,
  AddAuction,
  UserInfoByAuctionId,
  RuleList
}
from '@/api/user'

import Commodity from "#/commodity";
import ActionBubble from "#/actionBubble";
import Step from "#/step";

export default {
  data() {
    return {
      id: null,
      swiper: 0,
      wechat: require('@/assets/wechat.svg'),
      friend: require('@/assets/friend.svg'),
      step: 0,
      show: false,
      show2: false,
      show3: false,
      toast: false,
      loading: false,
      userInfo: {},
      toastText: '',
      num: 1,
      commodity: {},
      type: '',
      imgList: [],
      time: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      timer: null, //时间计时器
      topTimer: null, // 最高价格计时器
      topPrice: null, // 最高价
      topName: '', // 最高竞拍者的名字
      goodStatus: '', //商品的状态
      rule: '', //后台设置的规则
      countDownTitle: '', // 倒计时标题
      buttonTitle: '', // 按钮标题
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
      'url'
    ])
  },
  components: {
    XHeader,
    Commodity,
    ActionBubble,
    Step,
    XButton,
    Actionsheet,
    Popup,
    Divider,
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    Toast,
    Loading
  },
  methods: {
    async init(id) { //数据初始化 各种计时器开始计时
      await AuctionDetail(id).then(res => {
        let data = checkRequest(res, false)
        console.log(data);
        this.commodity = data
        this.commodity.detail_img.forEach(item => {
          this.imgList.push('http://' + item)
        })
      })

      await UserInfoByAuctionId(this.token, id).then(res => {
        let data = checkRequest(res, false)
        this.userInfo = data
        console.log(this.userInfo, 'userInfo');
      })

      await AuctionStatus(id).then(res => {
        let data = checkRequest(res, false)
        this.goodStatus = data.type
        if (data.type == '未开始') {
          this.timeFun(this.commodity.end)
          this.checkStatus('距离竞拍开始', '未开始', 0)

        } else if (data.type == '进行中') {
          this.timeFun(this.commodity.end)
          let button = this.userInfo.auction ? '继续加价' : '立即参与竞拍'

          this.checkStatus('距离结束', button, 1)
        } else if (data.type == '竞价结束') {
          this.timeFun(this.commodity.end)
          this.checkStatus('竞价结束', '竞价结束', 2)

        } else if (data.type == '竞拍结束') {
          this.toast = true
          this.toastText = '该商品竞拍已结束!'
          this.checkStatus('竞拍结束', '竞拍结束', 3)
        } else {
          this.type = '已结束'
        }
        console.log('当前状态', this.goodStatus);

        if (this.goodStatus != '未开始') {
          this.getTop(id) //立即执行一次
          this.topTimer = setInterval(() => this.getTop(id), 5000)
        }
      })

      await RuleList().then(res => {
        let data = checkRequest(res, false)
        for (let i = 0; i < data.length; i++) {
          if (data[i].type == 2) {
            this.rule = data[i].rules
            break;
          }
        }
      })
    },
    timeFun(tim) {
      tim = tim.replace(/-/g, '/') //替换所有
      this.timer = setInterval(() => {
        let now = Date.parse(new Date()) / 1000
        let time = (Date.parse(tim) / 1000 - now) - 28800 - (5 * 60) //获取时间差 规定的结束时间 - 现在的时间 -八小时时间差 - 提前五分钟
        console.log();
        if (!(time + 28800)) this.checkStatus('竞价结束', '竞价结束', 2)
        let date = new Date(time * 1000)
        let a = date.getDate() < 10 ? '0' + date.getDate() - 1 : date.getDate() - 1;
        let b = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let c = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let d = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        this.time.a = a
        this.time.b = b
        this.time.c = c
        this.time.d = d
        console.log(a, b, c, d);
      }, 1000)
    },
    getTop(id) { // 获取最高价
      AuctionTop(id).then(res => {
        let data = checkRequest(res, false)
        console.log(data);
        if (data.maximum_bid) {
          this.topName = data.username
          this.topPrice = data.maximum_bid
        } else {
          this.topPrice = data
        }
      })
    },
    wechatShare() {
      alert("微信")
    },
    circleShare() {
      alert("朋友圈")
    },
    join() { //判断是否参加
      this.show2 = true
    },
    checkStatus(countDownTitle, buttonTitle, step) {
      this.countDownTitle = countDownTitle
      this.buttonTitle = buttonTitle
      this.step = step
    },
    submit() {
      if (this.token) {
        let price = this.topPrice > 0 ? Number(this.topPrice) + Number(this.commodity.raise_price) : Number(this.commodity.bottom_price)

        console.log(this.topPrice);
        console.log(price);
        console.log(this.commodity.bottom_price);
        this.loading = true
        AddAuction(this.token, this.commodity.id, price).then(res => {
          let data = checkRequest(res, false)
          if (data) {
            this.toast = true
            this.show2 = false
            if (this.timer || this.topTimer) {
              clearInterval(this.timer);
              clearInterval(this.topTimer);
            }
            this.init(this.id)
            this.loading = false
            this.toastText = '参与成功!'
          } else {
            this.toast = true
            this.toastText = '余额不足,请先充值!'
          }
          console.log(checkRequest(res, false));
        })
      } else {
        this.$router.push('login')
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.init(this.id)
  },
  beforeDestroy() {
    if (this.timer || this.topTimer) {
      clearInterval(this.timer);
      clearInterval(this.topTimer);
    }
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #f7f7f7;
    padding-bottom: 76px;
    .panel {
        background: white;
        .coverImg {
            img {
                width: 100%;
            }
        }
        .info {
            padding: 0 1rem;
            span:first-of-type {
                padding: 5px;
                border-radius: 5px;
                float: left;
                margin-right: 1rem;
            }

            span:last-of-type {
                background: #F1F1F1;
                color: #999999;
                font-size: 14px;
                padding: 5px 10px;
                border-radius: 30px;
                float: right;
            }
        }

        .info:after {
            content: '';
            display: block;
            clear: both;
        }

        .countDown {
            background: #FF16A4;
            color: white;
            padding: 10px 0;
            margin-bottom: 1rem;
            .count {
                margin-left: 1rem;
            }
            b {
                background: #FF79CB;
                border-radius: 2px;
                padding: 2px;
                margin: 0 2px;
                font-weight: lighter;
            }
        }

        .top {
            border: 1px solid rgba(255,22,164,1);
            padding: 10px;
            margin: 1rem 3rem;
            border-radius: 10rem;
            .name {
                font-size: 1.2rem;
            }

            .price {
                font-size: 1.4rem;
                color: #F71D27;
            }
        }

        .details {
            padding: 0 1rem;
            margin: 1rem 0;
            span {
                font-size: 12px;
            }
            span:first-of-type {
                background: rgba(251,246,234,1);
                color: #CFA33A;
                padding: 5px;
                border-radius: 5px;
                float: left;
            }

            span:n {
                margin-right: 1rem;
            }

            span {
                background: rgba(234,241,251,1);
                color: #5A95E8;
                padding: 5px;
                border-radius: 5px;
                float: left;
                margin-right: 0.5rem;
            }
        }

        .details:after {
            content: '';
            display: block;
            clear: both;
        }

        .step {
            margin: 1rem auto;
            text-align: left;
        }

        .rule {
            font-size: 12px;
            text-align: left;
            padding: 1rem;
            color: #A08194;
            background: #F7E4EF;
        }
        .buttonGroup {
            position: fixed;
            width: 100%;
            bottom: 0;
            padding: 1rem 0;
            background: white;
            .button {
                width: 90%;
            }
            .over {
                background: #ccc!important;
            }
        }

        .pay {
            padding: 2rem 0 0;
            .flexBox {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 2rem;
                border-top: 1px solid #ccc;
            }

            .button {
                background: transparent;
                border: 0 solid transparent;
            }
            .weui-btn:after {
                border: 1px solid rgba(0, 0, 0, 0);
            }
            span {
                font-size: 2rem;
            }
        }

        .vux-popup-dialog {
            background: white;
            .invite {
                height: 6rem;
                display: flex;
                justify-content: space-around;
                padding: 1rem;
                .friend,
                .wechat {
                    width: 4rem;
                    height: 4rem;

                }
            }
        }
    }
}

/deep/.vux-step-item-head-process .vux-step-item-head-inner {
    border: 1px solid #FF16A4;
    color: #FFF;
    background: #FF16A4;
}

.weui-btn + .weui-btn {
    margin-top: 0;
}
</style>
