<template>
<div class="userBox">
  <Record :item="item" v-for="(item,index)  in  LipstickList" />
  <div v-if="!TreasureList.length" class="padding-1">
    暂无竞拍记录
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
  Cell
} from 'vux'

import {
  jsonpReturn, //处理返回的数据
  checkRequest,
  dateToTime
}
from '@/libs/util'

import {
  mapGetters
} from 'vuex'

import {
  SendMessage, //发送短信验证码
  Reset,
  ConsumeList
}
from '@/api/user'

import Record from "#/recordG";


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
      LipstickList: []
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
      ConsumeList(this.token).then(res => {
        console.log(res);
        let data = checkRequest(res, false)
        if (typeof data === 'object') {
          for (let i = 0; i < data.length; i++) {
            data[i].publishTimeNew = dateToTime(data[i].addtime);
          }
          data.sort((a, b) => {
            return b.publishTimeNew > a.publishTimeNew ? 1 : -1;
          })
          this.LipstickList = data
        }
      })
    },
    dateToTime(str) {
      return (new Date(str.replace(/-/g, '/'))).getTime(); //用/替换日期中的-是为了解决Safari的兼容
    },
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
