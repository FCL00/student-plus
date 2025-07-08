<template>
  <div class="container">
     <student-search
      v-model:nameFilter="nameFilter"
      v-model:courseFilter="courseFilter"
    />
    <Header />
    <ul v-if="filteredStudents.length" class="card-list">
      <student-card
        v-for="student in filteredStudents"
        :key="student.id"
        :id="student.id"
        :firstname="student.firstname"
        :middlename="student.middlename"
        :lastname="student.lastname"
        :age="Number(student.age)"
        :birthdate="student.birthdate"
        :course="student.course"
        :address="student.address"
        @open-drawer="openDrawerApp"
      />
    </ul>
    <student-drawer v-model:visible="isDrawerVisible">
      <student-form :student="selectStudent" @on-drawer-close="closeDrawerApp"/> 
    </student-drawer>
    <el-empty v-if="!filteredStudents.length" description="No Students Found" />
  </div>
</template>

<script lang="ts" setup>
import { TheCard as StudentCard, TheHeader as Header, TheDrawer as StudentDrawer, TheSearchBar as StudentSearch } from '@/components/ui'
import { StudentForm } from '@/components'
// import { useAuth } from '@/composables/useAuth'
import {  watch, ref, computed } from 'vue'
import { useStudents } from '@/stores/students'
import type { Users } from "@/types"

// check authentication
// const { checkAuth } = useAuth()
// onMounted(() => {
//   checkAuth()
// })


const isDrawerVisible = ref(false);
const selectStudent = ref<Users>({})

function openDrawerApp(student: Users){
    isDrawerVisible.value = true
    selectStudent.value = { ...student };
    console.log(selectStudent.value)
}


function closeDrawerApp(){
  isDrawerVisible.value = false
  selectStudent.value = {}
}

// students store
const studentsStore = useStudents()

const nameFilter = ref('')
const courseFilter = ref('')

watch(nameFilter, (val) => studentsStore.setFilterName(val))
watch(courseFilter, (val) => studentsStore.setFilterCourse(val))

const filteredStudents = computed(() => studentsStore.allStudents)

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.card-list {
  --grid-cols: 4;
  max-width: 1440px;
  display: grid;
  grid-template-columns: repeat(var(--grid-cols), 1fr);
  gap: 12px;
  background-color: #fff;
  padding: 4px;
  border-radius: 4px;
  margin-bottom: 32px;
}

/* search-bar */
@media (max-width: 560px) {
  .search-bar {
    flex-direction: column;
  }

  .search-bar input {
    width: 100%;
  }
}

/* for grid column */
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



/* search-bar */
@media (max-width: 560px) {
  .search-bar {
    flex-direction: column;
    width: 100%;
  }

  :deep(.el-input) {
    width: 100%;
  }

  :deep(.el-select) {
    width: 100%;
    margin: 0px;
  }
}
</style>
