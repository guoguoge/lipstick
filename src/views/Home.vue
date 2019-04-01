<template>
<div class="">
  <button-tab>
    <button-tab-item>{{1 }}</button-tab-item>
    <button-tab-item selected>{{ 2 }}</button-tab-item>
    <button-tab-item>{{ 3 }}</button-tab-item>
  </button-tab>
</div>
</template>

<script>
import {
  ButtonTab,
  ButtonTabItem
} from 'vux'

export default {
  components: {
    ButtonTab,
    ButtonTabItem
  }
}
</script>

<style lang="less" scoped>
</style>
