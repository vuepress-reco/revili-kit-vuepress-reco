<template>
  <n-flex align="center" class="navbar-container">
    <n-avatar
      color="#fff"
      size="large"
      src="./assets/logo.png"
    />

    <n-flex class="light-green" justify="center" style="flex: 1">
      <n-button
        :tertiary="navbarActive !== 'list'"
        :strong="navbarActive === 'list'"
        :secondary="navbarActive === 'list'"
        type="info"
        @click="switchNavbar('list')"
      >
        <template #icon>
          <n-icon>
            <Apps />
          </n-icon>
        </template>
        项目列表
      </n-button>

      <n-button
        :tertiary="navbarActive !== 'create'"
        :strong="navbarActive === 'create'"
        :secondary="navbarActive === 'create'"
        type="success"
        @click="switchNavbar('create')"
      >
        <template #icon>
          <n-icon>
            <AddCircleOutline />
          </n-icon>
        </template>
        创建项目
      </n-button>
    </n-flex>
  </n-flex>
</template>

<script setup lang="ts">
import { type Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { AddCircleOutline, Apps } from "@vicons/ionicons5";

const router = useRouter()

type TNavbar = 'list' | 'create'
const navbarActive: Ref<TNavbar> = ref('list')

const switchNavbar = (item: TNavbar) => {
  navbarActive.value = item
  router.push(`/${navbarActive.value === 'list' ? '' : navbarActive.value}`)
}
</script>

<style lang="postcss">
.navbar-container {
  height: 100vh;
  .n-avatar {
    @apply ml-4;
  }
}
</style>
