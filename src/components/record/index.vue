<template>
<div class="recordBox">
  <div class="recordItem">
    <span>订单编号：{{item.order_id}}</span>
    <span class="lip">竞拍中</span>
  </div>
  <p style="textAlign:left">{{item.name}}</p>
  <div class="recordItem bottom">
    <span>竞拍出价: {{item.price}}元</span>
    <span>{{item.time}}</span>
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
  },
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
    .bottom {
        color: #999;
    }
}
</style>
