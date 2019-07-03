<template>
<div class="userBox">
  <div class="logo">
    <img :src="logo" width="100%">
  </div>

  <group class="input">
    <x-input ref="tel" type="text" v-model="form.tel" placeholder="手机号" required></x-input>
    <x-input ref="password" type="password" v-model="form.password" placeholder="请输入密码" required></x-input>
  </group>

  <div style="text-align:right;padding:1rem;">
    <p class="lip" style="textAlign:right" @click="link">忘记密码?</p>
  </div>

  <div class="buttonGroup">
    <x-button style="border-radius:99px;margin-top:1rem" :gradients="['#FF16A4', '#FF16A4']" @click.native="login">登 录</x-button>
    <x-button class="borderButton" style="border-radius:99px;" link="register">注 册</x-button>
  </div>

  <div class="loginWay">
    <divider>第三方登录</divider>
    <flexbox justify="center">
      <flexbox-item :span="1/4" v-if="type" @click.native="alipayLogin">
        <div class="flexbox">
          <img :src="alipay" width="100%">
          <p class="explain">支付宝</p>
        </div>
      </flexbox-item>
      <flexbox-item :span="1/4" v-else @click.native="weChatLogin">
        <div class="flexbox">
          <img :src="wechatpay" width="100%">
          <p class="explain">微信</p>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
  <div class="">
    {{userInfo.token}}
    {{userInfo.id}}
    {{userInfo.tel}}
    {{userInfo.name}}
    {{userInfo.icon}}
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
  GetSign
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
      toast: false,
      userInfo: {}
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
      'id',
      'telphone',
      'token',
    ]),
    type() {
      return typeof WeixinJSBridge == "undefined" //为true是其他平台 false是微信平台
    }
  },
  methods: {
    formatUrl(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      console.log(window.location.href);
      var r = window.location.href.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
      if (r != null) return unescape(r[2]);
      return null;
    },
    link() {
      this.$router.push('password')
    },
    login() {
      let check = this.$refs.tel.valid && this.$refs.password.valid
      if (check) {
        this.$store.dispatch('LoginByUsername', this.form).then((res) => {
          console.log(res);
          if (res) {
            this.toast = true
            this.toastText = '欢迎回来!'
            this.$router.push('center')
          } else {
            this.toast = true
            this.toastText = '账号或密码错误'
          }
        })
      } else {
        this.toast = true
        this.toastText = '请确保表单信息正确完整'
      }
    },
    alipayLogin() {
      let search = window.location.href
      const url_1 = 'alipays://platformapi/startapp?appId=20000067&url='
      const url_2 = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019060665506054&scope=auth_user&redirect_uri=http://www.lingximan.com/Api/public/vendor/ali_login/ali_login.php'
      const url_3 = search.includes('S_rouge') ? '&status=S_rouge' : (search.includes('&status=S_aution') ? '&status=S_aution' : '&status=S_treasure')
      let url = url_1 + encodeURIComponent(url_2 + url_3);
      console.log(url);
      window.location.href = url
    },
    weChatLogin() {
      // window.location.href = 'http://www.lingximan.com/Api/public/wxLogin/name/weixin'
      GetSign(0, this.token, this.openid, 1).then(res => {
        console.log(res);
      })
    }
  },
  mounted() {
    console.log(this.$route.query);
    let query = this.$route.query
    if (query.token) {
      let userInfo = {
        token: query.token,
        id: query.id,
        tel: query.tel,
        name: query.name,
        icon: query.icon,
      }
      this.$store.dispatch('LoginByAliPay', userInfo).then((res) => {
        console.log(res);
        if (res) {
          this.toast = true
          this.toastText = '支付宝登录成功!'
          this.$router.push('center')
        } else {
          this.toast = true
          this.toastText = '支付宝登录失败请重试'
        }
      })
      console.log(userInfo);
      this.userInfo = userInfo
    }
  }
}
</script>

<style lang="less" scoped>
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
            margin: 1rem;
            img {
                width: 2rem;
                height: 2rem;
            }
            .explain {
                color: #999999;
                font-size: 14px;
                margin-top: 0.5rem;
            }
        }
    }
}
</style>
