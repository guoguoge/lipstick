<template>
<div class="userBox">
  <div class="withdrawal">
    <flexbox align="center" justify="center">
      <flexbox-item :span="1/5">
        充值金额
      </flexbox-item>
      <flexbox-item :span="2/5">
        <x-input class="input" title="" placeholder="输入金额" v-model="number"></x-input>
      </flexbox-item>
      <flexbox-item :span="1/5">
        元
      </flexbox-item>
    </flexbox>
  </div>
  <checklist title="选择提现账号" :max="1" label-position="left" required :options="commonList" v-model="check" @on-change="change"></checklist>
  <div class="buttonGroup">
    <x-button class="button" :gradients="['#FF16A4', '#FF16A4']">确 认 支 付</x-button>
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
  Checklist
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
      commonList: [{
          key: 1,
          value: '微信支付'
        },
        {
          key: 2,
          value: '支付宝支付'
        }
      ],
      check: [1],
      toastText: '', // 弹出框
      toast: false,
      number: null,
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
    Checklist
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
    ])
  },
  methods: {
    change(val, label) {
      console.log('change', val, label)
      if (!val.length) {
        this.check = [1]
      }
    },
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #f7f7f7;
    height: 90vh;
    .withdrawal {
        padding: 2rem 0;
        background: white;
        .input {
            background: rgba(255,248,252,1);
            border: 1px solid rgba(255,22,164,1);
            border-radius: 5px;
        }
    }
    .buttonGroup {
        position: fixed;
        width: 100%;
        bottom: 0;
        padding: 1rem 0;
        background: white;
        .button {
            width: 90%;
        }
    }
}

/deep/.weui-cells__title {
    text-align: left;
}
</style>
