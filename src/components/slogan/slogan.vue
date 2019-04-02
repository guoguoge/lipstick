<template>
<div class="slogan">
  <h2>智银家 <br/>创新分享赢未来 分享创富能出彩</h2>
  <p>商务合作热线: 400-816-5116</p>
  <p>版权所有 © 智贷科技 2019</p>
  <img :src="img" width="100%">
  <p>长按关注 智银家 公众号</p>
</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      img: require('@/assets/background/QRcode.jpg')
    };
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.slogan {
    padding: 2rem 1rem;
    font-size: 14px;
    color: #a9a9a9;
    img {
        width: 8rem;
        height: 8rem;
        margin: 1rem 0;
    }
    /*     .left {
    width: 60%;
    text-align: left;
    h1 {
        font-size: 12px;
        font-weight: 300;
        color: #000;
    }

    p {
        font-size: 12px;
        color: #a9a9a9;
        margin-top: 0.8rem;
    }
}
.right {
    width: 40%;
    img {
        width: 4rem;
        height: 4rem;
    }
    p {
        color: #a9a9a9;
        font-size: 12px;
    }
} */
}
</style>
