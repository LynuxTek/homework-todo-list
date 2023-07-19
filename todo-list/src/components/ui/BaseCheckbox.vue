<template>
  <div
    class="checkbox"
    :id="props.id"
    :state="checkboxState"
    :draggable="checkboxState !== 'placeholder'"
    @dragstart="dragStart"
  >
    <!-- todo checkbox -->
    <input type="checkbox" @click="toggleToDo" />
    <IconCheckBold class="checked-icon" v-if="props.status === 'completed'" />

    <!-- input field -->
    <input
      v-model="content"
      class="body-7"
      type="text"
      placeholder="Placeholder"
      @click="focusInput"
      @blur="blurInput"
      @change="updateToDo"
    />

    <!-- trashcan icon to delete todo -->
    <IconTrashCanOutline class="delete-icon text-complementary-alarm" @click="deleteToDo" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import IconCheckBold from '@/components/icons/IconCheckBold.vue'
import IconTrashCanOutline from '@/components/icons/IconTrashCanOutline.vue'

import { useToDoStore } from '@/stores/todo'
const store = useToDoStore()

const props = defineProps(['state', 'id', 'content', 'status'])
const emits = defineEmits(['modified', 'dragItem'])

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
const content = ref(props.content)
const updateToDo = () => {
  if (checkboxState.value === 'placeholder') updateInputContent()
  else updateToDoContent()
}
// input content update (for to-do adding, just update input text, not submit yet)
const updateInputContent = () => {
  emits('modified', content.value)
}
// to-do content update in pinia store
const updateToDoContent = () => {
  store.updateToDoContent({
    id: props.id,
    content: content.value
  })
  store.saveToDoList() // force localStorage update
}

// ------------------------------------------------
// [delete]
const deleteToDo = () => {
  store.deleteToDo({ id: props.id })
}

// ------------------------------------------------
// [toggle complete]
const toggleToDo = () => {
  store.setToDoStatus({ id: props.id, type: 'toggle' })
}

// ------------------------------------------------
// [drag event] record current dragging item id
const dragStart = () => {
  store.setCurrentDragToDoId({ id: props.id })
  console.log('dragStart')
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';
@import '@/assets/styles/checkbox';

svg {
  cursor: pointer;
  width: 12px;
  height: 12px;
}
</style>
