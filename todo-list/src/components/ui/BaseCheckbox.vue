<template>
  <div
    class="checkbox"
    :id="props.id"
    :state="checkboxState"
    :draggable="checkboxState !== 'placeholder'"
    @dragstart="dragStart"
  >
    <input type="checkbox" @click="toggleToDo" draggable="false" />
    <IconCheckBold class="checked-icon" v-if="props.status === 'completed'" draggable="false" />
    <input
      v-model="content"
      class="body-7"
      type="text"
      placeholder="Placeholder"
      draggable="false"
      @click="focusInput"
      @blur="blurInput"
      @change="updateToDo"
    />
    <IconTrashCanOutline
      class="delete-icon text-complementary-alarm"
      @click="deleteToDo"
      draggable="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import IconCheckBold from '@/components/icons/IconCheckBold.vue'
import IconTrashCanOutline from '@/components/icons/IconTrashCanOutline.vue'

import { useToDoStore } from '@/stores/todo'
const store = useToDoStore()

const props = defineProps(['state', 'id', 'content', 'status'])
const emits = defineEmits(['modified'])

// [checkbox style]
const checkboxState = ref(props.state)
const focusInput = () => {
  if (checkboxState.value === 'placeholder') return
  checkboxState.value = 'text'
}
const blurInput = () => {
  checkboxState.value = props.state
}

// [update] to-do input update / storage content update
const content = ref(props.content)
const updateToDo = () => {
  if (checkboxState.value === 'placeholder') updateInputContent()
  else updateToDoContent()
}
const updateInputContent = () => {
  emits('modified', content.value)
}
const updateToDoContent = () => {
  store.updateToDoContent({
    id: props.id,
    content: content.value,
    status: props.status
  })
  store.saveToDoList()
}

// [delete]
const deleteToDo = () => {
  store.deleteToDo({ id: props.id })
}

// [toggle complete]
const toggleToDo = () => {
  store.toggleToDo({ id: props.id })
}

const dragStart = () => {
  console.log('dragStart')
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.checkbox {
  display: flex;
  position: relative;
  width: 189px;
  height: min-content;
  padding: 8px;
  align-items: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  text-decoration: none;

  .checked-icon {
    position: absolute;
    left: 10px;
  }

  .delete-icon {
    color: map-get($complementary, alarm);
  }

  input[type='checkbox'] {
    width: 12px;
    height: 12px;
    position: relative;
    margin-inline-start: 2px;
    appearance: none;
    outline: none;
    vertical-align: middle;

    &::before {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 2px;
      border: 1px solid map-get($grey-scale, 600);
      z-index: 10;
    }
  }
  input[type='text'] {
    width: 100%;
    min-height: 17px;
    outline: none;
    border: none;
    background: transparent;
    overflow-wrap: break-word;
  }

  /* default */
  &[state='default'] {
    input[type='checkbox']::before {
      border-color: map-get($grey-scale, 600);
    }
    input[type='text'] {
      color: map-get($grey-scale, 600);
      outline: none;
      border: none;
    }
  }

  /* checked */
  &[state='checked'] {
    color: map-get($primary, dark);
    input[type='checkbox']::before {
      border-color: map-get($primary, dark);
    }
    input[type='text'] {
      color: map-get($primary, dark);
      outline: none;
      border: none;
    }
  }

  /* done */
  &[state='done'] {
    color: map-get($grey-scale, 300);
    input[type='checkbox']::before {
      border-color: map-get($grey-scale, 300);
    }
    input[type='text'] {
      color: map-get($grey-scale, 300);
      text-decoration: line-through;
    }
  }

  /* text */
  &[state='text'] {
    border-color: map-get($primary, light);
    background: map-get($grey-scale, white);
    box-shadow: 0px 0px 1px 1px rgba(46, 100, 70, 0.25);

    input[type='checkbox']::before {
      border-color: map-get($grey-scale, 600);
    }
    input[type='text'] {
      color: map-get($grey-scale, 600);
    }
  }

  /* placeholder */
  &[state='placeholder'] {
    border-color: map-get($primary, light);
    background: map-get($grey-scale, white);
    &:focus {
      box-shadow: 0px 0px 1px 1px rgba(46, 100, 70, 0.25);
    }

    input[type='checkbox'] {
      display: none;
      &::before {
        display: none;
      }
    }
    input[type='text'] {
      color: map-get($grey-scale, 600);
      &::placeholder {
        color: map-get($grey-scale, 200);
      }
    }
    svg {
      display: none;
    }

    &:hover {
      color: map-get($grey-scale, 200);
      background-color: map-get($grey-scale, white);
    }
  }

  &:hover:not([state='placeholder']) {
    border-color: map-get($primary, light);
    background: map-get($primary, light);
    color: map-get($grey-scale, white);

    input[type='checkbox']::before {
      border-color: map-get($grey-scale, white);
    }
    input[type='text'] {
      color: map-get($grey-scale, white);
    }
    .delete-icon {
      color: map-get($grey-scale, white);
    }
  }

  &[draggable='true'] {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
}

svg {
  cursor: pointer;
  width: 12px;
  height: 12px;
}
</style>
