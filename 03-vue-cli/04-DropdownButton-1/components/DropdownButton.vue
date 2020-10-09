<template>
  <div 
    :class="expandedClass"
    class="dropdown">
    <button 
      :class="buttonIconClass"
      ref="dropdownButton"
      type="button" 
      class="button dropdown__toggle"
      @click="expanded = !expanded"
      @focus="preventCollapse = false"
      @blur="onBlurButton">
      <app-icon 
        v-if="displayIcon"
        :icon="displayIcon" />
      <span>{{ dropDownTitle }}</span>
    </button>

    <div 
      :class="expandedClass"
      class="dropdown__menu"
      @mouseleave="onMouseLeaveMenu">
      <button 
        v-for="item in options"
        :key="item.value"
        :class="dropdownIconClass"
        class="dropdown__item" 
        type="button"
        @focus="onFocusItem"
        @blur="onBlurItem"
        @mousedown="onMouseDownItem"
        @click="() => onClickItem(item)">
        <app-icon
          v-if="item.icon"
          :icon="item.icon" />
        <span>{{ item.text }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

export default {
  name: 'DropdownButton',

  components: { AppIcon },

  data: () => ({
    expanded: false,
    preventCollapse: false,
  }),

  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
    options: {
      type: Array,
      required: true,
    }
  },

  computed: {
    optionsMap() {
      const result = {}

      this.options.forEach(item => {
        const key = item.value

        result[key] = item
      })

      return result
    },
    dropDownTitle() {
      const value = this.optionsMap[this.value]
        ? this.optionsMap[this.value]['text']
        : ''

      return [
        this.title,
        value,
      ]
        .filter(item => item !== '')
        .join(' - ')
    },
    hasIcon() {
      return this.options.some(item => item.icon)
    },
    buttonIconClass() {
      return this.hasIcon && 'dropdown__toggle_icon'
    },
    dropdownIconClass() {
      return this.hasIcon && 'dropdown__item_icon'
    },
    expandedClass() {
      return this.expanded && 'show'
    },
    displayValue() {
      if (this.optionsMap[this.value]) {
        return this.optionsMap[this.value]['text']
      }

      return this.value
    },
    displayIcon() {
      if (this.optionsMap[this.value]) {
        return this.optionsMap[this.value]['icon']
      }
    },
  },

  /**
   * куча методов ниже нужна для
   * сворачивания меню при:
   * - клике запределами кнопки
   * - mousedown на элементе меню, но mouseup за его пределами
   * а так же для сохранения работоспособности
   * с клавиатуры через клавишу TAB
   */
  methods: {
    /**
     * по клику на элемент меню
     * - сворачиваем меню
     * - сбрасываем флаг предотвращения сворачивания
     * - эмитим событие
     */
    onClickItem({ value }) {
      this.expanded = false
      this.preventCollapse = false
      this.$refs.dropdownButton.focus()
      this.$emit('change', value)
    },
    /**
     * устанавливаем флаг предотвращения сворачивания
     * т.к. сворачивание происходит при потере фокуса кнопкой
     */
    onMouseDownItem() {
      this.preventCollapse = true
    },
    /**
     * при уходе с меню после события mousedown, 
     * но без click по элементу меню
     * - устанавливаем фокус на кнопке
     * - сбрасываем флаг предотвращения сворачивания
     */
    onMouseLeaveMenu() {
      if (this.preventCollapse) {
        this.$refs.dropdownButton.focus()
        this.preventCollapse = false
      }
    },
    /**
     * при потере фокуса элементом меню
     * сворачиваем меню, если позволяет
     * флаг предотвращения сворачивания
     */
    onBlurItem() {
      this.preventCollapse = false
      const t = setTimeout(() => {
        this.expanded = this.preventCollapse
        clearTimeout(t)
      }, 30)
    },
    /**
     * при получении фокуса элементом меню
     * устанавливаем флаг предотвращения сворачивания
     */
    onFocusItem() {
       this.preventCollapse = true
    },
    /**
     * при потере фокуса кнопкой
     * сворачиваем меню, если позволяет
     * флаг предотвращения сворачивания
     */
    onBlurButton() {
      const t = setTimeout(() => {
        this.expanded = this.preventCollapse
        clearTimeout(t)
      }, 30)
    }
  },
  model: {
    prop: 'value',
    event: 'change',
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: .2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}
/* Стиль для индикации фокуса */
.button:focus {
  border-style: groove !important;
}
.button.button_block {
   display: block;
  width: 100%;
}

.button.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
  color: var(--blue);
}

.button.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button.button_secondary:hover {
  border-color: var(--blue-light);
}

.button.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button.button_danger:hover {
  border-color: var(--red-light);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.button.dropdown__toggle {
  border: 2px solid var(--blue-light);
  position: relative;
  background-color: var(--white);
  background-position: calc(100% - 10px) calc(100% - 10px);
  border-radius: 8px;
  padding-right: 56px;
  font-weight: 500;
}

.button.dropdown__toggle:after {
  content: '';
  position: absolute;
  top: 15px;
  right: 16px;
  transform: none;
  background: url('../assets/icons/icon-chevron-down.svg') no-repeat;
  background-size: cover;
  display: block;
  width: 24px;
  height: 24px;
  transition: .2s transform;
}

.button.dropdown__toggle.dropdown__toggle_icon {
  padding-left: 56px;
}

.dropdown__toggle_icon .icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}

.show > .button.dropdown__toggle {
  border-color: var(--blue);
  border-bottom-color: transparent;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.show > .button.dropdown__toggle:after {
  transform: rotate(180deg);
}

.dropdown__menu {
  margin: 0;
  width: 100%;
  padding: 0;
  border-radius: 0 0 8px 8px;
  left: 0;
  z-index: 95;
  background-clip: padding-box;
  display: none;
  flex-direction: column;
  border: 2px solid var(--blue);
  border-top: none;
  overflow: hidden;
}

.dropdown__menu.show {
  display: flex;
  position: absolute;
  transform: translate3d(0px, 52px, 0px);
  top: -1px;
  left: 0;
  will-change: transform;
  right: auto;
  bottom: auto;
}

.dropdown__item {
  padding: 8px 16px;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  background-color: var(--white);
  box-shadow: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.dropdown__item:hover,
.dropdown__item:focus {
  background-color: var(--grey-light);
}

.dropdown__item.dropdown__item_icon {
  padding-left: 56px;
  position: relative;
}

.dropdown__item.dropdown__item_icon > .icon {
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate(0, -50%);
}

</style>
