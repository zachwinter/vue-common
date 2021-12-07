<template lang="pug">
FormElement(:label="label" :caption="caption")
  TextArea(
    :value="value" 
    :placeholder="placeholder" 
    :autofocus="autofocus"
    :name="name"
    @input="$emit('update:modelValue', $event.target.value)"
  )
</template>

<script>
import mixin from '../../mixins/form-element'

export default {
  mixins: [mixin],
  props: {
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  @include form-control;
  min-height: 100px;
}
</style>