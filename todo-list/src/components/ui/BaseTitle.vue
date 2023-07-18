<template>
  <div class="title" :class="titleColor" :icon="hasIcon()">
    <slot name="icon"></slot>

    <div class="subtitle-1">
      <slot>Title</slot>
    </div>
  </div>
</template>

<script setup>
import { useSlots } from 'vue'
const slots = useSlots()
const hasIcon = () => !!slots.icon

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

  &[icon='true'] {
    align-items: center;
    gap: 4px;
  }
  &[icon='false'] {
    align-items: flex-start;
  }
}
</style>
