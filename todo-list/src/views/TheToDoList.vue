<template>
  <div class="container">
    <!-- header -->
    <ToDoListHeader />

    <!-- add -->
    <ToDoListAddItem />

    <!-- todos -->
    <ToDoListBody />
  </div>
</template>

<script setup>
import ToDoListHeader from '@/components/todo/header/ToDoListHeader.vue'
import ToDoListAddItem from '@/components/todo/add/ToDoListAddItem.vue'
import ToDoListBody from '@/components/todo/body/ToDoListBody.vue'
</script>

<style scoped>
.container {
  position: relative;
  width: 461px;
  height: 511px;
  border-radius: 1rem;
  background: #fff;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
