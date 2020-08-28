<template lang="pug">
button(type="submit"): slot Submit
</template>

<style lang="scss" scoped>
button {
  @include button;
} 
</style>