<template>
<div class="userBox">
  <group class="input">
    <x-input ref="tel" type="text" v-model="form.name" placeholder="姓名" required></x-input>
    <x-input ref="password" type="password" v-model="form.tel" placeholder="手机号" required></x-input>
    <group>
      <group>
        <x-address title="title" v-model="value"></x-address>
      </group>
    </group>
    <x-input ref="password" type="password" v-model="form.address" placeholder="详细地址" required></x-input>
  </group>


  <div class="buttonGroup">
    <x-button style="border-radius:99px;margin-top:1rem" :gradients="['#FF16A4', '#FF16A4']" @click.native="login">登 录</x-button>
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
  ChinaAddressV4Data,
XAddress
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
  Reset
}
from '@/api/user'


export default {
  data() {
    return {
      form: {
        name: '',
        tel: '',
        address: '',
        city: []
      },
      addressData: ChinaAddressV4Data,
      showAddress: false,
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
    Toast,
    Cell,
    XAddress
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
    ])
  },
  methods: {
    // onShadowChange(ids, names) {
    //   console.log(ids, names)
    // },
    // getName(value) {
    //   return value2name(value, ChinaAddressV4Data)
    // },
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #f7f7f7;
    .buttonGroup {
        padding: 1rem;
    }
}
</style>
