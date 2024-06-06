<template>
  <n-flex align="center" class="navbar-container">
    <n-button
      round
      type="primary"
      class="btn-list"
      :strong="currentRoute.path === '/projects'"
      :tertiary="currentRoute.path !== '/projects'"
      :secondary="currentRoute.path === '/projects'"
      @click="push('/projects')"
    >
      <template #icon>
        <n-icon><Apps /></n-icon>
      </template>
      Project List
    </n-button>

    <n-flex class="light-green" justify="center" style="flex: 1">
      <n-avatar
        color="#fff"
        size="large"
        src="./assets/logo.png"
        @click="push('/')"
      />

    </n-flex>
    <n-button
      round
      type="success"
      class="btn-create"
      :strong="currentRoute.path === '/create'"
      :tertiary="currentRoute.path !== '/create'"
      :secondary="currentRoute.path === '/create'"
      @click="push('/create')"
    >
      <template #icon>
        <n-icon><AddCircleOutline /></n-icon>
      </template>
      Create Project
    </n-button>
  </n-flex>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { AddCircleOutline, Apps } from "@vicons/ionicons5";

const { currentRoute, push } = useRouter()
</script>

<style lang="postcss">
.navbar-container {
  height: 100vh;
  .btn-list {
    @apply ml-8;
  }
  .btn-create {
    @apply mr-8;
  }
  .n-avatar {
    @apply cursor-pointer;
  }
}
</style>
