<template>
<div class="panel">
  <div class="img">
    <svg class="icon" aria-hidden="true" v-if="item">
      <use :xlink:href="item.src"></use>
    </svg>
  </div>

  <div class="text">
    <p class="head">{{item.title}}</p>
    <p class="secondary" v-html="item.desc"></p>
    <p class="details" v-html="item.secondary"></p>
  </div>

  <div class="btn">
    <x-button mini type="warn" @click.native="click(item)" :gradients="buttonColor">详情</x-button>
  </div>
</div>
</template>

<script>
import {
  XButton
} from 'vux'
export default {
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    buttonColor: {
      type: Array,
      dafault: []
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
  methods: {
    click(item) {
      this.$router.push({
        name: 'pledge_detail',
        params: {
          data: item,
          type: this.$route.name
        }
      })
    }
  },
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
        margin-right: 0.5rem;
        .icon {
            width: 4rem;
            height: 4rem;
        }
    }
    .text {
        width: 15rem;
        text-align: left;
        margin: 0 0.5rem;
        font-size: 12px;
        .head {
            font-size: 18px;
        }
        /deep/.secondary {
            font-size: 12px;
            span {
                color: red;
            }
        }
        /deep/.details {
            font-size: 12px;
            color: #b1b1b1;
            span {
                color: red;
            }
        }

    }
    .btn {
        width: 6rem;
    }
}
</style>
