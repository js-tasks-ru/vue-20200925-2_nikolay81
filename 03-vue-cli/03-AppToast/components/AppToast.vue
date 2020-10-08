<template>
  <div class="toasts">
    <div 
      v-for="item in messages"
      :key="item.date"
      class="toast"
      :class="item.toastClass">
      <app-icon
        :icon="item.toastIconClass" />
      <span>{{ item.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',

  components: { AppIcon },

  data: () => ({
    /**
     * Массив сообщений
     * Структура элемента
     * @param {Number} date - timestamp в качестве ID
     * @param {String} message - текст сообщение
     * @param {String} type - тип сообщения success | error
     * @param {String} toastClass - стиль тоста
     * @param {String} toastIconClass - стиль иконки тоста
     */
    messages: [],
    /**
     * Объект таймеров
     * ключ ID таймер
     * значение date (ID) сообщения
     */
    timers: {},
  }),

  methods: {
    error(message) {
      this.addMessage({
        message,
        type: 'error',
        toastClass: 'toast_error',
        toastIconClass: 'alert-circle',
      })
    },

    success(message) {
      this.addMessage({
        message,
        type: 'success',
        toastClass: 'toast_success',
        toastIconClass: 'check-circle',
      })
    },

    addMessage(options) {
      const date = new Date().getTime()

      this.timers[date] = setTimeout(
        this.removeMessage.bind(this, date),
        DELAY,
      )

      this.messages = this.messages.concat({
        ...options,
        date,
      })
    },

    removeMessage(date) {
      const index = this.messages.findIndex(
        item => item.date === date
      )

      clearTimeout(this.timers[date])
      delete this.timers[date]

      if (index < 0) return // Чтоб не выкинуть последний элемент

      this.messages.splice(index, 1)
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
