<template>
<div class="userBox">

  <group>
    <cell :title="'支付宝'" is-link :value="address?'已绑定':'请绑定支付宝账号'" @click.native="show =true">
      <img slot="icon" width="20" height="20" :src="imgList[0]" />
    </cell>
    <cell :title="'微信'" is-link :value="'已绑定'">
      <img slot="icon" width="20" height="20" :src="imgList[1]" />
    </cell>
  </group>

  <toast width="20rem" v-model="toast" type="text">{{toastText}}</toast>
  <popup v-model="show" position="bottom">
    <div class="padding-1 bg-white">
      <p class="padding-1 text-center">{{address?'修改支付宝账号':'绑定支付宝账号'}}</p>
      <x-input ref="name" v-model="inputAddress" placeholder="请输入您的支付宝账号" :min="0" required></x-input>
      <x-button style="border-radius:99px;margin-top:2rem" :disabled="!inputAddress" :gradients="['#FF16A4', '#FF16A4']" @click.native="submit">绑 定</x-button>
    </div>
  </popup>
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
  Popup,
  Cell
} from 'vux'

import {
  jsonpReturn, //处理返回的数据
  checkRequest,
  special,
  validateName
}
from '@/libs/util'

import {
  mapGetters
} from 'vuex'

import {
  SendMessage, //发送短信验证码
  Reset,
  WithdrawBind,
  WithdrawAddress
}
from '@/api/user'

export default {
  data() {
    return {
      logo: require('@/assets/logo.png'),
      imgList: [
        require('@/assets/alipay.png'),
        require('@/assets/wechatpay.png'),
      ],
      toastText: '', // 弹出框
      toast: false,
      show: false,
      address: '', //原始支付宝地址
      inputAddress: ''
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
    Popup
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
    ])
  },
  methods: {
    submit() {
      // console.log(validateName(this.inputAddress),special(this.inputAddress));
      if (special(this.inputAddress) || validateName(this.inputAddress)) {
        this.toast = true
        this.toastText = '账号格式错误'
      } else {
        WithdrawBind(this.token, this.inputAddress).then((res) => {
          let result = checkRequest(res, false)
          if (result) {
            this.toast = true
            this.toastText = '支付宝账号设置成功'
            this.show = false
            this.init()
          }
        })
      }
    },
    init() {
      WithdrawAddress(this.token).then((res) => {
        let result = checkRequest(res, false)
        if (result) this.address = result.address
      })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #F7F7F7;
    .avatar {
        .avatarBox {
            display: flex;
            align-items: center;
            color: #333333;
        }
        .weui-cells {
            margin-top: 0;
            .weui-cell {
                padding: 2rem 1rem;
            }
        }
        img {
            border-radius: 100%;
            width: 4rem;
            height: 4rem;
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
