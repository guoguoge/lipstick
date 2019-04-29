<template>
<div class="recordBox">
  <div class="recordItem">
    <span>订单编号：{{item.order_id}}</span>
    <span class="lip">{{item.type}}</span>
  </div>
  <p class="lip" style="textAlign:right">状态:{{item.award || '未开奖'}} {{item.type == '竞拍结束' ? '退款:' + item.refundStatus  + `(${item.refund})元` :'' }}</p>
  <div class="recordItem bottom">
    <span>参与价格: {{item.bid_price}}元</span>
    <span>{{item.auction_time}}</span>
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
