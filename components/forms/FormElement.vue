<template lang="pug">
.form-element
  label(v-if="label") {{ label }}
  slot
  p(v-if="caption") {{ caption }}
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null
    },

    caption: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.form-element {
  @include flex(center, flex-start, row);
  min-height: $form-control-height;
}

label {
  @include label;
}
</style>