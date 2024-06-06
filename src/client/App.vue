<template>
  <n-config-provider :theme-overrides="themeOverrides">
  <n-layout class="reco-container">
    <n-layout-header style="height: 64px;" content-style="" bordered>
      <Navbar style="height: 100%;" />
    </n-layout-header>

    <n-layout position="absolute" style="top: 64px;" content-style="padding: 24px;" :native-scrollbar="false">
      <n-message-provider>
        <RouterView />
      </n-message-provider>
    </n-layout>
  </n-layout></n-config-provider>
</template>

<script setup lang="ts">
import Navbar from "./components/layouts/Navbar/index.vue";

const themeOverrides = {
    common: {
      primaryColor: '#5D67E8'
    },
  }
</script>

<style lang="postcss">
.reco-container {
  height: 100vh;
  .n-avatar {
    @apply ml-4;
  }
}
</style>
