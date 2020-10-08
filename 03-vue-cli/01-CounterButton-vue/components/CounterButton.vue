<template>
  <button @click="onButtonClick">{{ count }}</button>
</template>

<script>
export default {
  name: 'counter-button',

  props: {
    count: {
      type: Number,
      requires: false,
      default: 0,
    },
  },

  methods: {
    onButtonClick () {
      this.$emit('increment', this.count + 1)
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

};
</script>

<style></style>
