<template>
<div class="userBox">
  <group class="avatar">
    <cell :title="''" is-link @click.native.stop="openFile">
      <input ref="file" type="file" style="display: none" @change="fileChange()">
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
    <cell :title="'更改密码'" is-link link="changePassword">
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
  SetIcon
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
    openFile() {
      this.$refs.file.click();
    },
    fileChange() {
      console.log(this.$refs.file.files[0]);
      let file = this.$refs.file.files[0]
      let FD = new FormData()
      FD.append('token', this.token)
      FD.append('image', file)
      if (file.size > 30740) {
        this.toast = true
        this.toastText = '头像图片不能超过3M'
      } else {
        SetIcon(FD).then((res) => {
          this.toast = true
          this.toastText = checkRequest(res)
        })
      }
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
            width: 5rem;
            height: 5rem;
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
