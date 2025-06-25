<template>
  <div class="container">
    <h1>404 NOT FOUND</h1>
    <router-link to="/">&laquo; Go back</router-link>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
h1 {
  font-size: 10rem;
  margin-bottom: 20px;
  text-align: center;
  color: var(--brand-blue);
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

@media (max-width: 650px) {
  h1 {
    font-size: 5rem;
  }
}
</style>
