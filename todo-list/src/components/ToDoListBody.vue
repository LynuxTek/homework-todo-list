<template>
  <div class="two-cols">
    <!-- left -->
    <div class="col">
      <ToDoListBodyListPending />
    </div>

    <div class="stroke">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2"
        height="346"
        viewBox="0 0 2 346"
        fill="none"
      >
        <path d="M1 0L1 346" stroke="#D69364" stroke-dasharray="2 2" />
      </svg>
    </div>

    <!-- right -->
    <div class="col">
      <ToDoListBodyListComplete />
    </div>
  </div>
</template>

<script setup>
import ToDoListBodyListPending from './ToDoListBodyListPending.vue'
import ToDoListBodyListComplete from './ToDoListBodyListComplete.vue'
</script>

<style scoped>
.two-cols {
  display: flex;
  width: 100%;
  overflow: hidden;
}
.col {
  width: 100%;
}
.stroke {
  margin: 0 16px;
}
</style>
