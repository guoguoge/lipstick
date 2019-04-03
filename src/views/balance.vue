<template>
<div class="userBox">
  <group class="avatar">
    <cell :title="''" is-link>
      <div class="avatarBox" slot="icon">
        <img :src="logo" width="100%" />
        <p>余额</p>
      </div>
    </cell>
  </group>
  <Panel v-for="(item,index) in 5" />
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

import Panel from '#/panel'

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
    Panel
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
