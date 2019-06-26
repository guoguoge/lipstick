<template>
<div class="userBox">
  <div class="withdrawal">
    <flexbox align="center" justify="center">
      <flexbox-item :span="1/5">
        提现金额
      </flexbox-item>
      <flexbox-item :span="2/5">
        <x-input class="input" type="number" :placeholder="`余额:${balance}元`" v-model="number" @on-blur="inputBlur"></x-input>
      </flexbox-item>
      <flexbox-item :span="1/5">
        元
      </flexbox-item>
    </flexbox>
  </div>
  <group>
    <cell :title="'支付宝账号'" is-link :value="address?'已绑定':'前往绑定支付宝账号'" @click.native="link">
    </cell>
    <cell :title="'提现记录'" is-link :value="'查看'" @click.native="withdraw">
    </cell>
  </group>
  <div class="buttonGroup">
    <x-button class="button" :disabled="!number || !address.length" :gradients="['#FF16A4', '#FF16A4']" @click.native="submit">提 现</x-button>
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
  WithdrawAddress,
  GetBalance,
  Withdraw
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
      imgList: [
        require('@/assets/alipay.png'),
        require('@/assets/wechatpay.png'),
      ],
      balance: 0, //用户余额
      toastText: '', // 弹出框
      toast: false,
      number: null,
      address: ''
    }
  },
  watch: {
    number: {
      handler(val) {
        console.log(val);
      },
      deep: true
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
    ])
  },
  methods: {
    change(val, label) {
      console.log('change', val, label)
      if (!val.length) {
        this.check = [1]
      }
    },
    init() {
      this.balance = []
      this.number = ''
      WithdrawAddress(this.token).then((res) => {
        let result = checkRequest(res, false)
        if (result) this.address = result.address
      })
      GetBalance(this.token).then((res) => {
        let data = checkRequest(res)
        if (data) {
          this.balance = data.balance
        }
      })
    },
    link() {
      if (this.address) {
        this.toast = true
        this.toastText = '您已绑定支付宝账号'
      } else {
        this.$router.push('binding')
      }
    },
    withdraw() {
      this.$router.push('recordWithdraw')
    },
    inputBlur() {
      console.log(this.number);
      if (this.number > this.balance) {
        this.number = 0
        this.toast = true
        this.toastText = '提现金额超出余额'
      }
    },
    submit() {
      Withdraw(this.token, this.number).then((res) => {
        let result = checkRequest(res, false)
        if (result) {
          this.toast = true
          this.toastText = '成功提现 请等待转账'
          this.init()
        } else {
          this.toast = true
          this.toastText = '成功失败 请重试'
        }
      })
    }
  },
  created() {
    this.init()
  },
  mounted() {}
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
