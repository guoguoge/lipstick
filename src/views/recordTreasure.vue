<template>
<div class="userBox">
  <Record :item="item" v-for="(item,index)  in  TreasureList" />
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
  Reset,
  TreasureRecord
}
from '@/api/user'

import Record from "#/record";


export default {
  data() {
    return {
      logo: require('@/assets/logo.png'),
      imgList: [
        require('@/assets/alipay.png'),
        require('@/assets/wechatpay.png'),
      ],
      toastText: '', // 弹出框
      toast: false,
      TreasureList: []
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
    Record
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
    ])
  },
  methods: {
    init() {
      TreasureRecord(this.token).then(res => {
        let data = checkRequest(res, false)
        this.TreasureList = data
        console.log(checkRequest(res, false));
      })
    }
  },
  mounted() {
    this.init()
  }

}
</script>

<style lang="less" scoped>
.userBox {
    background: #f7f7f7;
}
</style>
