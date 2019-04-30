<template>
<div class="marquee">
  <img :src="img" width="100%">
  <marquee>
    <marquee-item v-for="(item,index) in newList" :key="index" @click.native="onClick(i)" class="align-middle" v-html="item"></marquee-item>
  </marquee>
</div>
</template>

<script>
import {
  Marquee,
  MarqueeItem
} from 'vux'
export default {
  data() {
    return {
      img: require('@/assets/notice.png'),
    }
  },
  props: {
    newList: {
      type: [Array, Object],
      default: function() {
        return []
      }
    }
  },
  components: {
    Marquee,
    MarqueeItem
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.marquee {
    background: white;
    padding: 10px;
    position: relative;
    .align-middle {
        font-size: 12px;
    }
    /deep/b {
        color: #E91195;
    }
    img {
        width: 20px;
        height: 20px;
        position: absolute;
        bottom: 25%;
        left: 2rem;
    }
}
</style>
