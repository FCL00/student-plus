<template>
  <div class="container">
    <the-header></the-header>
    <ul class="card-list">
      <the-card
        v-for="student in students"
        :key="student.firstname"
        :id="student.firstname"
        :firstname="student.firstname"
        :middlename="student.middlename"
        :lastname="student.lastname"
        :age="Number(student.age)"
        :birthdate="student.birthdate"
        :course="student.course"
        :address="student.address"
      ></the-card>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { TheCard, TheHeader } from '@/components/ui'
import { useAuth } from '@/composables/useAuth'
import { onMounted } from 'vue'
import { useStudents } from '@/stores/students'

const { students } = useStudents()

const { checkAuth } = useAuth()

onMounted(() => {
  checkAuth()
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-list {
  --grid-cols: 5;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(var(--grid-cols), 1fr);
  gap: 12px;
  background-color: #fff;
  padding: 4px;
  border-radius: 4px;
  margin: 8rem 0px;
}

@media (max-width: 1460px) {
  .container {
    padding: 20px;
  }

  .card-list {
    --grid-cols: 4;
  }
}

@media (max-width: 1255px) {
  .card-list {
    --grid-cols: 3;
  }
}

@media (max-width: 900px) {
  .card-list {
    --grid-cols: 2;
  }
}

@media (max-width: 700px) {
  .card-list {
    --grid-cols: 1;
    width: 100%;
  }
}
</style>
