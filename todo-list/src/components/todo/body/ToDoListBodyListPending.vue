<template>
  <div class="wrapper">
    <div class="list-title">
      <BaseTitle color="primary-light">
        <template #icon>
          <component :is="IconListBoxOutline"></component>
        </template>
        待辦事項
      </BaseTitle>

      <div class="count">
        <h6 class="text-primary-dark">{{ pendingToDoCount }}</h6>
        <span class="body-8 text-primary-light">件</span>
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
        v-for="td in pendingToDoList"
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

// list title
import BaseTitle from '@/components/ui/BaseTitle.vue'
import IconListBoxOutline from '@/components/icons/IconListBoxOutline.vue'
// list body
import ToDoListBodyListItem from '@/components/todo/body/ToDoListBodyListItem.vue'

import { useToDoStore } from '@/stores/todo'
const store = useToDoStore()

const pendingToDoList = computed(() => store.getPendingToDos)
const pendingToDoCount = computed(() => pendingToDoList.value.length)

// save to localStorage when todo list updated
watch(pendingToDoList, () => {
  store.saveToDoList()
})

// drag event
const cancelDefault = (e) => {
  e.preventDefault()
  e.stopPropagation()
  return false
}
const dropped = (e) => {
  cancelDefault(e)
  store.setToDoStatus({
    id: store.getCurrentDragToDoId.value,
    status: 'pending',
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
