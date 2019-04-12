<template>
  <iframe :src="linkUrl" width="100%" height="650"></iframe>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      url: 'http://129.28.67.91/mobile.php?s=/index/index/platid/'
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'id',
      'telphone',
      'token',
    ]),
    linkUrl() {
      return this.url + this.id + '.html'
    }
  },
  mounted() {
    console.log(this.linkUrl);
  }
}
</script>

<style lang="less" scoped>

</style>
