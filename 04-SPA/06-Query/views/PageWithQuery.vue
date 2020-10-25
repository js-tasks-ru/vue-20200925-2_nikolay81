<template>
  <div class="container">
    <meetups-view
      :participation.sync="participation"
      :date.sync="date"
      :view.sync="view"
      :search.sync="search" />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

export const computedFnTemplate = function(name, defaultValue) {
  return {
    [name]: {
      get() {
        return this.$route.query[name];
      },
      set(value) {
        const { [name]: queryProp, ...query } = this.$route.query || {};

        if (queryProp === value) return;

        if (value !== defaultValue) {
          query[name] = value;
        }

        // Используем replace, чтобы не забивать историю при изменени запроса.
        // т.е. после поиска при нажатии на кнопку браузера "назад" мы должны попасть на предыдущую страницу
        this.$router.replace({
          path: '/',
          query,
        })
      },
    },
  };
}

export const generateComputedFn = function() {
  const defaults = {
    view: 'list',
    participation: 'all',
    date: 'all',
    search: '',
  };

  return {
    ...computedFnTemplate('view', defaults.view),
    ...computedFnTemplate('participation', defaults.participation),
    ...computedFnTemplate('date', defaults.date),
    ...computedFnTemplate('search', defaults.search),
  };
}

export default {
  name: 'PageWithQuery',

  components: { MeetupsView },

  computed: {
    ...generateComputedFn()
  },
};
</script>

<style scoped></style>
