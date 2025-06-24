<template>
  <el-card shadow="hover">
    <div class="card-header">
      <div class="card-group">
        <img :src="avatar" alt="profile picture of the user" loading="lazy" />
        <h5>{{ fullname }}</h5>
      </div>
      <button color="#2148c0" @click="drawer = true">
        <el-icon color="white">
          <Edit />
        </el-icon>
      </button>
    </div>
    <div class="card-body">
      <p>Age : {{ props.age }} / Birthday : {{ props.birthdate }}</p>
    </div>
    <div style="padding: 4px">
      <p>{{ props.course }}</p>
      <p>{{ props.address }}</p>
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
      :id="Number(props.id)"
    ></student-form>
  </the-drawer>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref } from 'vue'
import { ElCard } from 'element-plus'
import avatar from '@/assets/avatar.png'
import type { Users } from '@/types'
import { Edit } from '@element-plus/icons-vue'
import { TheDrawer } from '@/components/ui'
import { StudentForm } from '@/components'

// to toggle the drawer
const drawer = ref(false)

// display the fullname
const fullname = computed(() => `${props.firstname} ${props.middlename} ${props.lastname} `)

// define props
const props = defineProps<Users>()
</script>

<style scoped>
p {
  font-size: small;
}

:deep(.el-card__body) {
  --el-card-padding: 12px;
}

.card-header {
  position: relative;
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
