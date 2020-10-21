<template>
  <div>
    <h1>{{ title }}</h1>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormLayout', 
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
