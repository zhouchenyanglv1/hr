<template>
  <div>
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  methods: {
    changeScreen() {
      if (!screenfull.isEnabled) {
        this.$message.warning('全屏组件不可用')
        return
      }
      screenfull.toggle()
    }
  }
}
</script>

<style>

</style>
