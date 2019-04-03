<template>
<section>
  <view-box :bodyPaddingTop="bodyPaddingTop" :bodyPaddingBottom="bodyPaddingBottom" ref="viewBox">
    <!-- <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header> -->
    <x-header ref="header" solt="header" v-if="header" :title="title"></x-header>
    <transition name="slide-fade" mode="out-in">
      <router-view :key="key" />
    </transition>
    <Footer class="bottom" ref="Footer" solt="bottom" v-if="tabber" :tab="tab"></Footer>
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
      route: '',
      tab: 0,
      title: '口红机',
      header: true,
      tabber: true,
      bodyPaddingTop: '',
      bodyPaddingBottom: '',

    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        console.log(val.meta);
        const Meta = val.meta
        this.title = Meta.title
        this.header = Meta.hiddenHeader ? false : true
        this.tabber = Meta.hiddenTab ? false : true
        this.route = val.name
      },
      deep: true,
      immediate: true
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
    this.bodyPaddingTop = this.$refs.header.$el.offsetHeight + 'px'
    this.bodyPaddingBottom = this.$refs.Footer.$el.offsetHeight + 'px'
    // this.bodyPaddingTop = this.$refs.header.clientWidth
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

.vux-header {
    border-bottom: 1px solid #eaeaea;
    width: 100%;
    z-index: 1000;
    position: fixed;
    top: 0;
}
</style>
