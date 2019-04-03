<template>
<div class="userBox">
  <div class="avatar">
    头像
  </div>
  <group>
    <cell :title="'余额'" is-link></cell>
  </group>

  <group>
    <cell :title="'夺宝记录'" is-link>
      <img slot="icon" width="20" height="18" :src="logo" />
    </cell>
    <cell :title="'竞拍记录'" is-link>
      <img slot="icon" width="20" height="18" :src="logo" />
    </cell>
    <cell :title="'口红机记录'" is-link>
      <img slot="icon" width="20" height="18" :src="logo" />
    </cell>
  </group>
  <group>
    <cell :title="'账号绑定'" is-link>
      <img slot="icon" width="20" height="18" :src="logo" />
    </cell>
    <cell :title="'收货地址'" is-link>
      <img slot="icon" width="20" height="18" :src="logo" />
    </cell>
    <cell :title="'更改密码'" is-link>
      <img slot="icon" width="20" height="18" :src="logo" />
    </cell>
  </group>
  <group>
    <cell :title="'退出账号'" is-link>
      <img slot="icon" width="20" height="18" :src="logo" />
    </cell>
  </group>
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
  Cell
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
      logo: require('@/assets/logo.png'),
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
    Cell
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
    ])
  },
  methods: {

  }
}
</script>

<style lang="less">
.userBox {
    p {
        margin: 0;
        text-align: left;
    }

    img {
        display: block;
        margin-right: 1rem;
    }
}
</style>
