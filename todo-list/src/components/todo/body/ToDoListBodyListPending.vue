<template>
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
    class="list-container"
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
</template>

<script setup>
import { ref, computed, watch } from 'vue'

import BaseTitle from '@/components/ui/BaseTitle.vue'
import IconListBoxOutline from '@/components/icons/IconListBoxOutline.vue'
import ToDoListBodyListItem from '@/components/todo/body/ToDoListBodyListItem.vue'

import { useToDoStore } from '@/stores/todo'
const store = useToDoStore()

const pendingToDoList = computed(() => store.getPendingToDos)
const pendingToDoCount = computed(() => pendingToDoList.value.length)

watch(pendingToDoList, () => {
  store.saveToDoList()
})

const dragStatus = ref('completed')
const cancelDefault = (e) => {
  e.preventDefault()
  e.stopPropagation()
  return false
}
const dropped = (e) => {
  console.log('dropped')
  cancelDefault(e)
  console.log(e)
  console.log(e.target.id)
  // store.setToDoStatus({ id: e.target.id, status: dragStatus.value })
}
const dragEnter = (e) => {
  console.log('dragEnter')
  dragStatus.value = 'completed'
  cancelDefault(e)
}
const dragOver = (e) => {
  console.log('dragOver')
  cancelDefault(e)
}
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
