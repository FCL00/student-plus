<template>
  <teleport to="#portal">
    <el-drawer
      class="drawer"
      :model-value="visible"
      @update:model-value="emit('update:visible', $event)"
      title="Student Infomation"
      direction="rtl"
      custom-class="drawer"
      :size="`${size}%`"
    >
      <slot></slot>
    </el-drawer>
  </teleport>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, onUnmounted, nextTick, ref } from 'vue'

defineProps<{
  visible: boolean
}>()
const emit = defineEmits(['update:visible'])

const size = ref<number>(50)

function resize() {
  if (window.innerWidth < 1000 && window.innerWidth >= 500) {
    size.value = 50
  } else if (window.innerWidth < 500) {
    size.value = 100
  }
}

onMounted(() => {
  nextTick(() => {
    window.addEventListener('resize', resize)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<style scoped></style>
