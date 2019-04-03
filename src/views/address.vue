<template>
<div class="userBox">
  <div class="recordBox" v-for="(item,index) in 8">
    <div class="recordItem">
      <div class="name">周杰伦</div>
      <div class="tel">155486261{{index + 10}}</div>
      <div class="default">默认</div>
    </div>
    <p>湖北省 武汉市 洪山区 光谷世贸中心光谷世贸中心</p>
  </div>
  <div class="addressButton">
    <x-button class="button" link="addAddress">+ 新 增 地 址</x-button>
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
  AddressList,
  SetAddress,
  DelAddress
}
from '@/api/user'

import Record from "#/record";


export default {
  data() {
    return {
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
    Record,
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

<style lang="less" scoped>
.userBox {
    background: #f7f7f7;
    .recordBox {
        margin-top: 1rem;
        background: white;
        padding: 1rem;
        .recordItem {
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            font-size: 14px;
            margin-bottom: 10px;
        }
        div {
            margin-right: 10px;
        }
        .name {
            font-size: 16px;
        }
        .tel {
            color: #999;
        }
        .default {
            color: white;
            padding: 5px 10px;
            border-radius: 2px;
            background: #44D258;
        }
        p {
            margin-bottom: 10px;
            font-size: 14px;
        }
        .bottom {
            color: #999;
        }
    }

    .addressButton {
        padding: 1rem;
        .button {
            background: transparent;
            color: #999;
        }
    }
}
</style>
