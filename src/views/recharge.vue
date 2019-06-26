<template>
<div class="userBox">
  <div class="withdrawal">
    <flexbox align="center" justify="center">
      <flexbox-item :span="1/5">
        充值金额
      </flexbox-item>
      <flexbox-item :span="2/5">
        <x-input class="input" type="number" placeholder="输入金额" v-model="number"></x-input>
      </flexbox-item>
      <flexbox-item :span="1/5">
        元
      </flexbox-item>
    </flexbox>
  </div>
  <!-- <checklist title="选择提现账号" :max="1" label-position="left" required :options="commonList" v-model="check" @on-change="change"></checklist> -->
  <div class="buttonGroup">
    <x-button class="button" :disabled="!number || lock" :gradients="number?['#FF16A4', '#FF16A4']:['#d9d9d9', '#d9d9d9']" @click.native="click">{{number?'确认支付':'请输入充值金额'}}</x-button>
  </div>
  <toast width="20rem" v-model="toast" type="text">{{toastText}}</toast>
</div>
</template>

<script>
import {
  Group,
  XInput,
  XButton,
  Divider,
  Flexbox,
  FlexboxItem,
  Toast,
  Cell,
  Checklist
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
  SendMessage, //发送短信验证码
  Reset,
  GetPrepayId
}
from '@/api/user'

import wx from 'weixin-jsapi'


export default {
  data() {
    return {
      commonList: [{
          key: 1,
          value: '微信支付'
        },
        {
          key: 2,
          value: '支付宝支付'
        }
      ],
      check: [1],
      toastText: '', // 弹出框
      toast: false,
      number: null,
      lock: false
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    Divider,
    Flexbox,
    FlexboxItem,
    Toast,
    Cell,
    Checklist
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
      'id',
      'openid'
    ])
  },
  methods: {
    pay() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        this.lock = true
        GetPrepayId(Number(this.number) * 100, this.token, this.openid).then((res) => {
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              "appId": res.data.appId, //公众号名称，由商户传入
              "timeStamp": res.data.timeStamp, //时间戳，自1970年以来的秒数
              "nonceStr": res.data.nonceStr, //随机串
              "package": res.data.package,
              "signType": res.data.signType, //微信签名方式：
              "paySign": res.data.paySign //微信签名
            },
            function(res) {
              this.res = res
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                this.lock = false
                this.toast = true
                this.toastText = '支付成功'
              } else {
                this.lock = false
                this.toast = true
                this.toastText = '支付失败'
              }
            });
        })
      }
    },
    click() {
      this.lock = true
      GetPrepayId(Number(this.number) * 100, this.token, this.openid).then((res) => {
        let args = res.data
        wx.ready(function() {
          wx.chooseWXPay({
            timestamp: args.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: args.nonceStr, // 支付签名随机串，不长于 32 位
            package: args.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: args.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: args.paySign, // 支付签名
            success: function(res) {
              this.lock = false
              this.toast = true
              this.toastText = '支付成功'
            },
            cancel: function(res) {
              this.lock = false
              this.toast = true
              this.toastText = '已取消支付'
            },
            fail: function(res) {
              this.lock = false
              this.toast = true
              this.toastText = '购买失败，请重新创建订单'
            }
          });
        });
      })
    }
  },
  mounted() {
    console.log(this.openid);
    GetPrepayId(1, this.token, this.openid).then((res) => {
      let args = res.data
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: args.appId, // 必填，公众号的唯一标识
        timestamp: args.timestamp, // 必填，生成签名的时间戳
        nonceStr: args.nonceStr, // 必填，生成签名的随机串
        signature: args.signature, // 必填，签名，见附录1
        jsApiList: ['chooseWXPay']
      })
    })
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #f7f7f7;
    height: 90vh;
    .withdrawal {
        padding: 2rem 0;
        background: white;
        .input {
            background: rgba(255,248,252,1);
            border: 1px solid rgba(255,22,164,1);
            border-radius: 5px;
        }
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
}

/deep/.weui-cells__title {
    text-align: left;
}
</style>
