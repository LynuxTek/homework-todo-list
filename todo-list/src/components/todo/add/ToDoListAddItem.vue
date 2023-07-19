<template>
  <div class="row">
    <BaseCheckbox state="placeholder" @modified="updateContent" />
    <BaseButton @click="addNewToDo">新增事項</BaseButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import BaseCheckbox from '@/components/ui/BaseCheckbox.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

import { useToDoStore } from '@/stores/todo'
const store = useToDoStore()

// input todo content
const content = ref('')

// update input content
const updateContent = (payload) => {
  content.value = payload
}

// add new todo to todo-list
const addNewToDo = () => {
  store.addToDo({ content: content.value, status: 'pending' })
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
  .checkbox {
    flex-grow: 1;
  }
}
</style>
