<template>
  <div 
    :class="formGroupClass"
    class="form-group">
    <label 
      v-if="hasLabel"
      class="form-label">{{ label }}</label>
      <slot />
  </div>
</template>

<script>
export default {
  name: 'FormGroup',

  props: {
    inline: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },

  computed: {
    hasLabel() {
      return Boolean(this.label)
    },
    formGroupClass() {
      return {
        'form-group_inline': this.inline
      }
    },
  },
};
</script>

<style scoped>
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group.form-group_inline {
  display: inline-block;
  margin-bottom: 0;
}

.form-group.form-group_inline + .form-group.form-group_inline {
  margin-left: 16px;
}

.form-label {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  margin-bottom: 10px;
  display: block;
}
</style>
