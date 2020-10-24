<template>
  <div class="wrapper bg-grey">
    <TheHeader />
    <main class="main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';

export default {
  name: 'BaseLayout',
  components: { 
    TheHeader,
    TheFooter,
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.bg-grey {
  background-color: var(--grey-light);
}
main {
  flex: 1 0 auto;
}
</style>
