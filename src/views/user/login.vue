<template>
<div class="userBox">
  <div class="logo">
    <img :src="logo" width="100%">
  </div>
  <div class="input">
    <x-input title="" type="text" v-model="form.tel" placeholder="手机号"></x-input>
    <x-input title="" type="text" v-model="form.password" placeholder="请输入密码"></x-input>
  </div>

  <div class="buttonGroup">
    <x-button style="border-radius:99px;margin-top:1rem" :gradients="['#FF16A4', '#FF16A4']">登 录</x-button>
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
</div>
</template>

<script>
import {
  XInput,
  XButton,
  Divider,
  Flexbox,
  FlexboxItem
} from 'vux'

export default {
  data() {
    return {
      logo: require('@/assets/logo.png'),
      alipay: require('@/assets/alipay.png'),
      wechatpay: require('@/assets/wechatpay.png'),
      form: {
        tel: '',
        password: ''
      }
    }
  },
  components: {
    XInput,
    XButton,
    Divider,
    Flexbox,
    FlexboxItem
  }
}
</script>

<style lang="less">
.userBox {
    padding: 1rem;
    .logo {
        width: 5rem;
        height: 5rem;
        margin: 2rem auto;
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

        margin-top: 2rem;
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
