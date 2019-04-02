<template>
<div class="income">
  <div class="swiper">
    <swiper :options="swiperOption">
      <swiper-slide class="stop-swiping" v-for="(item,index) in marquee" :key="index">
        <!-- <div class="avatar">
          <img :src="avatars[Math.floor(Math.random()*10)]" width="100%">
        </div> -->
        <div class="swiperItem">
          <!-- <p class="bottom">
            <span class="time">{{item.user}}</span>
            <span class="number">{{parseInt(((Math.random())*6800))}}元</span>
          </p> -->
          <p class="top">{{item.user}} <span v-html="item.text"></span> </p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</div>
</template>

<script>
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'

import {
  Group,
  Cell,
  Marquee,
  MarqueeItem,
} from "vux";
export default {
  components: {
    Group,
    Cell,
    Marquee,
    MarqueeItem,
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: { //swiper3
        autoplay: {
          delay: 0,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        freeMode: true,
        noSwiping: true,
        noSwipingClass: 'stop-swiping',
        speed: 1200,
        loop: true,
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      avatars: [
        require("@/assets/icon/avatar.jpg"),
        require("@/assets/icon/avatar1.jpg"),
        require("@/assets/icon/avatar2.jpg"),
        require("@/assets/icon/avatar3.jpg"),
        require("@/assets/icon/avatar4.jpg"),
        require("@/assets/icon/avatar5.jpg"),
        require("@/assets/icon/avatar6.jpg"),
        require("@/assets/icon/avatar4.jpg"),
        require("@/assets/icon/avatar3.jpg"),
        require("@/assets/icon/avatar2.jpg"),
      ]
    }
  },
  props: {
    marquee: {
      type: Array,
      default: []
    }
  },
  mounted() {
    // console.log(this.marquee);
  }
}
</script>

<style lang="less">
/*
实时收入展示
 */
.income {
    height: 10rem;
    position: relative;
    overflow: hidden;
    .swiper {
        height: 40px;
        display: flex;
        justify-content: center;
        width: calc(100% - 1rem);
        margin: 10px;
        .swiper-slide {
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0.5rem 1rem;
            background-color: white;
            border-radius: 5rem;
            box-shadow: 0 2px 5px 0 rgba(0,0,0,0.1);
            margin-bottom: 0.5rem;
            .avatar {
                background: #00d2ff;
                /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #3a7bd5, #00d2ff);
                /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #3a7bd5, #00d2ff);
                /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                height: 30px;
                width: 30px;
                border-radius: 80px;
                border: 1px solid #007dbb;
                overflow: hidden;
            }
            .swiperItem {
                padding: 0.5rem;
                width: 90%;
                .top {
                    color: #3a3a3a;
                    font-size: 12px;
                }
                .bottom {
                    display: flex;
                    color: #c9c9c9;
                    font-size: 12px;
                    justify-content: space-between;
                    .time {
                        color: #ccc;
                        border-radius: 5px;
                        padding: 0 5px;
                        font-weight: normal;
                    }
                    .number {
                        color: white;
                        background: #00d2ff;
                        /* fallback for old browsers */
                        background: -webkit-linear-gradient(to right, #3a7bd5, #00d2ff);
                        /* Chrome 10-25, Safari 5.1-6 */
                        background: linear-gradient(to right, #3a7bd5, #00d2ff);
                        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                        border-radius: 5px;
                        padding: 0 5px;
                        font-weight: normal;
                    }
                }
                .blue {
                    color: red;
                }
            }
        }
        .swiper-container-free-mode > .swiper-wrapper {
            -webkit-transition-timing-function: linear;
            /*之前是ease-out*/
            -moz-transition-timing-function: linear;
            -ms-transition-timing-function: linear;
            -o-transition-timing-function: linear;
            transition-timing-function: linear;
            margin: 0 auto;
        }
    }

}
</style>
