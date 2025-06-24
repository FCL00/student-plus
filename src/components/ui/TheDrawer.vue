<template>
  <teleport to="#portal">
    <el-drawer
      class="drawer"
      :model-value="visible"
      @update:model-value="emit('update:visible', $event)"
      title="Student Infomation"
      direction="rtl"
    >
      <slot></slot>
    </el-drawer>
  </teleport>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps<{
  visible: boolean
}>()
const emit = defineEmits(['update:visible'])
</script>

<style scoped>
:deep(.el-overlay > .el-drawer) {
  width: 50% !important;
}
</style>
