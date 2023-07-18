import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import uniqid from 'uniqid'

// ref -> state
// computed -> getters
// function() -> actions

export const useToDoStore = defineStore('todo', () => {
  // toDoList = { 'pending': [toDo<Object>], 'completed': [toDo<Object>] }
  // toDo:
  // - id: (unique, generate from 'uniqid')
  // - content: String
  // - status: 'pending', 'completed'
  const toDoList = ref(JSON.parse(localStorage.getItem('toDoList')) ?? [])

  // [getters] return pending/completed todos
  const getPendingToDos = computed(() => toDoList.value.filter((td) => td.status === 'pending'))
  const getCompletedToDos = computed(() => toDoList.value.filter((td) => td.status === 'completed'))

  // [actions] add new todo
  function addToDo(payload) {
    toDoList.value.push({ id: uniqid(), content: payload.content, status: payload.status })
  }

  // [actions] update todo content
  function updateToDoContent(payload) {
    const todo = ref(toDoList.value.find((td) => td.id === payload.id))
    todo.value.content = payload.content
  }

  // [actions] delete todo
  function deleteToDo(payload) {
    const idx = toDoList.value.findIndex((td) => td.id === payload.id)
    toDoList.value.splice(idx, 1)
  }

  // [actions] toggle todo
  function toggleToDo(payload) {
    const todo = ref(toDoList.value.find((td) => td.id === payload.id))
    todo.value.status = todo.value.status === 'pending' ? 'completed' : 'pending'
  }

  // [actions] save to localStorage
  function saveToDoList() {
    console.log(JSON.stringify(toDoList.value))
    localStorage.setItem('toDoList', JSON.stringify(toDoList.value))
  }

  return {
    getCompletedToDos,
    getPendingToDos,
    addToDo,
    deleteToDo,
    updateToDoContent,
    toggleToDo,
    saveToDoList
  }
})
