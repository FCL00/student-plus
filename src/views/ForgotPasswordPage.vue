<template>
  <base-container>
    <login-form :newpassword="true"></login-form>
  </base-container>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { BaseContainer, LoginForm } from '@/components'
import { useAuth } from '@/composables/useAuth'

// const { checkAuth } = useAuth()
onMounted(() => {
  // checkAuth()
})
</script>

<style></style>
