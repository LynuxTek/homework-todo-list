<template>
  <div class="header">
    <BaseTitle>My To Do List</BaseTitle>
    <!-- progress -->
    <div class="progress">
      <span class="subtitle-2">25%</span>
    </div>
  </div>
</template>

<script setup>
import BaseTitle from './ui/BaseTitle.vue'
</script>

<style scoped>
.header {
  width: 100%;
  text-align: center;
  margin-top: 28px;
  margin-bottom: 34px;
}

.progress {
  position: absolute;
  right: 30px;
  top: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: rgb(184, 184, 184);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    width: 46px;
    height: 46px;
    left: 5px;
    top: 5px;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    z-index: 2;
  }

  &::after {
    content: '';
    position: absolute;
    width: 56px;
    height: 56px;
    left: 0;
    top: 0;
    border-radius: 50%;
    background-color: #6fb890;
    z-index: 2;
  }
}
</style>
