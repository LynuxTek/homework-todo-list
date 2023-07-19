import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import uniqid from 'uniqid'

import { TO_DO_LIST_STORAGE_KEY } from '../const/localStorageKeys'

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

  // [state] todo list (array)
  const toDoList = ref(JSON.parse(localStorage.getItem(TO_DO_LIST_STORAGE_KEY)) ?? [])

  // [getters] return pending/completed todos
  const getPendingToDos = computed(() => toDoList.value.filter((td) => td.status === 'pending'))
  const getCompletedToDos = computed(() => toDoList.value.filter((td) => td.status === 'completed'))

  // [actions] add new todo
  function addToDo(payload) {
    toDoList.value.push({ id: uniqid(), content: payload.content, status: payload.status })
  }

  // [actions] delete todo
  function deleteToDo(payload) {
    const idx = toDoList.value.findIndex((td) => td.id === payload.id)
    toDoList.value.splice(idx, 1)
  }

  // [actions] update todo content
  function updateToDoContent(payload) {
    // condition: 'td === payload' can reduce access of 'id'
    // but need to confirm their addresses are same, not deepclone or different object
    const todo = ref(toDoList.value.find((td) => td.id === payload.id)) // ref to keep it reactive
    todo.value.content = payload.content
  }

  // [actions] toggle todo
  function toggleToDo(payload) {
    const todo = ref(toDoList.value.find((td) => td.id === payload.id))
    todo.value.status = todo.value.status === 'pending' ? 'completed' : 'pending'
  }

  const setToDoStatus = (payload) => {
    const todo = ref(toDoList.value.find((td) => td.id === payload.id))
    todo.value.status = payload.status
  }

  // [actions] save to localStorage
  function saveToDoList() {
    localStorage.setItem(TO_DO_LIST_STORAGE_KEY, JSON.stringify(toDoList.value))
  }

  return {
    getCompletedToDos,
    getPendingToDos,

    addToDo,
    deleteToDo,
    updateToDoContent,
    toggleToDo,
    setToDoStatus,

    saveToDoList
  }
})
