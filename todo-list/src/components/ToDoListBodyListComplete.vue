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
      <h6 class="text-grey-scale-700">{{ completedToDoCount }}</h6>
      <span class="body-8 text-grey-scale-400">件</span>
    </div>
  </div>

  <div>
    <ToDoListBodyListItem
      state="done"
      v-for="td in completedToDoList"
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
import IconTextBoxCheckOutline from './icons/IconTextBoxCheckOutline.vue'
import ToDoListBodyListItem from './ToDoListBodyListItem.vue'

import { useToDoStore } from '../stores/todo'
const store = useToDoStore()
const completedToDoList = computed(() => store.getCompletedToDos)
const completedToDoCount = computed(() => completedToDoList.value.length)

watch(completedToDoCount, () => {
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
