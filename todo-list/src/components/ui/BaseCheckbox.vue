<template>
  <div class="checkbox" :state="checkboxState">
    <input type="checkbox" name="" id="" @click="toggleToDo" />
    <IconCheckBold class="checked-icon" v-if="isCompleted" />
    <input
      class="body-7"
      type="text"
      name=""
      id=""
      @click="modifyToDo(true)"
      @blur="modifyToDo(false)"
      placeholder="List123456"
    />
    <IconTrashCanOutline class="delete-icon text-complementary-alarm" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconCheckBold from '../icons/IconCheckBold.vue'
import IconTrashCanOutline from '../icons/IconTrashCanOutline.vue'

const checkboxState = ref('default')

const isCompleted = ref(false)
const toggleToDo = () => {
  isCompleted.value = !isCompleted.value
  checkboxState.value = isCompleted.value ? 'done' : 'default'
}

const modifyToDo = (isFocus) => {
  checkboxState.value = isFocus ? 'text' : 'default'
  checkboxState.value = isCompleted.value ? 'done' : checkboxState.value
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/variables';

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
}

svg {
  cursor: pointer;
  width: 12px;
  height: 12px;
}
</style>
