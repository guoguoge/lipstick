<template>
<div class="userBox">
  <div class="panel" v-for="(item,index) in withdrawList" :key="index">
    <div class="text">
      <p class="head">实时提现:{{item.num}}</p>
      <p class="details">提现时间:{{item.time}}</p>
    </div>
    <div class="text">
      <p class="head">状态:{{item.status == 1?'未处理':item.status == 2?'已到账':'已被拒绝'}} </p>
      <p class="number"> 金额:{{item.num}} 元</p>
    </div>
  </div>
  <div v-if="!withdrawList.length" class="padding-1">
    暂无提现记录
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
  WithdrawAddress
}
from '@/api/user'

import Record from "#/recordA";

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
      withdrawList: []
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
      WithdrawAddress(this.token).then(res => {
        let data = checkRequest(res, false)
        if (typeof data === 'object') {
          this.withdrawList = data.withdraw_info
        }
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
    .panel {
        display: flex;
        align-items: center;
        padding: 1rem 0.5rem;
        background: white;
        justify-content: space-between;
        border-bottom: 1px solid #e1e1e1;
        .text {
            width: 20rem;
            margin: 0 0.5rem;
            .head {
                font-size: 14px;
                margin-bottom: 10px;
                text-align: left;
            }
            .details {
                color: #999;
                font-size: 14px;
                text-align: left;
            }
        }

        .text:last-of-type {
            width: 10rem;
            margin: 0 0.5rem;
            text-align: right;
            .head {
                color: #25b864;
                font-size: 14px;
                text-align: inherit;
            }
            .number {
                text-align: inherit;
                font-size: 14px;
                color: #E4982B;
            }
        }
    }
}
</style>
