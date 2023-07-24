<template>
  <div class="title" :class="titleColor" :data-icon="!!$slots.icon">
    <slot name="icon"></slot>

    <div class="subtitle-1">
      <slot>Title</slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'primary-dark'
  }
})
const titleColor = 'text-' + props.color
</script>

<style lang="scss" scoped>
.title {
  display: inline-flex;

  &[data-icon='true'] {
    align-items: center;
    gap: 4px;
  }
  &[data-icon='false'] {
    align-items: flex-start;
  }
}
</style>
