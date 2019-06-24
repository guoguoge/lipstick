<template>
<div class="userBox">
  <div class="balance">
    <flexbox align="center" justify="center" orient="vertical">
      <flexbox-item :span="1/4">
        <flexbox class="top" align="center" justify="center">
          <flexbox-item>
            <div class="flexBox">
              余额 <b>{{balance}}</b> 元
            </div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item style="marginTop:2rem">
        <flexbox class="bottom" align="center" justify="center">
          <flexbox-item :span="1/4">
            <div class="flexBox">
              <x-button class="withdrawal" mini link="withdrawal">提 现</x-button>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flexBox">
              <x-button class="recharge" mini :link="`http://www.lingximan.com/Api/public/vendor/alipay/wappay/pay.php?user_id=${id}`">充 值</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
  </div>
  <Panel v-for="(item,index) in list" :item="item" />
  <div v-if="!list.length" class="padding-1">
    暂无充值记录1
  </div>
  <div class="">
    {{text}}
  </div>
  <div class="">
    openid: {{openid}}
  </div>
  <button type="button" name="button" @click="pay">支付</button>
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
  Cell
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
  GetBalance,
  GetPrepayId
}
from '@/api/user'

import Panel from '#/panel'

export default {
  data() {
    return {
      logo: require('@/assets/logo.png'),
      imgList: [
        require('@/assets/center1.png'),
        require('@/assets/center2.png'),
        require('@/assets/center3.png'),
        require('@/assets/center4.png'),
        require('@/assets/center5.png'),
        require('@/assets/center6.png'),
        require('@/assets/center7.png'),
        require('@/assets/center8.png')
      ],
      toastText: '', // 弹出框
      toast: false,
      balance: '',
      list: [],
      text: ''
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
    Panel
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
    init() {
      GetBalance(this.token).then((res) => {
        let data = checkRequest(res)
        if (data) {
          console.log(data);
          this.balance = data.balance
          this.list = data.deposit
        }
      })
    },
    pay() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
      } else {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": "wxb45d71fb16bfee05", //公众号名称，由商户传入
            "timeStamp": Date.parse(new Date()) / 1000, //时间戳，自1970年以来的秒数
            "nonceStr": "e61463f8efa94090b1f366cccfbbb444", //随机串
            "package": "prepay_id=wx2420140027884500b8354b7b1219926500",
            "signType": "MD5", //微信签名方式：
            "paySign": "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
          },
          function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            }
          });
      }
    }
  },
  mounted() {
    console.log(this.openid);
    // window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb45d71fb16bfee05&redirect_uri=http://www.lingximan.com/S_aution&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
    this.init()
    GetPrepayId('1', this.openid).then((res) => {
      this.text = res
    })
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #F7F7F7;
    .balance {
        background: linear-gradient(-90deg,rgba(255,22,164,1) 0%,rgba(255,108,198,1) 100%);
        padding: 2rem 0;
        .top {
            color: white;
            font-size: 12px;
            b {
                font-size: 2rem;
            }
        }
        .bottom {
            .withdrawal {
                color: white;
                background: transparent;
                border: 2px solid rgba(255,255,255,1);
            }

            .recharge {
                color: #FF16A4;
                border: 2px solid rgba(255,255,255,1);
            }

            .weui-btn:after {
                border: 1px solid rgba(0, 0, 0, 0);
            }
        }
        .flexBox {
            text-align: center;
        }
    }

    p {
        margin: 0;
        text-align: left;
    }

    img {
        display: block;
        margin-right: 1rem;
    }
}
</style>
