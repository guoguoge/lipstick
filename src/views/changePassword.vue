<template>
<div class="userBox">
  <group class="input">
    <x-input ref="old_password" type="password" v-model="form.old_password" :min="6" placeholder="旧密码" required></x-input>
    <x-input ref="password" type="password" v-model="form.password" :min="6" placeholder="新密码(至少6位数)" required></x-input>
    <x-input ref="confirm_password" type="password" v-model="form.confirm_password" placeholder="确认新密码(至少6位数)" required></x-input>
  </group>

  <div class="buttonGroup">
    <x-button style="border-radius:99px;margin-top:1rem" :gradients="['#FF16A4', '#FF16A4']" @click.native="submit">保 存</x-button>
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
  ChangePassword, //发送短信验证码
}
from '@/api/user'


export default {
  data() {
    return {
      form: {
        old_password: '',
        password: '',
        confirm_password: ''
      },
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
      let check = this.$refs.old_password.valid && this.$refs.password.valid
      if (check && this.form.password == this.form.confirm_password) {
        ChangePassword(
          this.telphone,
          this.form.old_password,
          this.form.password,
          this.form.confirm_password,
        ).then((res) => {
          if (checkRequest(res)) {
            this.toast = true
            this.toastText = checkRequest(res)
            setTimeout(() => {
              this.$router.push('center')
            }, 1000)
          } else {
            this.toast = true
            this.toastText = '原密码填写有误'
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
