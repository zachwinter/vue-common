<template lang="pug">
.form-element(:class="{ short, flex }")
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
    },
    short: {
      type: Boolean,
      default: false
    },
    flex: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-element {
  height: $form-control-height;
  min-height: $form-control-height;

  &.short {
    height: $form-control-height / 2;
    min-height: $form-control-height / 2;
  }

  &.flex { @include flex(center, flex-start, row); }
}

label {
  @include label;
}
</style>