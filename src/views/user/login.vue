<template>
<div class="userBox">
  <div class="logo">
    <img :src="logo" width="100%">
  </div>
  <div class="input">
    <x-input title="" type="text" v-model="form.tel" placeholder="手机号"></x-input>
    <x-input title="" type="text" v-model="form.password" placeholder="请输入密码"></x-input>
    <x-button style="border-radius:99px;margin-top:1rem" :gradients="['#FF16A4', '#FF16A4']">登 录</x-button>
    <x-button style="border-radius:99px;" :gradients="['#1D62F0', '#19D5FD']" :link="{path:'register'}">注 册</x-button>
  </div>
</div>
</template>

<script>
import {
  XInput,
  XButton
} from 'vux'

export default {
  data() {
    return {
      logo: require('@/assets/logo.png'),
      form: {
        tel: '',
        password: ''
      }
    }
  },
  components: {
    XInput,
    XButton
  }
}
</script>

<style lang="less">
.userBox {
    padding: 1rem;
    .logo {
        width: 5rem;
        height: 5rem;
        margin: 1rem auto;
        border-radius: 1rem;
        overflow: hidden;
    }

}
</style>
