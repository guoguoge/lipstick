<template>
<div class="panel" @click="link">
  <div class="coverImg">
    <img v-if="item.id" :src="url + item.cover_img">
    <img v-else :src="'http://'+ item.cover_img">
  </div>
  <div class="info">
    <span>商品名: {{item.name || item.goods_name}}</span>
    <span>{{item.type}}</span>
  </div>
  <div class="details">
    <span>参与人数：{{item.type == '未开始' ? 0:item.popular || item.hot || 0}}人</span>
    <span v-if="item.popular > 0 ||  item.popular == 0">参与价格：{{item.price}} 元</span>
    <span class="bottomPrice" v-else>最低出价：{{item.bottom_price}} 元</span>
  </div>
  <div class="time">
    <span>开始时间:{{item.start | timer}}</span>
    <span>结束时间:{{item.end | timer}}</span>
  </div>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import {
  XButton
} from 'vux'

import {
  linkBuy
} from '@/libs/util'

export default {
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      },
    }
  },
  watch: {
    item: {
      handler(curVal, oldVal) {},
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
      'url',
    ])
  },
  filters: {
    timer: function(value) {
      return value.substring(5, value.length)
    }
  },
  components: {
    XButton,
  },
  methods: {
    link() {
      linkBuy()
    }
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.panel {
    margin: 15px 5px;
    padding-bottom: 10px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 1px 8px #e6e6f1;
    overflow: hidden;
    .coverImg {
        background: #fff;
        padding: 1rem 0;
        img {
            width: 70%;
        }
    }
    .info {
        padding: 0 10px;
        span:first-of-type {
            padding: 5px 0;
            border-radius: 5px;
            float: left;
            margin-right: 1rem;
        }

        span:last-of-type {
            background: rgba(255,247,252,1);
            border: 1px solid rgba(233,17,149,1);
            color: #E91195;
            font-size: 14px;
            padding: 5px 15px;
            border-radius: 30px;
            float: right;
        }
    }

    .info:after {
        content: '';
        display: block;
        clear: both;
    }

    .details {
        padding: 0 10px;
        margin-top: 10px;
        span {
            font-size: 12px;
        }
        span:first-of-type {
            background: rgba(251,246,234,1);
            color: #CFA33A;
            padding: 4px;
            border-radius: 5px;
            float: left;
            margin-right: 5px;
        }

        span:last-of-type {
            background: rgba(234,241,251,1);
            color: #5A95E8;
            padding: 4px;
            border-radius: 5px;
            float: left;
        }
        span.bottomPrice {
            color: rgba(247,29,39,1);
            background: rgba(255,247,252,1);
            border-radius: 5px;
        }
    }

    .details:after {
        content: '';
        display: block;
        clear: both;
    }

    .time {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #666;
        margin-top: 10px;
        padding: 0 10px;
    }
}
</style>
