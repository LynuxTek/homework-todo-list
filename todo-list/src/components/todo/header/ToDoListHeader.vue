<template>
  <div class="row">
    <div class="header">
      <BaseTitle> My To Do List </BaseTitle>

      <!-- progress -->
      <div class="progress">
        <div class="progress-text subtitle-2">{{ Math.floor(progress * 100) }}%</div>
      </div>
    </div>

    <div class="stroke"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseTitle from '@/components/ui/BaseTitle.vue'

import { useToDoStore } from '@/stores/todo'
const store = useToDoStore()

const pendingToDoCount = computed(() => store.getPendingToDoCount)
const completedToDoCount = computed(() => store.getCompletedToDoCount)

const progress = computed(() => {
  const totalCount = pendingToDoCount.value + completedToDoCount.value
  if (totalCount === 0) return 0
  return completedToDoCount.value / totalCount
})
const progressDeg = computed(() => {
  return `${progress.value * 360}deg`
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;

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
  background: conic-gradient(#6fb890 v-bind(progressDeg), #ededed 0deg);
  border-radius: 50%;
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

  .progress-text {
    z-index: 3;
  }
}
</style>
