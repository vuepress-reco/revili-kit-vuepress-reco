<template>
  <n-flex align="center" class="navbar-container">
    <n-avatar
      color="#fff"
      size="large"
      src="./assets/logo.png"
      @click="push('/')"
    />
    <h2>Reco Theme Management Tool</h2>
  </n-flex>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const { push } = useRouter()
</script>

<style lang="postcss">
.navbar-container {
  .n-avatar {
    @apply cursor-pointer;
  }
}
</style>
