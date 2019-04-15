<template>
<div class="bubble">
  <span v-if="messList.length">用户【{{messList[bubbleIndex]}}】刚刚参与了该夺宝!</span>
  <span v-else>暂无用户参与夺宝!快来参加!</span>
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
      bubbleIndex: null,
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
      },
      deep: true,
      immediate: true
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
  mounted() {
    let num = this.mess.length
    console.log(num);
    this.timer = setInterval(() => {
      console.log(this.bubbleIndex);
      if (this.bubbleIndex == (num - 1)) {
        this.bubbleIndex = 0
      } else {
        this.bubbleIndex++
      }
    }, 3800)
  },
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
        opacity: 1;
    }
    to {
        top: 8%;
        opacity: 0;
    }
}
</style>
