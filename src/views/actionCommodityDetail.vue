<template>
<div class="userBox">
  <x-header ref="header" solt="header" title="竞拍详情"><a slot="right" @click="show3 = true">规则</a></x-header>
  <div class="panel">
    <div class="coverImg">
      <img :src="'http://'+ commodity.cover_img" width="100%">
    </div>

    <div class="countDown">
      <span>{{goodStatus.type}}</span>
      <span v-if="goodStatus.type == '进行中' "><b>{{time.a}}</b> 天<b>{{time.b}}</b> 时 <b>{{time.c}}</b> 分 <b>{{time.d}}</b> 秒</span>
    </div>
    <div v-if="topName" class="top">
      最高出价:<br><span class="name">姓名: {{topName || '暂无结果'}}</span><br>价格: <span class="price">{{topPrice}}</span>
    </div>
    <div v-else class="top">
      暂无结果
    </div>
    <div class="info">
      <span>{{commodity.name}}</span>
      <span @click="show = true">分享</span>
    </div>

    <div class="details">
      <span>参与人数：{{commodity.hot}} 人</span>
      <span>最低出价：{{commodity.bottom_price}} 元</span>
      <span>状态：{{goodStatus.type}}</span>
    </div>

    <div class="step">
      <step v-model="step" background-color='#fff' gutter="20px">
        <step-item :title="'开始竞拍'"></step-item>
        <step-item :title="'待开奖'"></step-item>
        <step-item :title="'开奖'"></step-item>
      </step>
    </div>

    <div class="rule">
      竞拍规则<br>1. 所有产品都是随机靠运气抽取，所有产品可支持专柜验货<br>2. 一个星期内可收到货
    </div>

    <div class="img">
      <img :src="item" width="100%" v-for="(item,index) in imgList">
    </div>
    <div class="buttonGroup">
      <!-- <x-button :disabled="commodity.type_id != 2" class="button" :gradients="['#FF16A4', '#FF16A4']" @click.native="join">{{commodity.type}}</x-button> -->
      <x-button class="button" :gradients="['#FF16A4', '#FF16A4']" @click.native="join">{{goodStatus.type}}</x-button>
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
          参与价格:<span class="lip">{{commodity.price}} 元</span>
        </div>
        <div class="flexBox">
          <x-button class="button" @click.native="show2 = false">取 消</x-button>
          <x-button class="button" @click.native="submit">支 付</x-button>
        </div>
      </div>
    </popup>

    <popup v-model="show3" position="bottom" should-scroll-top-on-show>
      <group>
        <cell v-for="i in 15" :key="i" :title="'竞拍详情规则' + i"></cell>
      </group>
      <div style="padding: 15px;">
        <x-button @click.native="show3 = false" plain type="primary">关闭</x-button>
      </div>
    </popup>
  </div>
  <toast width="20rem" v-model="toast" type="text">{{toastText}}</toast>

</div>
</template>

<script>
import {
  XHeader,
  Step,
  StepItem,
  XButton,
  Actionsheet,
  Popup,
  Divider,
  Group,
  Cell,
  Flexbox,
  FlexboxItem,
  Toast
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
  TreasureJoin,
  AuctionTop,
  AuctionStatus
}
from '@/api/user'

import Commodity from "#/commodity";


export default {
  data() {
    return {
      id: null,
      swiper: 0,
      time: (new Date()).toLocaleDateString(),
      img: require('@/assets/commodity.png'),
      details: require('@/assets/details.png'),
      wechat: require('@/assets/wechat.svg'),
      friend: require('@/assets/friend.svg'),
      step: 0,
      show: false,
      show2: false,
      show3: false,
      toast: false,
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
      timer: null,
      topPrice: null, // 最高价
      topName: '',
      goodStatus: ''
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
    Step,
    StepItem,
    XButton,
    Actionsheet,
    Popup,
    Divider,
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    Toast
  },
  methods: {
    init(id) {
      AuctionDetail(id).then(res => {
        let data = checkRequest(res, false)
        console.log(data);
        this.commodity = data
        this.commodity.detail_img.forEach(item => {
          this.imgList.push('http://' + item)
        })
        this.timeFun(this.commodity.end)
        // if (data.type_id == 1) {
        //   this.type = '未开始'
        //   this.timeFun(this.commodity.end)
        // } else if (data.type_id == 2) {
        //   this.type = '进行中'
        //   this.timeFun(this.commodity.end)
        // } else if (data.type_id == 3) {
        //   this.type = '待开奖'
        // } else {
        //   this.type = '已结束'
        // }
      })
      AuctionTop(id).then(res => {
        let data = checkRequest(res, false)
        if (data.maximum_bid) {
          this.topName = data.username
          this.topPrice = data.maximum_bid
        } else {
          this.topPrice = data
        }
      })
      AuctionStatus(id).then(res => {
        let data = checkRequest(res, false)
        this.goodStatus = data
      })
    },
    link() {
      this.$router.push('commodityDetail')
    },
    timeFun(tim) {
      console.log(123123);
      this.timer = setInterval(() => {
        let now = Date.parse(new Date())
        let time = (Date.parse(tim) - now)
        let a = new Date(time).getDay()
        let b = new Date(time).getHours()
        let c = new Date(time).getMinutes()
        let d = new Date(time).getSeconds()
        this.time.a = a
        this.time.b = b
        this.time.c = c
        this.time.d = d
      }, 1000)
    },
    wechatShare() {
      alert("微信")
    },
    circleShare() {
      alert("朋友圈")
    },
    join() {
      if (this.commodity.is_join == 1) {
        this.toast = true
        this.toastText = '您已参与过该活动!'
      } else {
        this.show2 = true
      }
    },
    submit() {
      if (this.token) {
        TreasureJoin(this.token, this.id).then(res => {
          let data = checkRequest(res, false)
          if (data) {
            this.toast = true
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
    console.log(this.$route.query.id);
    this.id = this.$route.query.id
    this.init(this.id)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #f7f7f7;
    .panel {
        padding: 10px 0;
        background: white;
        .coverImg {
            img {
                width: 10rem;
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
            span {
                margin-right: 1rem;
            }
            b {
                background: #FF79CB;
                border-radius: 4px;
                padding: 4px;
            }
        }

        .top {
            border: 1px solid rgba(255,22,164,1);
            padding: 1rem;
            margin: 1rem 3rem;
            border-radius: 10rem;
            .name {
                font-size: 1.4rem;
            }

            .price {
                font-size: 2rem;
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
            width: 90%;
            .vux-step-item-with-tail {
                display: flex;
                align-items: center;
                /deep/.vux-step-item-main {
                    margin-left: 5px;
                }
            }
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
        }

        .pay {
            padding: 4rem 0 0;
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
                font-size: 20px;
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
