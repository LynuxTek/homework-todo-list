<template>
  <div class="wrapper">
    <div class="list-title">
      <BaseTitle color="grey-scale-400">
        <template #icon>
          <component :is="IconTextBoxCheckOutline"></component>
        </template>
        完成事項
      </BaseTitle>

      <div class="count">
        <h6 class="text-grey-scale-700">{{ completedToDoCount }}</h6>
        <span class="body-8 text-grey-scale-400">件</span>
      </div>
    </div>

    <div
      class="list-body"
      data-role="drag-drop-container"
      @drop="dropped"
      @dragenter="dragEnter"
      @dragover="dragOver"
    >
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
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

import BaseTitle from '@/components/ui/BaseTitle.vue'

import IconTextBoxCheckOutline from '@/components/icons/IconTextBoxCheckOutline.vue'
import ToDoListBodyListItem from '@/components/todo/body/ToDoListBodyListItem.vue'

import { useToDoStore } from '@/stores/todo'
const store = useToDoStore()

const completedToDoList = computed(() => store.getCompletedToDos)
const completedToDoCount = computed(() => store.getCompletedToDoCount)

// update localStorage if completedToDoList
watch(completedToDoList, () => {
  store.saveToDoList()
})

const cancelDefault = (e) => {
  e.preventDefault()
  e.stopPropagation()
  return false
}
const dropped = (e) => {
  cancelDefault(e)
  store.setToDoStatus({
    id: store.getCurrentDragToDoId.value,
    status: 'completed',
    type: 'set'
  })
}
const dragEnter = (e) => {
  cancelDefault(e)
}
const dragOver = (e) => {
  cancelDefault(e)
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.list-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.list-body {
  flex-grow: 1;
  overflow: scroll;
}
::-webkit-scrollbar {
  display: none;
}

.count {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 4px;
}
</style>
