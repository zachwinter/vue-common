<template lang="pug">
FormElement(:label="label" :caption="caption" :flex="true" :short="true")
  input(type="range" :min="min" :max="max" :value="modelValue" :step="step" @input="onInput" :disabled="disabled")
</template>

<script>
import FormElement from './FormElement'

export default {
  props: ['modelValue', 'min', 'max', 'step', 'label', 'caption', 'disabled'],
  components: { FormElement } ,
  methods: {
    onInput (e) {
      this.$emit('update:modelValue', parseFloat(e.target.value))
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  @include size(100%, 5px);
  -webkit-appearance: none; 
  background: $white;
  border-radius: 10px; 
  outline: 0;
  transition: opacity $base-transition;

  &:disabled {
    opacity: .2;
  }
}

input::-webkit-slider-thumb {
  @include size(20px);
  border-radius: 100%;
  background: $red;
  -webkit-appearance: none;
}

div {
  text-align: center;
  font-weight: bold;
  color: $white;
  font-size: .8rem;
  margin-top: spacer(1);
  transition: all $base-transition;
}
</style>