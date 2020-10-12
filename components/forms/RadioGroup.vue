<template>
  <FormElement :label="label" :caption="caption" :short="true">
    <div class="outer">
      <label v-for="(option, i) in options" :key="i">
        <div class="radio-container">
          <input type="radio" @input="onInput" :id="option" :value="option.value" :name="name" :checked="value === option.value" />
          <span />
        </div>
        <span>{{ option.name }}</span>
      </label>
    </div>
  </FormElement>
</template>

<script>
import FormElement from './FormElement'
import mixin from '../../mixins/form-element'

export default {
  mixins: [mixin],
  components: { FormElement },
  props: {
    options: {
      required: true
    }
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  }
} 
</script>

<style lang="scss" scoped>
.outer, label {
  @include flex(center, flex-start, row);
  flex-wrap: wrap;
}

label {
  margin-right: spacer(1.5);
  font-weight: normal;
  margin-bottom: 0;
}

.radio-container {
  @include size($form-control-height/2);
  position: relative;
  margin-right: .5rem;


  input {
    @include position(absolute, 0 0 0 0);
    @include size(100%);
    display: block;
    opacity: 0;
  }

  span {
    @include size(100%);
    display: block;
    border-radius: 50px;
    background: white;
    transition: all $hover-transition;
  }

  input:checked + span {
    box-shadow: inset 0 0 0 5px $red;

    &:before { opacity: 1; }
  }
}
</style>