<template>
  <div class="row">
    <!-- left -->
    <div class="col">
      <ToDoListBodyListPending />
    </div>

    <div class="stroke"></div>

    <!-- right -->
    <div class="col">
      <ToDoListBodyListComplete />
    </div>
  </div>
</template>

<script setup>
import ToDoListBodyListPending from '@/components/todo/body/ToDoListBodyListPending.vue'
import ToDoListBodyListComplete from '@/components/todo/body/ToDoListBodyListComplete.vue'
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

.row {
  display: flex;
  flex-grow: 1;
  gap: 16px;
  width: 100%;
  overflow: hidden;
}

.col {
  width: 100%;
  padding-bottom: 28px;
}

.stroke {
  height: 100%;
  border: 1px dashed map-get($complementary, brown);
}
</style>
