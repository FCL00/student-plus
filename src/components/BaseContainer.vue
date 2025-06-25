<template>
  <div class="container">
    <slot></slot>
    <img :src="curve" alt="curve" class="top-right" loading="eager" />
    <img :src="ellispse" alt="ellispse" class="bottom-left" loading="eager" />
  </div>
</template>

<script lang="ts" setup>
import curve from '@/assets/curve.png'
import ellispse from '@/assets/Ellipse.png'
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: var(--brand-blue);
  position: relative;
  z-index: 10;
}

.top-right,
.bottom-left {
  position: absolute;
  z-index: -1;
}

.top-right {
  top: 0px;
  right: 0px;
}

.bottom-left {
  bottom: 0px;
  left: 0px;
}

@media (max-width: 1174px) {
  .top-right {
    width: 60%;
  }
}

@media (max-width: 560px) {
  .top-right {
    width: 70%;
  }
}

@media (max-width: 344px) {
  .bottom-left {
    width: 50%;
  }
}

@media (max-width: 360px) {
  .bottom-left {
    width: 60%;
  }
}
</style>
