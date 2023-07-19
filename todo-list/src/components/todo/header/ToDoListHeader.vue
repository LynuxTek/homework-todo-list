<template>
  <div class="row">
    <div class="header">
      <BaseTitle>My To Do List</BaseTitle>

      <!-- progress -->
      <div class="progress">
        <span class="subtitle-2">25%</span>
      </div>
    </div>

    <div class="stroke"></div>
  </div>
</template>

<script setup>
import BaseTitle from '@/components/ui/BaseTitle.vue'
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.row {
  width: 100%;
}

.header {
  width: 100%;
  text-align: center;
  margin-top: 28px;
  margin-bottom: 34px;
}

.stroke {
  width: 100%;
  border: 1px solid map-get($complementary, brown);
  border-radius: 1px;
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
