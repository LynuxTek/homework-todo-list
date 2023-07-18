<template>
  <div class="list-title">
    <slot name="title">
      <BaseTitle color="primary-light">
        <template #icon>
          <component :is="IconListBoxOutline"></component>
        </template>
        待辦事項
      </BaseTitle>
    </slot>

    <div class="count">
      <h6 class="text-primary-dark">5</h6>
      <span class="body-8 text-primary-light">件</span>
    </div>
  </div>
</template>

<script setup>
import BaseTitle from './ui/BaseTitle.vue'
import IconListBoxOutline from './icons/IconListBoxOutline.vue'
</script>

<style scoped>
.list-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.count {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 4px;
}
</style>
