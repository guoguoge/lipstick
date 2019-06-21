<template>
<div class="userBox">
  <div class="balance">
    <flexbox align="center" justify="center" orient="vertical">
      <flexbox-item :span="1/4">
        <flexbox class="top" align="center" justify="center">
          <flexbox-item>
            <div class="flexBox">
              余额 <b>{{balance}}</b> 元
            </div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
      <flexbox-item style="marginTop:2rem">
        <flexbox class="bottom" align="center" justify="center">
          <flexbox-item :span="1/4">
            <div class="flexBox">
              <x-button class="withdrawal" mini link="withdrawal">提 现</x-button>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flexBox">
              <x-button class="recharge" mini :link="`http://www.lingximan.com/Api/public/vendor/alipay/wappay/pay.php?user_id=${id}`">充 值</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
  </div>
  <Panel v-for="(item,index) in list" :item="item" />
  <div v-if="!list.length" class="padding-1">
    暂无充值记录
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
  checkRequest
}
from '@/libs/util'

import {
  mapGetters
} from 'vuex'

import {
  GetBalance
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
      toast: false,
      balance: '',
      list: []
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
      'id'
    ])
  },
  methods: {
    init() {
      GetBalance(this.token).then((res) => {
        let data = checkRequest(res)
        if (data) {
          console.log(data);
          this.balance = data.balance
          this.list = data.deposit
        }
      })
    },
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.userBox {
    background: #F7F7F7;
    .balance {
        background: linear-gradient(-90deg,rgba(255,22,164,1) 0%,rgba(255,108,198,1) 100%);
        padding: 2rem 0;
        .top {
            color: white;
            font-size: 12px;
            b {
                font-size: 2rem;
            }
        }
        .bottom {
            .withdrawal {
                color: white;
                background: transparent;
                border: 2px solid rgba(255,255,255,1);
            }

            .recharge {
                color: #FF16A4;
                border: 2px solid rgba(255,255,255,1);
            }

            .weui-btn:after {
                border: 1px solid rgba(0, 0, 0, 0);
            }
        }
        .flexBox {
            text-align: center;
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
