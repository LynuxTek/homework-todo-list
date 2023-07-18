<template>
  <div class="container">
    <!-- header -->
    <ToDoListHeader />

    <!-- stroke -->
    <BaseStroke />

    <!-- add -->
    <ToDoListAddItem />

    <!-- todos -->
    <ToDoListBody />
  </div>
</template>

<script setup>
import ToDoListHeader from './ToDoListHeader.vue'
import ToDoListAddItem from './ToDoListAddItem.vue'
import ToDoListBody from './ToDoListBody.vue'
import BaseStroke from './ui/BaseStroke.vue'
</script>

<style scoped>
.container {
  position: relative;
  width: 461px;
  height: 511px;
  border-radius: 16px;
  background: #fff;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
