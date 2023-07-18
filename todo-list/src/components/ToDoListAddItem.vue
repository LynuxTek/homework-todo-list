<template>
  <div class="flex-row">
    <BaseCheckbox state="placeholder" />
    <BaseButton>新增事項</BaseButton>
  </div>
</template>

<script setup>
import BaseCheckbox from './ui/BaseCheckbox.vue'
import BaseButton from './ui/BaseButton.vue'
</script>

<style scoped>
.flex-row {
  display: flex;
  width: 100%;
  gap: 8px;
  margin: 24px 0;

  .checkbox {
    flex-grow: 1;
  }

  .btn {
    width: 84px;
  }
}
</style>
