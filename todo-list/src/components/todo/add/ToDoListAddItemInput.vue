<template>
  <div class="to-do-item" state="placeholder">
    <!-- input field -->
    <input
      v-model="content"
      class="to-do-item-input body-7"
      type="text"
      placeholder="Placeholder"
      @change="updateInputContent"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['content'])
const emits = defineEmits(['update:modelValue'])

// ------------------------------------------------
// [update] update content when blur
const content = ref(props.content)
// input content update (for to-do adding, just update input text, not submit yet)
const updateInputContent = () => {
  emits('update:modelValue', content.value)
}
</script>
