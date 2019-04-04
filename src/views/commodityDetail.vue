<template>
<div class="userBox">
  <x-header ref="header" solt="header" title="夺宝详情"><a slot="right" @click="show3 = true">规则</a></x-header>
  <div class="panel" @click="link">
    <div class="">
      <img :src="img" width="100%">
    </div>
    <div class="countDown">
      <span>距离开始</span>
      <span><b>00</b> 时 <b>05</b> 分 <b>30</b> 秒</span>
    </div>
    <div class="info">
      <span>MAC笔记本电脑</span>
      <span @click="show = true">分享</span>
    </div>
    <div class="details">
      <span>参与人数：100000人</span>
      <span>参与价格：500元</span>
    </div>
    <div class="step">
      <step v-model="step" background-color='#fff' gutter="20px">
        <step-item :title="'开始夺宝'"></step-item>
        <step-item :title="'待开奖'"></step-item>
        <step-item :title="'开奖'"></step-item>
      </step>
    </div>
    <div class="rule">
      夺宝规则<br>1. 所有产品都是随机靠运气抽取，所有产品可支持专柜验货<br>2. 一个星期内可收到货
    </div>

    <div class="img">
      <img :src="details" width="100%" v-for="n in 3">
    </div>
    <div class="buttonGroup">
      <x-button class="button" :gradients="['#FF16A4', '#FF16A4']" @click.native="show2 = true">立即参与夺宝</x-button>
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
          参与价格:<span class="lip">500.0元</span>
        </div>
        <div class="flexBox">
          <x-button class="button">取 消</x-button>
          <x-button class="button">支 付</x-button>
        </div>
      </div>
    </popup>

    <popup v-model="show3" position="bottom" should-scroll-top-on-show>
      <group>
        <cell v-for="i in 15" :key="i" :title="'夺宝详情规则' + i"></cell>
      </group>
      <div style="padding: 15px;">
        <x-button @click.native="show3 = false" plain type="primary">关闭</x-button>
      </div>
    </popup>
  </div>
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
      time: (new Date()).toLocaleDateString(),
      img: require('@/assets/commodity.png'),
      details: require('@/assets/details.png'),
      wechat: require('@/assets/wechat.svg'),
      friend: require('@/assets/friend.svg'),
      step: 0,
      show: false,
      show2: false,
      show3: false,
      num: 1
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
  },
  methods: {
    link() {
      this.$router.push('commodityDetail')
    },
    wechatShare() {
      alert("微信")
    },
    circleShare() {
      alert("朋友圈")
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
                margin-right: 1rem;
            }

            span:last-of-type {
                background: rgba(234,241,251,1);
                color: #5A95E8;
                padding: 5px;
                border-radius: 5px;
                float: left;
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
