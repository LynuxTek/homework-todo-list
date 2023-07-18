<template>
  <div class="flex-row">
    <BaseCheckbox state="placeholder" @modified="updateContent" />
    <BaseButton @click="addNewToDo">新增事項</BaseButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import BaseCheckbox from './ui/BaseCheckbox.vue'
import BaseButton from './ui/BaseButton.vue'

import { useToDoStore } from '../stores/todo'
const store = useToDoStore()

const content = ref('')

const updateContent = (payload) => {
  content.value = payload
}

const addNewToDo = () => {
  store.addToDo({ content: content.value, status: 'pending' })
}
</script>

<style scoped>
.flex-row {
  display: flex;
  width: 100%;
  gap: 8px;
  margin: 24px 0;

  .checkbox {
    flex-grow: 1;
  }

  .btn {
    width: 84px;
  }
}
</style>
