<template>
<div class="step">
  <div class="step-annular" :class="number >= 1?'active':''">
    <span>1</span>{{status == 1? '开始夺宝':'开始竞拍'}}
  </div>
  <div class="step-handrail" :class="number >= 2?'active':''"></div>
  <div class="step-annular" :class="number >= 2?'active':''">
    <span>2</span>{{status == 1? '待开奖':'竞价结束'}}
  </div>
  <div class="step-handrail" :class="number >= 3?'active':''"></div>
  <div class="step-annular" :class="number >= 3?'active':''">
    <span>3</span>{{status == 1? '开奖':'竞拍结束'}}
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    number: {
      type: Number,
      default: null
    },
    status: {
      type: Number,
      default: 1
    }
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.step {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #EFEFEF;
    padding: 1rem 2px 0;

    &-annular {
        color: #C5C0C4;
        text-align: center;
        font-size: 12px;
        line-height: 18px;
        width: 22%;
        span {
            width: 16px;
            height: 16px;
            display: inline-block;
            background: #C5C0C4;
            border-radius: 16px;
            margin-right: 5px;
            font-weight: lighter;
            color: white;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            vertical-align: baseline;
        }
    }

    &-annular.active {
        color: #FF16A4;
        span {
            background: #FF16A4;
        }
    }
    &-handrail {
        width: 15%;
        height: 1px;
        background: #C5C0C4;
    }

    &-handrail.active {
        background: #FF16A4;
    }
}
</style>
