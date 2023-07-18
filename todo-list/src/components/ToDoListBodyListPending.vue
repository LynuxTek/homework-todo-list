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
      <h6 class="text-primary-dark">{{ pendingToDoCount }}</h6>
      <span class="body-8 text-primary-light">件</span>
    </div>
  </div>

  <div>
    <ToDoListBodyListItem
      v-for="td in pendingToDoList"
      :key="td.id"
      :id="td.id"
      :content="td.content"
      :status="td.status"
    >
    </ToDoListBodyListItem>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

import BaseTitle from './ui/BaseTitle.vue'
import IconListBoxOutline from './icons/IconListBoxOutline.vue'
import ToDoListBodyListItem from './ToDoListBodyListItem.vue'

import { useToDoStore } from '../stores/todo'
const store = useToDoStore()
const pendingToDoList = computed(() => store.getPendingToDos)
const pendingToDoCount = computed(() => pendingToDoList.value.length)

watch(pendingToDoCount, () => {
  store.saveToDoList()
})
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
