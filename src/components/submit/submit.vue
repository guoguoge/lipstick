<template>
<div v-show="show" class="container">
  <div class="img-box">
    <h2>
      <x-icon type="ios-checkmark" size="35"></x-icon>您的信息提交成功!
    </h2>
    <p>专业的保险顾问将尽快与您联系,为您提供专业的产品咨询规划服务,祝您生活愉快!</p>
    <div class="contact">
      <span>
        <x-icon type="ios-information-outline" size="20"></x-icon>工作日:24小时内与您联系
      </span><br>
      <span>
        <x-icon type="ios-information-outline" size="20"></x-icon>休息日:48小时内与您联系
      </span>
      <h1>来电号码:123456789</h1>
    </div>
  </div>
</div>
</template>

<script>
import {
  XButton,
  Icon
} from "vux";
export default {
  components: {
    XButton,
    Icon
  },
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.container {
    position: fixed;
    top: 0;
    background: white;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 1rem;
    z-index: 100;
    h2 {
        color: #34c645;
        margin-bottom: 2rem;
    }

    p {
        color: #b1b1b1;
        text-align: left;
    }

    .weui-dialog {
        border-radius: 8px;
        padding-bottom: 8px;
    }

    .dialog-title {
        line-height: 30px;
        color: #666;
    }

    .img-box {
        height: 250px;
        padding: 2rem;
        margin-top: 10rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;

        .contact {
            width: 100%;
            color: #b1b1b1;
            margin-top: 2rem;
            padding: 1rem;
            background: #f8f8f8;
            border-radius: 10px;
            border: 1px dashed #aaa;

            h1 {
                padding: 0.5rem 1rem;
                font-size: 20px;
                color: white;
                background: #1D976C;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #93F9B9, #1D976C);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #93F9B9, #1D976C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

                border-radius: 10px;
                margin-top: 1rem;
            }

            span {
                margin-bottom: 0.5rem;
                display: inline-block;
            }
        }

        .vux-x-icon {
            fill: #34c645;
            margin-right: 5px;
        }
    }
}
</style>
