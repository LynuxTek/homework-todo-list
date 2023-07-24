<template>
  <div class="row">
    <!-- <BaseCheckbox state="placeholder" @modified="updateContent" /> -->
    <ToDoListAddItemInput v-model="content" />
    <BaseButton @click="addNewToDo">新增事項</BaseButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import ToDoListAddItemInput from '@/components/todo/add/ToDoListAddItemInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

import { useToDoStore } from '@/stores/todo'
const { addToDo } = useToDoStore()

// input todo content
const content = ref('')

// add new todo to todo-list
const addNewToDo = () => {
  addToDo({ content: content.value, status: 'pending' })
}
</script>

<style scoped>
.row {
  display: flex;
  width: 100%;
  gap: 8px;
  margin: 24px 0;

  /* modify BaseButton width (root el class=btn) */
  .btn {
    width: 84px;
  }

  /* modify BaseCheckbox width (root el class=checkbox) */
  .to-do-item {
    flex-grow: 1;
  }
}
</style>
