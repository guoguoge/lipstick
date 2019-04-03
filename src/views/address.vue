<template>
<div class="userBox">
  <swipeout>
    <swipeout-item :threshold=".5" underlay-color="#ccc" v-for="(item,index) in addressList">
      <div slot="right-menu">
        <swipeout-button background-color="#9C9C9C" @click.native="setAddress(item.id)">设为默认</swipeout-button>
        <swipeout-button background-color="#E42517" @click.native="delAddress(item.id)">删除</swipeout-button>
      </div>
      <div slot="content" class="demo-content vux-1px-tb">
        <div v-if="addressList.length" class="recordBox">
          <div class="recordItem">
            <div class="name">{{item.name}}</div>
            <div class="tel">{{item.tel}}</div>
            <div class="default" v-if="item.is_default == 1">默认</div>
          </div>
          <p style="textAlign:left">{{item.address}}</p>
        </div>
      </div>
    </swipeout-item>
  </swipeout>
  <div v-if="!addressList.length" class="empty">暂无收货地址<br>请尽快添加
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
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
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
      toast: false,
      addressList: []
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
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
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
      AddressList(this.token).then((res) => {
        let data = checkRequest(res)
        if (data) {
          this.addressList = data
          console.log(this.addressList);
        }
      })
    },
    setAddress(id) {
      SetAddress(this.token, id).then((res) => {
        let data = checkRequest(res)
        if (data) {
          this.toast = true
          this.toastText = data
          this.init()
        }
      })
    },
    delAddress(id) {
      DelAddress(this.token, id).then((res) => {
        let data = checkRequest(res)
        if (data) {
          this.toast = true
          this.toastText = data
          this.init()
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

    .empty {
        padding: 1rem;
        background: white;
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
