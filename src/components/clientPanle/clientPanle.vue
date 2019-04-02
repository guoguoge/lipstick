<template>
<div class="panle">
  <div class="avatar">
    <img :src="avatars[Math.floor(Math.random()*10)]" width="100%">
  </div>
  <div class="text">
    <p>用户 : {{randomPhoneNumber()}}</p>
    <p class="time">注册时间:2018-01-20</p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    randomCode(len, dict) {
      for (var i = 0, rs = ''; i < len; i++)
        rs += dict.charAt(Math.floor(Math.random() * 100000000) % dict.length);
      return rs;
    },
    // 生成随机手机号码
    randomPhoneNumber() {
      // 第1位是1 第2,3位是3458 第4-7位是* 最后四位随机
      return [1, this.randomCode(2, '3458'), '****', this.randomCode(4, '0123456789')].join('');
    },
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.panle {
    margin: 0 1rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: white;
    margin-bottom: 1rem;
    border-radius: 5px;
    border: 1px solid #89efff;
    .avatar {
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;
        overflow: hidden;
        border-radius: 10rem;
    }
    .text {
        text-align: left;
        .time {
          color: #a1a1a1;
        }
    }
}
</style>
