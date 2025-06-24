<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
    <header>
      <slot name="header"></slot>
    </header>
    <el-form-item label="Firstname" prop="firstname" label-position="top">
      <el-input
        v-model="ruleForm.firstname"
        placeholder="Enter your firstname"
        clearable
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="Middlename" prop="middlename" label-position="top">
      <el-input
        v-model="ruleForm.middlename"
        placeholder="Enter your middle name"
        clearable
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="Lastname" prop="lastname" label-position="top">
      <el-input
        v-model="ruleForm.lastname"
        placeholder="Enter your last name"
        clearable
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="Age" prop="age" label-position="top">
      <el-input v-model="ruleForm.age" placeholder="Enter your age" clearable autocomplete="off" />
    </el-form-item>
    <el-form-item label="Birthdate" prop="birthdate" label-position="top">
      <el-date-picker
        v-model="ruleForm.birthdate"
        type="date"
        placeholder="Select your birthdate"
        size="large"
      />
    </el-form-item>

    <el-form-item label="Course" prop="course" label-position="top">
      <el-select v-model="ruleForm.course" placeholder="Select" size="large">
        <el-option
          v-for="(course, index) in courses"
          :key="index"
          :label="course"
          :value="course"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Address" prop="address" label-position="top">
      <el-input
        v-model="ruleForm.address"
        placeholder="Enter your full address"
        clearable
        autocomplete="off"
      />
    </el-form-item>

    <el-button color="#181818" @click="submitForm(ruleFormRef)" :icon="Edit">{{
      BtnLabel
    }}</el-button>
    <el-button
      v-if="props.BtnDelete"
      type="danger"
      @click="onDeleteStudentInfo(Number(ruleForm.id))"
      :icon="Delete"
    >
      Delete
    </el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { Users, UsersRuleForm } from '@/types'
import { Edit, Delete } from '@element-plus/icons-vue'
import { courses } from '@/constants'
import { useStudents } from '@/stores/students'
import { ElMessage } from 'element-plus'

const { onUpdateStudentInfo, onDeleteStudentInfo, onAddStudents } = useStudents()

interface StudentFormProps {
  id: number | string
  firstname: string
  middlename: string
  lastname: string
  birthdate: string
  age: number
  address: string
  course: string
  BtnDelete?: boolean
  BtnLabel?: string
  OnAdd?: boolean
}

const props = withDefaults(defineProps<StudentFormProps>(), {
  BtnDelete: true,
  BtnLabel: 'Save Changes',
  OnAdd: false,
})

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<Users>({
  id: props.id,
  firstname: props.firstname,
  middlename: props.middlename,
  lastname: props.lastname,
  age: Number(props.age),
  address: props.address,
  birthdate: props.birthdate,
  course: props.course,
})

// validate the user inputs
const rules = reactive<FormRules<UsersRuleForm>>({
  firstname: [{ required: true, message: 'firstname is required', trigger: 'blur' }],
  middlename: [{ required: true, message: 'middlename is required', trigger: 'blur' }],
  lastname: [{ required: true, message: 'lastname is required', trigger: 'blur' }],
  age: [{ required: true, message: 'age is required', trigger: 'blur' }],
  address: [{ required: true, message: 'address is required', trigger: 'blur' }],
  course: [{ required: true, message: 'course is required', trigger: 'blur' }],
  birthdate: [{ required: true, message: 'birthdate is required', trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (props.OnAdd) {
        onAddStudents(ruleForm)
        console.log('being added', ruleForm)
      } else if (!props.OnAdd) {
        onUpdateStudentInfo(ruleForm)
        console.log('update')
      } else {
        ElMessage.error('Something went wrong')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
:deep(.el-select) {
  width: 100%;
}
.form-group {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
}

.form-group > * {
  width: 100%;
}

:deep(.el-date-editor) {
  --el-date-editor-width: 100%;
}
h2 {
  margin-bottom: 12px;
}

:deep(.el-input__wrapper) {
  width: 100%;
  padding: 5px;
}
:deep(.el-button) {
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-control {
  padding: 4px;
}
</style>
