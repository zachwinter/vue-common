<template lang="pug">
canvas(ref="canvas" :width="width * dpi" :height="height * dpi" :style="{ width: width + 'px', height: height + 'px' }")
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: window.innerWidth
    },
    height: {
      type: Number,
      default: window.innerHeight
    }
  },
  data: () => ({
    dpi: window.devicePixelRatio
  })
}
</script>

<style lang="scss" scoped>
canvas {
  display: block;
}
</style>