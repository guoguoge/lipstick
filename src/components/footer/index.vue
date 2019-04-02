<template>
<div>
  <tabbar v-model="tabbar">
    <tabbar-item link="/">
      <img slot="icon" :src="imgUrl.img1" />
      <img slot="icon-active" :src="imgUrl.img2" />
      <span slot="label"> 智银家 </span>
    </tabbar-item>
    <tabbar-item show-dot>
      <img slot="icon" :src="imgUrl.img3" />
      <img slot="icon-active" :src="imgUrl.img4" />
      <span slot="label"> 推广产品 </span>
    </tabbar-item>
    <tabbar-item>
      <img slot="icon" :src="imgUrl.img5" />
      <img slot="icon-active" :src="imgUrl.img6" />
      <span slot="label"> 个人中心 </span>
    </tabbar-item>
  </tabbar>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

import {
  Tabbar,
  TabbarItem
} from "vux";

import Cookies from "js-cookie";
import config from "@/config";

export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      tabbar: 2,
      imgUrl: {
        img1: require("../../assets/tab01.png"),
        img2: require("../../assets/tab01active.png"),
        img3: require("../../assets/tab02.png"),
        img4: require("../../assets/tab02active.png"),
        img5: require("../../assets/tab03.png"),
        img6: require("../../assets/tab03active.png"),
        img7: require("../../assets/tab04.png"),
        img8: require("../../assets/tab04active.png"),
      }
    };
  },
  // computed: {
  //   ...mapGetters([
  //     'tab'
  //   ])
  // },
  props: {
    tab: {
      type: Number,
      default: 0
    }
  },
  watch: {
    tab: {
      handler(val) {
        console.log(val);
        this.tabbar = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    clickPromote() {
      this.$router.push('promote')
    },
    clickProfile() {
      this.$router.push('profile')
    }
    // click(num) {
    //   this.$store.dispatch('ChangeTab', num)
    //   console.log(this.tab);
    // }
  },
  mounted() {
    // console.log(this.tab);
  },
}
</script>

<style lang="less" scoped>
.weui-tabbar {
    background: white;
    transition: all 0.3s;
    -moz-transition: all 0.3s;
    /* Firefox 4 */
    -webkit-transition: all 0.3s;
    /* Safari 和 Chrome */
    -o-transition: all 0.3s;
    /* Opera */
    boottom: 0;
    position: fixed;

    .weui-tabbar__item {
        padding: 8px 0 2px;
        /deep/.weui-tabbar__icon {
            width: 24px;
            height: 24px;
        }
        /deep/.weui-tabbar__label {
            margin-top: 2px;
        }
    }

    .active {
        span {
            color: #0098e1;
            font-weight: 900;
        }
    }
}

/deep/.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label span {
    color: #0097e1;
}
</style>
