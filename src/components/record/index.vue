<template>
<div class="recordBox">
  <div class="recordItem">
    <span>订单编号：596546161616546165</span>
    <span class="lip">竞拍中</span>
  </div>
  <p style="textAlign:left">抢电商专属礼包+全屋</p>
  <div class="recordItem bottom">
    <span>竞拍出价: 119.9元</span>
    <span>{{time}}</span>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      time: (new Date()).toLocaleString()
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
    .bottom {
        color: #999;
    }
}
</style>
