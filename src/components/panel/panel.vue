<template>
<div class="panel">
  <div class="img">
    <svg class="icon" aria-hidden="true" v-if="item">
      <use :xlink:href="item.iconfont"></use>
    </svg>
  </div>
  <div class="text">
    <p class="head">{{item.name}}</p>
    <p class="details">{{item.description}}</p>
  </div>
  <div class="btn">
    <x-button mini type="warn">报价</x-button>
  </div>
</div>
</template>

<script>
import {
  XButton
} from 'vux'
export default {
  data() {
    return {
    };
  },
  props: {
    item: {
      type: Object,
      default: {},
    }
  },
  watch: {
    item: {
      handler(curVal, oldVal) {　　　　　　　　　　　　
        console.log(curVal, oldVal)　　　　　　　　　　
      },
      immediate: true
    }
  },
  components: {
    XButton,
  },
  methods: {},
  mounted() {
    console.log(this.item);
  },
};
</script>

<style lang="less" scoped>
.panel {
    display: flex;
    align-items: center;
    padding: 1rem 0.5rem;
    background: white;
    justify-content: space-between;
    border-bottom: 1px solid #e1e1e1;
    .img {
        width: 4rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        .icon {
            width: 4rem;
            height: 4rem;
        }
    }
    .text {
        width: 15rem;
        text-align: left;
        margin: 0 0.5rem;
        .head {
            font-size: 18px;
        }
        .details {
            font-size: 12px;
            color: #999;
        }
    }
    .btn {
      width: 6rem;
    }
}
</style>
