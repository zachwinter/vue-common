<template lang="pug">
FormElement(:label="label" :caption="caption" class="toggle" :class="{ disabled }" :short="true")
  .pill(@click="click" :class="{ clicked: value }"): i
</template>

<script>
import FormElement from '@zach.winter/vue-common/components/forms/FormElement'

export default {
  props: {
    value: {
      type: Boolean
    },
    label: {
      type: String,
      default: null
    },
    caption: {
      type: String,
      default: null 
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: { FormElement },
  methods: {
    click () {
      if (this.disabled) return
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss">
.toggle {
  @include flex(center, flex-start, row);
  
  &.disabled { opacity: .5; }

  label {
    margin: 0 10px 0 0;
  }

  $size: $form-control-height * .5;

  .pill {
    @include size($size * 2, $size);
    position: relative;
    background: transparent;
    border-radius: $size;
    transition: background $base-transition;
    box-shadow: inset 0 0 0 1px $white;

    i {
      @include size($size);
      @include position(absolute, 0 null 0 0);
      border-radius: $size;
      background: $white;
      transition: left $base-transition;
      transform: scale(.9);
    }

    &.clicked {
      background: $red;

      i { @include position(absolute, 0 null 0 calc(100% - #{$size})); }
    }
  }
}
</style>