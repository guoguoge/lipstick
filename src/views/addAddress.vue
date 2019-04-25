<template>
<div class="userBox">
  <group class="input">
    <x-input ref="name" type="text" v-model="form.name" is-type="china-name" placeholder="姓名" required></x-input>
    <x-input ref="tel" type="text" v-model="form.tel" is-type="china-mobile" placeholder="手机号" required></x-input>
    <x-address ref="city" :title="'所在地区'" v-model="form.city" :list="addressData" required></x-address>
    <x-input ref="address" type="text" v-model="form.address" placeholder="详细地址" required></x-input>
  </group>

  <div class="buttonGroup">
    <x-button style="border-radius:99px;margin-top:1rem" :gradients="['#FF16A4', '#FF16A4']" @click.native="submit">完 成</x-button>
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
  XAddress,
  Value2nameFilter as value2name
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
  ChangePassword, // 修改密码
  AddAddress
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
    getName(value) {
      return value2name(value, ChinaAddressV4Data)
    },
    submit() {
      let check = this.$refs.name.valid && this.$refs.tel.valid && this.form.city.length && this.$refs.address.valid
      let address = (this.getName(this.form.city).toString() + this.form.address).trim()
      if (check) {
        AddAddress(
          this.token,
          this.form.name,
          this.form.tel,
          address,
        ).then((res) => {
          this.toast = true
          this.toastText = checkRequest(res)
          if (checkRequest(res)) {
            this.$router.push('address')
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
    background: #f7f7f7;
    .buttonGroup {
        padding: 1rem;
    }
}
</style>
