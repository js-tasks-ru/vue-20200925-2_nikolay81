export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: `<button type="button"
    @click="onButtonClick">{{ count }}</button>`,

  props: {
    count: {
      type: Number,
      requires: false,
      default: 0,
      validator: value => typeof value === 'number',
    },
  },

  methods: {
    onButtonClick () {
      this.$emit('increment', this.count + 1); // DO NOT USE this.count++
    },
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  // Компонент должен иметь входной параметр

  // Компонент должен иметь модель

  // Шаблон лучше держать максимально простым, а логику выносить в методы
};
