<template>
  <FormElement :label="label" :caption="caption" class="element">
    <div class="select" :class="{ open }">
      <div class="value" @click="toggle">
        <span :style="{ opacity }">{{ displayed }}</span>
        <icon :icon="['fal', 'caret-down']" />
      </div>
      <transition name="fade">
        <ul v-if="open">
          <li v-for="(value, i) in options" :key="i" @click="select(value)">
            {{ value }}
          </li>
        </ul>
      </transition>
    </div>
  </FormElement>
</template>

<script>
import FormElement from './FormElement'

export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      required: true
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    caption: {
      type: String,
      required: false
    }
  },
  components: {
    FormElement
  },
  data: () => ({
    open: false
  }),
  computed: {
    displayed () {
      if (this.modelValue) return this.modelValue
      return this.placeholder
    },
    opacity () {
      if (this.displayed === this.placeholder) return .5
      return 1
    },
    displayedValue () {
      const match = this.options.find(v => v.name === this.modelValue.name)
      if (match) return match.name
      return this.placeholder
    }
  },
  methods: {
    toggle () {
      this.open = !this.open 
    },
    select (value) {
      this.$emit('update:modelValue', value)
      this.toggle()
    }
  }
}
</script>

<style lang="scss" scoped>
$input-height: 30px;

.form-element { width: 100%; }

.select {
  @include size(auto, $input-height);
  @include flex(center, flex-start);
  @extend %form-control !optional;
  width: 100%;
  position: relative;
  display: inline-flex;
  // border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, .2);
  box-shadow: inset 0 0 0 0px $white;
  transition: all $base-transition;
  cursor: pointer;

  @include max-width(mobile) {
    width: 100%;
  }
}

.value {
  @include size(100%);
  @include flex(center, space-between);
  padding: 0 spacer(.5);
  background: transparent;
  color: $white;
  position: relative;
  z-index: 50;
}

ul {
  @include position(absolute, 100% null null 0);
  z-index: 50;
  color: $white;
  min-width: 100%;
  list-style: none;
  transform-origin: top center;
  box-shadow: 0 1px  2px 0 rgba(0, 0, 0, .15);
}

li {
  @include flex(center, flex-start);
  height: $input-height;
  padding: 0 spacer(.25);
  background: $white;
  color: $black;
  transition: all $base-transition;
  cursor: pointer;

  &:hover {
    background: $black;
    color: $white;
  }
}

svg {
  transition: transform $base-transition;
  will-change: transform;
  @include size($input-height / 2 !important);
}

.open svg {
  transform: rotate(180deg);
}

.open .value {
  z-index: 60;
}

.open ul {
  z-index: 55;
}

.element { border: 0; }
</style>