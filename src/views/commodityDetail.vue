<template>
<div class="userBox">
  <x-header ref="header" solt="header" title="夺宝详情"><a slot="right" @click="show3 = true">规则</a></x-header>
  <div class="panel">
    <Bubble :mess="commodity.join_mess"></Bubble>
    <div class="coverImg">
      <img v-if="commodity.cover_img" :src="url + commodity.cover_img" width="100%">
      <img v-else :src="img" width="100%">
    </div>
    <div class="countDown">
      <span>{{countDownTitle}}</span>
      <span v-show="step !=3"><b>{{time.a || 0}}</b> 天<b>{{time.b || 0}}</b> 时 <b>{{time.c || 0}}</b> 分 <b>{{time.d || 0}}</b> 秒</span>
    </div>
    <div class="info">
      <span>商品名:{{commodity.name}}</span>
      <span @click="show = true">分享</span>
    </div>
    <div class="details">
      <span>参与人数：{{commodity.popular || 0}} 人</span>
      <span>参与价格：{{commodity.price || 0}} 元</span>
      <span>状态：{{type}}</span>
    </div>
    <div class="step">
      <Step :number="step" :status="1"></Step>
    </div>
    <div class="rule">
      夺宝规则<br>1. 所有产品都是随机靠运气抽取，所有产品可支持专柜验货<br>2. 一个星期内可收到货
    </div>

    <div class="img">
      <img :src="item" width="100%" v-for="(item,index) in imgList">
    </div>
    <div class="buttonGroup">
      <x-button :disabled="step !=1 || commodity.is_join == 1" :class="step!=1?'over':''" class="button" :gradients="['#FF16A4', '#FF16A4']" @click.native="join">{{buttonTitle}}</x-button>
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
      <h4>夺宝规则</h4>
      <div style="padding: 15px;" v-html="rule"></div>
      <div style="padding: 15px;">
        <x-button @click.native="show3 = false" plain type="primary">关闭</x-button>
      </div>
    </popup>
  </div>
  <toast width="20rem" v-model="toast" type="text">{{toastText}}</toast>
  <loading :show="loading" :text="'参与夺宝'"></loading>

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
  TreasureDetail,
  TreasureJoin,
  RuleList,
  TreasureFin
}
from '@/api/user'

import Commodity from "#/commodity";
import Bubble from "#/bubble";
import Step from "#/step";

export default {
  data() {
    return {
      id: null,
      swiper: 0,
      wechat: require('@/assets/wechat.svg'),
      friend: require('@/assets/friend.svg'),
      img: require('@/assets/noimg.png'),
      step: 0,
      show: false,
      show2: false,
      show3: false,
      toast: false,
      loading: false,
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
      rule: '',
      countDownTitle: '', // 倒计时标题
      buttonTitle: '' // 按钮标题
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
    Bubble,
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
    init(id) {
      TreasureDetail(this.token, id).then(res => {
        let data = checkRequest(res, false)
        this.commodity = data
        this.commodity.detail_img.forEach(item => {
          this.imgList.push(this.url + item)
        })
        if (data.type_id == 1) {
          this.type = '未开始'
          this.checkStatus('距离开始', '未开始', 0)
          this.timeFun(this.commodity.end)
        } else if (data.type_id == 2) {
          this.type = '进行中'
          this.step = 1
          let button = data.is_join == 1 ? '您已参与夺宝' : '立即参加'
          this.timeFun(this.commodity.end)
          this.checkStatus('距离结束', button, 1)

        } else if (data.type_id == 3) {
          this.type = '待开奖'
          this.checkStatus('距离开奖', '待开奖', 2)
        } else {
          TreasureFin(this.commodity.id).then(res => {
            let data = checkRequest(res, false)
            if (data) {
              this.checkStatus(`已开奖 中奖者:${data.name} ${this.telEncrypt(data.tel)}`, '已结束', 3)
            } else {
              this.checkStatus(`已开奖 中奖者:暂无中奖者信息`, '已结束', 3)
            }
            this.type = '已结束'
            console.log(data);
          })

        }
        console.log(this.type);
      })
      RuleList().then(res => {
        let data = checkRequest(res, false)
        for (let i = 0; i < data.length; i++) {
          if (data[i].type == 1) {
            this.rule = data[i].rules
            break;
          }
        }
      })
    },
    link() {
      this.$router.push('commodityDetail')
    },
    timeFun(tim) {
      tim = tim.replace(/-/g, '/') //替换所有
      this.timer = setInterval(() => {
        let now = Date.parse(new Date())
        let time = (Date.parse(tim) - now) - (8 * 60 * 60 * 1000)
        let date = new Date(time)
        let a = date.getDate() < 10 ? '0' + date.getDate() - 1 : date.getDate() - 1;
        let b = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let c = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let d = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
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
        this.toastText = '您已参与过该夺宝!'
      } else {
        this.show2 = true
      }
    },
    checkStatus(countDownTitle, buttonTitle, step) {
      this.countDownTitle = countDownTitle
      this.buttonTitle = buttonTitle
      this.step = step
    },
    telEncrypt: (tel) => {
      let arr = []
      tel.split('').forEach((item, index) => {
        if (index > 2 && 7 > index) {
          item = '*'
        }
        arr.push(item)
      })
      return arr.join('')
    },
    submit() {
      if (this.token) {
        this.loading = true

        TreasureJoin(this.token, this.id).then(res => {
          let data = checkRequest(res, false)
          if (data) { //参与 并初始化
            this.show2 = false
            if (this.timer) {
              clearInterval(this.timer);
            }
            this.toast = true
            this.toastText = '参与成功!'
            this.loading = false
            this.init(this.id)
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
            span {
                margin-right: 1rem;
                font-size: 14px;
            }
            b {
                background: #FF79CB;
                border-radius: 2px;
                padding: 2px;
                margin: 0 2px;
                font-weight: lighter;
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
