<template>
<div class="userBox">
  <div class="logo">
    <img :src="logo" width="100%">
  </div>

  <group class="input">
    <x-input ref="tel" type="text" v-model="form.tel" placeholder="手机号" required></x-input>
    <x-input ref="password" type="password" v-model="form.password" placeholder="请输入密码" required></x-input>
  </group>

  <div style="text-align:right;padding:0 1rem;">
    <p style="color:#FF16A4;" @click="link">忘记密码?</p>
  </div>

  <div class="buttonGroup">
    <x-button style="border-radius:99px;margin-top:1rem" :gradients="['#FF16A4', '#FF16A4']" @click.native="login">登 录</x-button>
    <x-button class="borderButton" style="border-radius:99px;" :link="{path:'register'}">注 册</x-button>
  </div>

  <div class="loginWay">
    <divider>第三方登录</divider>
    <flexbox justify="center">
      <flexbox-item :span="1/4">
        <div class="flexbox">
          <img :src="alipay" width="100%">
          <p class="explain">微信</p>
        </div>
      </flexbox-item>
      <flexbox-item :span="1/4">
        <div class="flexbox">
          <img :src="wechatpay" width="100%">
          <p class="explain">支付宝</p>
        </div>
      </flexbox-item>
    </flexbox>
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
  mapGetters
} from 'vuex'

import {
  Login, //用户--手机登录
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
        tel: '',
        password: ''
      },
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
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
    ])
  },
  methods: {
    link() {
      this.$router.push('password')
    },
    login() {
      let check = this.$refs.tel.valid && this.$refs.password.valid
      if (check) {
        this.$store.dispatch('LoginByUsername', this.form).then((res) => {
          console.log(this.token);
        })
      } else {
        this.toast = true
        this.toastText = '请确保表单信息正确'
      }
    }
  }
}
</script>

<style lang="less">
.userBox {
    padding: 1rem;
    .logo {
        width: 6rem;
        height: 6rem;
        margin: 1rem auto 2rem;
        border-radius: 1rem;
        overflow: hidden;
    }
    .input {}
    .buttonGroup {
        padding: 0 1rem;
        .borderButton {
            color: #FF16A4;
            background: white;
            border: 2px solid rgba(255,22,164,1);
        }
    }

    .loginWay {

        margin-top: 1rem;
        .flexbox {
            text-align: center;
            img {
                width: 2rem;
                height: 2rem;
            }
            .explain {
                color: #999999;
                font-size: 14px;
                margin: 0;
            }
        }
    }
}
</style>
