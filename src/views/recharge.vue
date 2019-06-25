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
    <x-button class="button" :disabled="!number" :gradients="number?['#FF16A4', '#FF16A4']:['#d9d9d9', '#d9d9d9']" @click.native="pay">{{number?'确认支付':'请输入充值金额'}}</x-button>
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
      number: null
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
        GetPrepayId(Number(this.number) * 100, this.openid).then((res) => {
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
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                this.toast = true
                this.toastText = '支付成功'
              } else {
                this.toast = true
                this.toastText = '支付失败'
              }
            });
        })
      }
    },
    mounted() {
      console.log(this.openid);
      this.init()
    }
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
