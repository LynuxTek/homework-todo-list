import { ref, computed, watchEffect } from 'vue'
import { defineStore } from 'pinia'

import uniqid from 'uniqid'

import { TO_DO_LIST_STORAGE_KEY as TO_DO_LIST_KEY } from '@/constants'

// [pinia]
// ref -> state
// computed -> getters
// function() -> actions

export const useToDoStore = defineStore('todo', () => {
  // toDoList = [ toDo<Object> ]
  // toDo:
  // - id: (unique, generate from 'uniqid')
  // - content: String
  // - status: 'pending' / 'completed'

  // ---------------------------------------------------------

  // [state] todo list (array)
  const toDoList = ref(
    // JSON.parse(localStorage.getItem(localStorageKeys.TO_DO_LIST_STORAGE_KEY)) ?? []
    JSON.parse(localStorage.getItem(TO_DO_LIST_KEY)) ?? []
  )

  // [state] current dragging todo id
  const currentDragToDoId = ref('')

  // ---------------------------------------------------------

  // [getters] return pending/completed todos
  const getToDoList = computed(() => toDoList.value)
  const getPendingToDos = computed(() => toDoList.value.filter((toDo) => toDo.status === 'pending'))
  const getCompletedToDos = computed(() =>
    toDoList.value.filter((toDo) => toDo.status === 'completed')
  )
  const getPendingToDoCount = computed(() => getPendingToDos.value.length)
  const getCompletedToDoCount = computed(() => getCompletedToDos.value.length)

  // [getters] return current dragging todo id
  const getCurrentDragToDoId = computed(() => currentDragToDoId)

  // ---------------------------------------------------------

  // [actions] add new todo
  function addToDo(toDo) {
    toDoList.value.push({ id: uniqid(), content: toDo.content, status: toDo.status })
  }

  // [actions] delete todo
  function deleteToDo(toDoId) {
    const idx = toDoList.value.findIndex((toDo) => toDo.id === toDoId)
    toDoList.value.splice(idx, 1)
  }

  // [actions] update todo content
  function updateToDoContent(toDo) {
    // condition: 'currToDo === toDo' can reduce access of 'id'
    // but need to confirm their addresses are same, not deepclone or different object
    const toDoItem = ref(toDoList.value.find((currToDo) => currToDo.id === toDo.id)) // ref to keep it reactive
    toDoItem.value.content = toDo.content
  }

  // [actions] toggle/set todo status
  const setToDoStatus = (toDo) => {
    const toDoItem = ref(toDoList.value.find((currToDo) => currToDo.id === toDo.id))

    // toggle status from checkbox
    if (toDo.type === 'toggle')
      toDoItem.value.status = toDoItem.value.status === 'pending' ? 'completed' : 'pending'
    // directly drag item to set status
    else if (toDo.type === 'set') toDoItem.value.status = toDo.status
  }

  // [actions] set current dragging id
  const setCurrentDragToDoId = (toDoId) => {
    currentDragToDoId.value = toDoId
  }

  // [actions] save to localStorage
  // function saveToDoList() {
  //   // localStorage.setItem(localStorageKeys.TO_DO_LIST_STORAGE_KEY, JSON.stringify(toDoList.value))
  //   localStorage.setItem(TO_DO_LIST_KEY, JSON.stringify(toDoList.value))
  // }

  // ---------------------------------------------------------

  // [actions] watch 'toDoList' to save to localStorage
  watchEffect(() => {
    localStorage.setItem(TO_DO_LIST_KEY, JSON.stringify(toDoList.value))
  })

  // ---------------------------------------------------------

  return {
    getToDoList,
    getPendingToDos,
    getCompletedToDos,
    getPendingToDoCount,
    getCompletedToDoCount,
    getCurrentDragToDoId,

    addToDo,
    deleteToDo,
    updateToDoContent,
    setToDoStatus,
    setCurrentDragToDoId
  }
})
