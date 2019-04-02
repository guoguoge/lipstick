<template>
<div class="banner" @click="click">
  <div class="vip">
    <img src="../../assets/icon/vip.png">
  </div>
  <div class="text">
    <b>成为创客</b><br>获取返佣奖励特权 更多优质服务 >
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    click() {
      this.$router.push({
        name: 'membership'
      })
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.banner {
    height: 6rem;
    display: flex;
    font-size: 13px;
    align-items: center;
    justify-content: center;
    background: #fceabb;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #ffde87, #fceabb);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #ffde87, #fceabb);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    margin: 1rem 0.5rem;
    border-radius: 5px;
    // border: 1px solid #e9c06f;
    .vip {
        padding: 0.5rem;
        margin-right: 1rem;
        background: #fceabb;
        /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #ffde87, #fceabb);
        /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #ffde87, #fceabb);
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        border-radius: 3rem;
        border: 1.5px solid #CCA558;
        img {
            height: 3rem;
            width: 3rem;
        }
    }
    .text {
        text-align: left;
        font-size: 14px;
        color: #b97927;
        b {
            font-size: 16px;
            font-weight: 900;
        }
    }
}
</style>
