<template>
  <el-card shadow="hover">
    <div class="card-header">
      <div class="card-group">
        <el-icon><User /></el-icon>
        <h5 class="fullname">{{ fullname }}</h5>
      </div>
      <button color="#2148c0" @click="drawer = true">
        <el-icon color="white">
          <Edit />
        </el-icon>
      </button>
    </div>
    <div class="card-body" style="padding: 12px">
      <div class="icon">
        <el-icon><Calendar /></el-icon>
        <p>Age: {{ props.age }} | Birthdate: {{ props.birthdate }}</p>
      </div>
      <div class="icon">
        <el-icon><School /></el-icon>
        <p>Course: {{ props.course }}</p>
      </div>
      <div class="icon">
        <el-icon><MapLocation /></el-icon>
        <p>Address: {{ props.address }}</p>
      </div>
    </div>
  </el-card>

  <the-drawer v-model:visible="drawer">
    <student-form
      :firstname="props.firstname"
      :lastname="props.lastname"
      :middlename="props.middlename"
      :age="props.age"
      :birthdate="birthdate"
      :address="props.address"
      :course="props.course"
      :id="props.id"
    ></student-form>
  </the-drawer>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue'
import { ElCard } from 'element-plus'
import type { Users } from '@/types'
import { Edit, Calendar, School, MapLocation, User } from '@element-plus/icons-vue'
import { TheDrawer } from '@/components/ui'
import { StudentForm } from '@/components'

// to toggle the drawer
const drawer = ref(false)

// display the fullname
const fullname = computed(
  () => `${props.firstname} ${props.middlename.charAt(0)}. ${props.lastname} `,
)

// define props
const props = defineProps<Users>()
</script>

<style scoped>
.fullname {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 12px;
}
p {
  font-size: small;
}

:deep(.el-card__body) {
  --el-card-padding: 12px;
}

.card-header {
  position: relative;
  padding: 8px;
}

.card-body,
.card-group {
  padding: 4px;
}

.card-header img {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-right: 12px;
}

.card-group {
  display: flex;
  align-items: center;
}

.icon {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

button {
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 4px;
  outline: none;
  background-color: var(--brand-blue);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
}
</style>
