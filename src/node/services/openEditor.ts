import { execPromise } from 'revili/node'
import { Events } from '../../constants/index.js'

export function openEditor(socket: any) {
  socket?.on(Events.OPEN_EDITOR, async (projectPath: string) => {
    try {
      // 尝试使用 VSCode 打开项目
      await execPromise(`code "${projectPath}"`)

      socket?.send(Events.OPEN_EDITOR, {
        result: 'success',
        data: null
      })
    } catch (error) {
      socket?.send(Events.OPEN_EDITOR, {
        result: 'fail',
        data: '打开编辑器失败，请确保已安装 VSCode 并添加到系统环境变量中。'
      })
    }
  })
}
