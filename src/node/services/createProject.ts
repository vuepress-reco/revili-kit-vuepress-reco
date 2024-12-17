import path from 'node:path'
import { getKitData, gitly, updateKitData, updateKitDataItem } from 'revili/node'
import { Events } from '../../constants/index.js'

export function createProject(socket: any) {
  socket?.on(Events.CREATE_PROJECT, async (projectPath: string) => {
    try {
      const [cachePath, userPath] = await gitly(
        `vuepress-reco/vuepress-theme-reco-demo#v2`,
        path.resolve(projectPath),
        {
          cache: false,
          force: true
        }
      )

      if (!cachePath && !userPath) {
        socket?.send(Events.CREATE_PROJECT, {
          result: 'fail',
          data: 'Repository or branch does not exist!'
        })
        return
      }

      // 获取项目名称 (取路径的最后一段)
      const projectName = path.basename(projectPath)

      // 更新项目列表数据
      const projectList = await getKitData<{
        projectList: {
          name: string
          path: string
        }[]
      }>('projectList')

      const newProjectList = [
        ...(projectList || []),
        {
          name: projectName,
          path: projectPath
        }
      ]

      await updateKitDataItem('projectList', newProjectList)

      socket?.send(Events.CREATE_PROJECT, {
        result: 'success',
        data: newProjectList
      })
    } catch(error) {
      socket?.send(Events.CREATE_PROJECT, {
        result: 'fail',
        data: (error as unknown as Error)?.message ?? 'Network exception, failed to get template!'
      })
    }
  })
}
