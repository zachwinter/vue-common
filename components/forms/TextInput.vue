<template lang="pug">
FormElement(:label="label" :caption="caption")
  input(
    ref="input"
    :type="password ? 'password' : 'text'" 
    :value="modelValue" 
    :placeholder="placeholder" 
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
    },
    password: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.autofocus) {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  @include form-control;
}
</style>