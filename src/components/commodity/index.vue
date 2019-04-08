<template>
<div class="panel" @click="link">
  <div class="coverImg">
    <img :src="url + item.cover_img" width="100%">
  </div>
  <div class="info">
    <span>{{item.name}}</span>
    <span>{{item.type}}</span>
  </div>
  <div class="details">
    <span>参与人数：{{item.popular}}人</span>
    <span>参与价格：{{item.price}} 元</span>
  </div>
  <div class="time">
    <span>开始时间{{item.start}}</span>
    <span>结束时间{{item.end}}</span>
  </div>
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
      time: (new Date()).toLocaleDateString(),
      img: require('@/assets/commodity.png')
    }
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      },
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
    link() {
      this.$router.push({
        path: 'commodityDetail',
        query: {
          id: this.item.id
        }
      })
    }
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.panel {
    margin: 10px;
    padding: 10px 0;
    background: white;
    .coverImg {
        img {
            width: 10rem;
        }
    }
    .info {
        padding: 0 1rem;
        span:first-of-type {
            padding: 5px;
            border-radius: 5px;
            float: left;
            margin-right: 1rem;
        }

        span:last-of-type {
            background: rgba(255,247,252,1);
            border: 1px solid rgba(233,17,149,1);
            color: #E91195;
            font-size: 14px;
            padding: 5px 10px;
            border-radius: 30px;
            float: right;
        }
    }

    .info:after {
        content: '';
        display: block;
        clear: both;
    }

    .details {
        padding: 0 1rem;
        margin-top: 10px;
        span {
            font-size: 12px;
        }
        span:first-of-type {
            background: rgba(251,246,234,1);
            color: #CFA33A;
            padding: 5px;
            border-radius: 5px;
            float: left;
            margin-right: 1rem;
        }

        span:last-of-type {
            background: rgba(234,241,251,1);
            color: #5A95E8;
            padding: 5px;
            border-radius: 5px;
            float: left;
        }
    }

    .details:after {
        content: '';
        display: block;
        clear: both;
    }

    .time {
        font-size: 12px;
        color: #999999;
        text-align: left;
        padding: 0 1rem;
        margin-top: 10px;
    }
}
</style>
