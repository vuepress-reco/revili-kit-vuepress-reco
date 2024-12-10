import { getKitData } from 'revili/node'
import { Events } from '../../constants/index.js'

export function getProjectList(socket: any) {
  socket?.on(Events.GET_PROJECT_LIST, async () => {
    try {
      // 通过 getKitData 获取项目列表数据
      const kitData = await getKitData('revili-kit-vuepress-reco')

      // 发送数据回客户端
      socket?.send(Events.GET_PROJECT_LIST, {
        result: 'success',
        data: (kitData as any)?.projectList || []
      })
    } catch (error) {
      socket?.send(Events.GET_PROJECT_LIST, {
        result: 'fail',
        data: (error as unknown as Error)?.message ?? '获取项目列表失败!'
      })
    }
  })
}