<!-- 研发中组件化 -->
<template>
<div class="empty">
  <div class="emptyBox">
    <img :src="empty" width="100%">
    <h1>正在加速研发中...</h1>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      empty: require("@/assets/background/empty.svg")
    }
  }
}
</script>

<style scoped lang="less">
.empty {
    height: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .emptyBox {
        background: white;
        border-radius: 10px;
        padding: 1rem;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.1);
        img {
            width: 10rem;
            height: 10rem;
        }
        h1 {
            color: #0097e1;
            font-weight: normal;
        }
    }
}
</style>
