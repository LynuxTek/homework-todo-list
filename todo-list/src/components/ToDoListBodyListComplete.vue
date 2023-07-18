<template>
  <div class="list-title">
    <slot name="title">
      <BaseTitle color="grey-scale-400">
        <template #icon>
          <component :is="IconTextBoxCheckOutline"></component>
        </template>
        完成事項
      </BaseTitle>
    </slot>

    <div class="count">
      <h6 class="text-grey-scale-700">20</h6>
      <span class="body-8 text-grey-scale-400">件</span>
    </div>
  </div>

  <ToDoListBodyListItem />
</template>

<script setup>
// import ToDoListBodyListTitle from './ToDoListBodyListTitle.vue'
import ToDoListBodyListItem from './ToDoListBodyListItem.vue'

import BaseTitle from './ui/BaseTitle.vue'
import IconTextBoxCheckOutline from './icons/IconTextBoxCheckOutline.vue'
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
