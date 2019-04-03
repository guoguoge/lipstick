<template>
<div class="panel">
  <div class="text">
    <p class="head">夺宝</p>
    <p class="details">{{time}}</p>
  </div>
  <div class="text">
    <p class="head">充值成功</p>
    <p class="number"> +111 元</p>
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
        width: 15rem;
        margin: 0 0.5rem;
        .head {
            font-size: 18px;
            margin-bottom: 10px;
        }
        .details {
            color: #999;
        }
    }

    .text:last-of-type {
        width: 15rem;
        margin: 0 0.5rem;
        text-align: right;
        .head {
            font-size: 18px;
            text-align: inherit;
        }
        .number {
            text-align: inherit;
            color: #E4982B;
        }
    }
}
</style>
