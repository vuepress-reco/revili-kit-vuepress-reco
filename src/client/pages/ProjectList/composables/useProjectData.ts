import { ref } from 'vue'
import { useClientSocket } from 'revili/client'
import { Events } from '../../../../constants/index.js'
import type { Project } from '../types.js'

export function useProjectData() {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const socket = useClientSocket()

  // 监听返回的项目数据
  socket?.on(Events.GET_PROJECT_LIST, ({ result, data }: { result: string, data: any[] }) => {
    if (result === 'success') {
      projects.value = data.map((item, index) => ({
        no: index + 1,
        ...item
      }))
    } else {
      console.error('Failed to fetch project list: ', data)
    }
    loading.value = false
  })

  const fetchProjects = async () => {
    loading.value = true
    // @ts-ignore
    socket?.send(Events.GET_PROJECT_LIST)
  }

  return {
    projects,
    loading,
    fetchProjects
  }
}
