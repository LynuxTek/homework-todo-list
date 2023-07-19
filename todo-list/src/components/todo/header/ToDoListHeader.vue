<template>
  <div class="row">
    <div class="header">
      <BaseTitle>My To Do List</BaseTitle>

      <!-- progress -->
      <div class="progress" :style="{ background: progressStyle }">
        <div class="progress-text subtitle-2">{{ Math.floor(progress * 100) }}%</div>
      </div>
    </div>

    <div class="stroke"></div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseTitle from '@/components/ui/BaseTitle.vue'

import { useToDoStore } from '@/stores/todo'
const store = useToDoStore()

const pendingToDoCount = computed(() => store.getPendingToDoCount)
const completedToDoCount = computed(() => store.getCompletedToDoCount)

const progress = computed(
  () => completedToDoCount.value / (pendingToDoCount.value + completedToDoCount.value)
)
const progressStyle = computed(
  () => `conic-gradient(#6fb890 ${progress.value * 360}deg, #ededed 0deg)`
)
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
