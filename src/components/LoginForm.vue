<template>
  <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm">
    <el-form-item prop="username" label-position="top">
      <el-input
        v-model="ruleForm.username"
        placeholder="USERNAME"
        :prefix-icon="User"
        clearable
        auto-complete="off"
      />
    </el-form-item>

    <el-form-item prop="password" label-position="top">
      <el-input
        v-model="ruleForm.password"
        :placeholder="props.newpassword ? 'NEW PASSWORD' : 'PASSWORD'"
        :prefix-icon="Suitcase"
        show-password
        clearable
        auto-complete="off"
      />
    </el-form-item>

    <el-form-item v-if="props.newpassword" prop="newpassword" label-position="top">
      <el-input
        v-model="ruleForm.newpassword"
        placeholder="CONFIRM PASSWORD"
        :prefix-icon="Suitcase"
        show-password
        clearable
        auto-complete="off"
      />
    </el-form-item>

    <RouterLink v-if="!props.newpassword" to="/forgot-password" class="right-link"
      >Forgot Password</RouterLink
    >

    <el-button @click="submitForm(ruleFormRef)">
      {{ props.newpassword ? 'Save Changes' : 'Login' }}
    </el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps } from 'vue'
import type { FormInstance, FormRules, FormItemRule } from 'element-plus'
import { User, Suitcase } from '@element-plus/icons-vue'
import type { LoginRuleForm } from '@/types'
import { RouterLink } from 'vue-router'
import { useAccount } from '@/stores/account'

const { onLogin, onForgotPassword } = useAccount()

// toggle for newpassword input
const props = defineProps({
  newpassword: {
    type: Boolean,
    default: false,
  },
})

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<LoginRuleForm>({
  username: '',
  password: '',
  newpassword: '',
})

const passwordValidator = (rule: any, value: string, callback: any) => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/
  if (!value) {
    return callback(new Error('Password is required.'))
  } else if (!pattern.test(value) && props.newpassword) {
    return callback(
      new Error('Password must contain uppercase, lowercase, number, and special character.'),
    )
  }
  return callback()
}

const matchPassword = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('Password is required.'))
  } else if (value !== ruleForm.password) {
    return callback(new Error('Password and Confirm Password doesnt match'))
  }
}

const rules = reactive<FormRules<LoginRuleForm>>({
  username: [{ required: true, message: 'username is required', trigger: 'blur' }],
  password: [
    { required: true, message: 'password is required', trigger: 'blur' },
    { validator: passwordValidator, trigger: 'blur' },
  ],
  newpassword: [
    { required: true, message: 'confirm password is required', trigger: 'blur' },
    { validator: passwordValidator, trigger: 'blur' },
    { validator: matchPassword, trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (props.newpassword) {
        onForgotPassword(ruleForm.username, ruleForm.password, ruleForm.newpassword ?? '')
        console.log('forgot password')
      } else {
        console.log('its being login')
        onLogin(ruleForm)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
a {
  display: inline;
}
form {
  width: 500px;
  padding: 20px;
}

.right-link {
  margin-bottom: 4px;
  display: flex;
  justify-content: end;
  color: white;
  text-decoration: none;
}

:deep(.el-button) {
  width: 100%;
  height: 50px;
  margin: 12px 0px;
}
:deep(.el-input) {
  margin-bottom: 12px;
  --el-input-placeholder-color: #fff;
}
:deep(.el-input__wrapper) {
  background-color: transparent;
  color: white;
}
:deep(.el-input__inner) {
  background-color: transparent;
  color: #fff;
  border-radius: 4px;
  height: 50px;
}

:deep(.el-input__prefix) {
  font-size: 1rem;
}

:deep(.el-input__icon) {
  color: white;
}
</style>
