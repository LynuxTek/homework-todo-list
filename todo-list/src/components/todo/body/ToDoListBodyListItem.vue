<template>
  <div
    class="to-do-item"
    :id="props.toDoItem.id"
    :state="checkboxState"
    :draggable="checkboxState !== 'placeholder'"
    @dragstart="dragStart"
  >
    <!-- todo checkbox -->
    <input type="checkbox" class="to-do-item-checkbox" @click="toggleToDo" />
    <IconCheckBold class="to-do-item-checked-icon" v-if="props.toDoItem.status === 'completed'" />

    <!-- input field -->
    <input
      v-model="content"
      class="to-do-item-input body-7"
      type="text"
      placeholder="Placeholder"
      @click="focusInput"
      @blur="blurInput"
      @change="updateToDoContent"
    />

    <!-- trashcan icon to delete todo -->
    <IconTrashCanOutline
      class="to-do-item-delete-icon text-complementary-alarm"
      @click="deleteToDo"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import IconCheckBold from '@/components/icons/IconCheckBold.vue'
import IconTrashCanOutline from '@/components/icons/IconTrashCanOutline.vue'

import { useToDoStore } from '@/stores/todo'
const store = useToDoStore()

const props = defineProps(['state', 'toDoItem'])

// ------------------------------------------------
// [checkbox state] specify checkbox state (will change to corresponding css style)
const checkboxState = ref(props.state)
const focusInput = () => {
  if (checkboxState.value === 'placeholder') return
  checkboxState.value = 'text'
}
const blurInput = () => {
  checkboxState.value = props.state
}

// ------------------------------------------------
// [update] update content when blur
const content = ref(props.toDoItem.content)
// to-do content update in pinia store
const updateToDoContent = () => {
  store.updateToDoContent({
    id: props.toDoItem.id,
    content: content.value
  })
  // store.saveToDoList() // force localStorage update
}

// ------------------------------------------------
// [delete]
const deleteToDo = () => {
  store.deleteToDo(props.toDoItem.id)
}

// ------------------------------------------------
// [toggle complete]
const toggleToDo = () => {
  store.setToDoStatus({ id: props.toDoItem.id, type: 'toggle' })
}

// ------------------------------------------------
// [drag event] record current dragging item id
const dragStart = () => {
  store.setCurrentDragToDoId(props.toDoItem.id)
}
</script>
