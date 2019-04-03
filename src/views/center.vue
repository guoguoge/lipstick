<template>
<div class="userBox">
  <group class="avatar">
    <cell :title="''" is-link>
      <div class="avatarBox" slot="icon">
        <img :src="logo" width="100%" />
        <p>{{username}}</p>
      </div>
    </cell>
  </group>
  <group>
    <cell :title="'余额'" is-link link="balance">
      <img slot="icon" width="20" height="20" :src="imgList[0]" />
    </cell>
  </group>

  <group>
    <cell :title="'夺宝记录'" is-link link="recordTreasure">
      <img slot="icon" width="20" height="20" :src="imgList[1]" />
    </cell>
    <cell :title="'竞拍记录'" is-link link="recordAuction">
      <img slot="icon" width="20" height="20" :src="imgList[2]" />
    </cell>
    <cell :title="'口红机记录'" is-link link="recordLipstick">
      <img slot="icon" width="20" height="20" :src="imgList[3]" />
    </cell>
  </group>
  <group>
    <cell :title="'账号绑定'" is-link link="binding">
      <img slot="icon" width="20" height="20" :src="imgList[4]" />
    </cell>
    <cell :title="'收货地址'" is-link link="address">
      <img slot="icon" width="20" height="20" :src="imgList[5]" />
    </cell>
    <cell :title="'更改密码'" is-link>
      <img slot="icon" width="20" height="20" :src="imgList[6]" />
    </cell>
  </group>
  <group>
    <cell :title="'退出账号'" is-link @click.native="show = true">
      <img slot="icon" width="20" height="20" :src="imgList[7]" />
    </cell>
  </group>

  <confirm v-model="show" title="确认退出?" @on-cancel="onCancel" @on-confirm="onConfirm">
    <p style="text-align:center;"></p>
  </confirm>

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
  Confirm
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
      imgList: [
        require('@/assets/center1.png'),
        require('@/assets/center2.png'),
        require('@/assets/center3.png'),
        require('@/assets/center4.png'),
        require('@/assets/center5.png'),
        require('@/assets/center6.png'),
        require('@/assets/center7.png'),
        require('@/assets/center8.png')
      ],
      toastText: '', // 弹出框
      toast: false,
      show: false
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
    Confirm
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
    ])
  },
  methods: {
    haha() {
      alert(1)
    },
    onCancel() {
      console.log('on cancel')
    },
    onConfirm(msg) {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #F7F7F7;
    .avatar {

        .avatarBox {
            display: flex;
            align-items: center;
            color: #333333;
        }
        .weui-cells {
            margin-top: 0;
            .weui-cell {
                padding: 2rem 1rem;
            }
        }
        img {
            border-radius: 100%;
            width: 4rem;
            height: 4rem;
        }
    }

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
