<template>
<div class="recordBox">
  <div class="recordItem">
    <span>订单编号：{{item.order_id}}</span>
    <span class="lip">{{item.results | result}}</span>
  </div>
  <p style="textAlign:left">商品名:{{item.title}}</p>
  <div class="recordItem bottom">
    <span>参与价格: {{item.price}}元</span>
    <span>{{item.addtime}}</span>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      time: (new Date()).toLocaleString()
    }
  },
  filters: {
    result(val) {
      if (val == 1 || !val) {
        return "未中奖"
      } else if (val == 2) {
        return "中奖待发放"
      } else if (val == 3) {
        return "中奖已发放"
      } else {
        return "中奖不发放"
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      },
    }
  }
}
</script>

<style lang="less" scoped>
.recordBox {
    margin-top: 1rem;
    background: white;
    padding: 1rem;
    .recordItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 10px;
    }
    p {
        margin-bottom: 10px;
    }
    p.lip {
        font-size: 12px;
    }
    .bottom {
        color: #999;
    }
}
</style>
