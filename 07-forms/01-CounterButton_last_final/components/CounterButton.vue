<template>
  <button @click="onButtonClick">{{ value }}</button>
</template>

<script>
export default {
  name: 'counter-button',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    onButtonClick() {
      this.value = this.value + 1;
      this.$emit('update:count', this.value); // Для <counter-button :count.sync="count4" />
      this.$emit('increment', this.value);
    },
  },

  data: () => ({
    value: 0,
  }),

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.value = newValue;
      },
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },
};
</script>

<style>

</style>
