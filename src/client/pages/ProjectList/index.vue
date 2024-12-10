<template>
  <n-flex class="operation-bar" justify="end">
    <n-button
      round
      type="primary"
      class="btn-list"
      :secondary="true"
      @click=""
    >
      <template #icon>
        <n-icon><Apps /></n-icon>
      </template>
      Import Project
    </n-button>


    <n-button
      round
      type="success"
      class="btn-create"
      :secondary="true"
      @click="push('/create')"
    >
      <template #icon>
        <n-icon><AddCircleOutline /></n-icon>
      </template>
      Create Project
    </n-button>
  </n-flex>

  <n-data-table
    :columns="columns"
    :data="projects"
    :pagination="false"
    :bordered="false"
    :loading="loading"
  />
</template>

<script lang="ts" setup>
import { h, onMounted } from 'vue'
import { NButton } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { useRouter } from "vue-router"
import { AddCircleOutline, Apps } from "@vicons/ionicons5"
import { useProjectData } from './composables/useProjectData'
import type { Project } from './types'
import { useClientSocket } from 'revili/client'
import { Events } from '../../../constants'

const { push } = useRouter()
const { projects, loading, fetchProjects } = useProjectData()

// 在组件挂载时获取项目数据
onMounted(() => {
  fetchProjects()
})

function createColumns({ openEditor }: {
  openEditor: (row: Project) => void
}): DataTableColumns<Project> {
  return [
    {
      title: 'No',
      key: 'no'
    },
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Path',
      key: 'path'
    },
    {
      title: 'Action',
      key: 'actions',
      render(row: Project) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => openEditor(row)
          },
          { default: () => 'Open Editer' }
        )
      }
    }
  ]
}

const columns = createColumns({
  openEditor(row: Project) {
    const socket = useClientSocket()
    socket?.send(Events.OPEN_EDITOR, row.path)
  }
})
</script>

<style scoped lang="postcss">
.operation-bar {
  @apply my-6;
}
</style>
