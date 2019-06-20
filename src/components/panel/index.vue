<template>
  <div class="panel" v-if="item.status == 2">
    <div class="text">
      <p class="head">订单号:{{item.out_trade_no}}</p>
      <p class="details">时间:{{item.time}}</p>
    </div>
    <div class="text">
      <p class="head">{{item.status == 1?'处理中':'成功'}} </p>
      <p class="number"> +{{item.money}} 元</p>
    </div>
  </div>
</template>

<script>
import {
  XButton
} from 'vux'
export default {
  data() {
    return {
      time: (new Date()).toLocaleString()
    }
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
      handler(curVal, oldVal) {
        console.log(curVal, oldVal)
      },
      immediate: true
    }
  },
  components: {
    XButton,
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
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
          color:#25b864;
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
</style>
