<template>
<section>
  <Header :route="route" />
  <transition name="fade">
    <router-view :key="key" />
  </transition>
  <Footer />
<!--   <FixedButton /> -->
</section>
</template>

<script>
// import Header from '#/front/header'
// import Footer from '#/front/footer'

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
    // Header,
    // Footer
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
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
