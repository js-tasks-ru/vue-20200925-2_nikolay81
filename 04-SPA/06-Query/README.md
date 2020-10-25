# Работа с query параметрами

Задача состоит в том, чтобы синхронизировать значение некоторых параметров со значением `query` параметров в обе стороны.

Первое, что поможет решить задачу -- это отслеживание `query` с помощью `watch`. Добавление свойства `immediate: true` реализует инициализацию компонента со значениями из `query`.

Второе проще, надо добавить обработчик всех событий вида `@update:prop`, который будет обновлять `query` через метод `$router.replace({ query: newQuery })` или `push`. Это может быть как обработчик с параметром - названием обновляемого параметра, так и универсальный метод, обновляющий весь `query`.

Нужно также учитывать, что значения по умолчанию требуется убирать из `query`.

Методы `Object.keys`, `Object.entries` и `Object.fromEntries` могут помощь генерировать объекты и сделать код более универсальным. Хотя параметров всего 4, и можно изменять их явно.

```html
<template>
  <div class="container">
    <meetups-view
      :date.sync="meetupsViewOptions.date"
      :participation.sync="meetupsViewOptions.participation"
      :search.sync="meetupsViewOptions.search"
      :view.sync="meetupsViewOptions.view"
      @update:date="queryUpdated"
      @update:view="queryUpdated"
      @update:participation="queryUpdated"
      @update:search="queryUpdated"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const defaults = {
  view: 'list',
  search: '',
  date: 'all',
  participation: 'all',
};

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  data() {
    return {
      meetupsViewOptions: {
        date: defaults.date,
        participation: defaults.participation,
        search: defaults.search,
        view: defaults.view,
      },
    };
  },

  computed: {
    routeQuery() {
      return this.$route.query;
    },
  },

  watch: {
    routeQuery: {
      immediate: true,
      handler(value) {
        this.meetupsViewOptions = Object.fromEntries(
          Object.keys(this.meetupsViewOptions).map((key) => [
            key,
            value[key] || defaults[key],
          ]),
        );
      },
    },
  },

  methods: {
    queryUpdated() {
      this.$router
        .replace({
          query: Object.fromEntries(
            Object.entries(this.meetupsViewOptions).filter(
              ([key, value]) => value !== defaults[key],
            ),
          ),
        })
        .catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
    },
  },
};
</script>

<style scoped></style>
```
