<template lang="pug">
FormElement(:label="label" :caption="caption")
  input(
    :type="password ? 'password' : 'text'" 
    :value="value" 
    :placeholder="placeholder" 
    :autofocus="autofocus"
    :name="name"
    @input="$emit('input', $event.target.value)"
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
  }
}
</script>

<style lang="scss" scoped>
input {
  @include form-control;
}
</style>