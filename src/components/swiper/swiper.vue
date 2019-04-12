<template>
  <div />
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后您就可以使用当前上下文内的swiper对象去做您想做的事了
    // console.log("this is current swiper instance object", this.swiper);
  }
};
</script>

<style lang="less" scoped>
</style>
