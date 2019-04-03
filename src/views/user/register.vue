<template>
<div class="userBox">

  <group class="input">
    <x-input ref="tel" v-model="form.tel" placeholder="手机号" is-type="china-mobile" required></x-input>
    <x-input ref="tel_code" v-model="form.tel_code" placeholder="请输入验证码" :min="6" :max="6" required>
      <x-button @click.native="countDown(60)" :disabled="interval" slot="right" type="primary" mini>{{interval?intervalTime +'秒':'发送验证码'}}</x-button>
    </x-input>
    <x-input ref="name" v-model="form.name" placeholder="请输入昵称(2-7位)" :min="2" required></x-input>
    <x-input ref="password" type="password" v-model="form.password" placeholder="请输入密码(至少6位数)" :min="6" required></x-input>
  </group>

  <div class="buttonGroup">
    <x-button style="border-radius:99px;margin-top:1rem" :gradients="['#FF16A4', '#FF16A4']" @click.native="submit">完 成</x-button>
  </div>
  <div style="text-align:center;padding:0 1rem;">
    <p style="color:#FF16A4;" @click="link">已有账号登录</p>
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
  Toast
} from 'vux'

import {
  jsonpReturn, //处理返回的数据
  checkRequest
}
from '@/libs/util'

import {
  SendMessage, //发送短信验证码
  Register
}
from '@/api/user'

export default {
  data() {
    return {
      logo: require('@/assets/logo.png'),
      alipay: require('@/assets/alipay.png'),
      wechatpay: require('@/assets/wechatpay.png'),
      value: '',
      form: {
        name: '',
        tel: '',
        password: '',
        tel_code: '', //验证码
      },
      intervalTime: 60, //计时器倒计时时间
      interval: false, //计时器开启
      toastText: '', // 弹出框
      toast: false
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    Divider,
    Flexbox,
    FlexboxItem,
    Toast
  },
  methods: {
    link() {
      this.$router.push('login')
    },
    countDown(time) {
      let check = this.$refs.tel.valid
      console.log(check);
      if (check) {
        this.interval = true
        SendMessage(this.form.tel).then((res) => {
          if (checkRequest(res, false)) {
            this.countDownInterval() //发送验证码
          }
        })
      } else {
        this.toast = true
        this.toastText = '请填写正确手机号'
      }
    },
    countDownInterval() { //发送验证码
      const Int = setInterval(() => {
        this.intervalTime--
        if (this.intervalTime == 0) {
          clearInterval(Int)
          this.interval = false
          this.intervalTime = 60
        }
      }, 1000)
    },
    submit() { //手机注册
      let check = this.$refs.name.valid && this.$refs.tel.valid && this.$refs.tel_code.valid && this.$refs.password.valid
      console.log(check);
      if (check) {
        Register(
          this.form.name,
          this.form.tel,
          this.form.tel_code,
          this.form.password,
        ).then((res) => {
          this.toast = true
          this.toastText = checkRequest(res)
          if (checkRequest(res)) {
            this.$router.push('login')
          }
        })
      } else {
        this.toast = true
        this.toastText = '请确保表单信息正确'
      }

    }
  }
}
</script>

<style lang="less" scoped>
.userBox {
    padding: 1rem;
    .buttonGroup {
        padding: 1rem;
        .borderButton {
            color: #FF16A4;
            background: white;
            border: 2px solid rgba(255,22,164,1);
        }
    }
}
</style>
