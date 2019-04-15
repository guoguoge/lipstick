<template>
<div class="bubble">
  <span v-if="messList.length">用户【{{messList[bubbleIndex].name}}】出价【{{messList[bubbleIndex].bid_price}}】元!</span>
  <span v-else>暂无用户参与竞拍!快来参加!</span>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import {
  XButton
} from 'vux'

export default {
  data() {
    return {
      timer: null,
      bubbleIndex: 0,
      messList: []
    }
  },
  props: {
    mess: {
      type: Array,
      default: function() {
        return []
      },
    }
  },
  watch: {
    mess: {
      handler(curVal, oldVal) {
        this.messList = curVal
        let num = this.messList.length
        this.timer = setInterval(() => {
          if (this.bubbleIndex == (num - 1)) {
            this.bubbleIndex = 0
          } else {
            this.bubbleIndex++
          }
        }, 4000)
      },
      deep: true
    },
    bubbleIndex: {
      handler(curVal, oldVal) {
        this.bubbleIndex = curVal
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'telphone',
      'token',
      'url',
    ])
  },

  components: {
    XButton,
  },
  methods: {

  },
  mounted() {},
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="less" scoped>
.bubble {
    position: fixed;
    left: 0;
    top: 8%;
    padding: 5px;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 12px;
    z-index: 100;
    color: white;
    background: rgba(255, 22, 164, 0.5);
    border-top: 1px solid rgba(255, 22, 164, 0.8);
    border-right: 1px solid rgba(255, 22, 164, 0.8);
    border-bottom: 1px solid rgba(255, 22, 164, 0.8);
    animation: move 4s infinite;
}

@keyframes move {
    from {
        top: 25%;
    }
    to {
        top: 8%;
    }
}
</style>
