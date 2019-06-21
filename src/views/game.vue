<template>
<iframe frameborder='0' :src="linkUrl" width="100%" :height="height"></iframe>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      url: 'http://www.lingximan.com/mobile.php?s=/index/index/platid/',
      height: '650'
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
    let navHeight = document.querySelector('.vux-header').clientHeight
    console.log(navHeight);
    // console.log(this.linkUrl);
    this.height = window.innerHeight - navHeight
    //   console.log(window.innerHeight);
  }
}
</script>

<style lang="less" scoped>

</style>
