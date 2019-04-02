<template>
<section>
  <view-box ref="viewBox">
    <!-- <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header> -->
    <x-header title="口红机"></x-header>
    <router-view :key="key" />
    <Footer :tab="tab"></Footer>
  </view-box>
</section>
</template>

<script>
import {
  ViewBox,
  XHeader
} from 'vux'

import Footer from "#/footer";

export default {
  data() {
    return {
      route: ''
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.route = val.name
      },
      deep: true
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  components: {
    ViewBox,
    XHeader,
    Footer
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
body,
html {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
/* .slide-fade-leave-active for below version 2.1.8 */
.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateY(100%);
}
</style>
