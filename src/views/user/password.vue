<template>
<div class="userBox">

  <group class="input">
    <x-input title="" v-model="form.tel" placeholder="手机号" required></x-input>
    <x-input title="" v-model="form.tel_code" placeholder="请输入验证码" required>
      <x-button slot="right" type="primary" mini>发送验证码</x-button>
    </x-input>
    <x-input title="" v-model="form.password" placeholder="请输入密码" required></x-input>
  </group>

  <div class="buttonGroup">
    <x-button style="border-radius:99px;margin-top:1rem" :gradients="['#FF16A4', '#FF16A4']">完 成</x-button>
  </div>
</div>
</template>

<script>
import {
  Group,
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
      value: '',
      form: {
        tel: '',
        password: '',
        tel_code: '' //验证码
      }
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    Divider,
    Flexbox,
    FlexboxItem
  },
  methods: {
    link() {
      this.$router.push('password')
    }
  }
}
</script>

<style lang="less">
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
