<template>
  <main>
    <TheToDoList />
  </main>
</template>

<script setup>
import TheToDoList from '@/views/TheToDoList.vue'
</script>

<style scoped>
main {
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
