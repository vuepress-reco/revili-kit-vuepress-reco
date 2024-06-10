import path from 'node:path'

import { default as gitly } from 'gitly'

import { Events } from '../../constants/index.js'

export function createProject(socket: any) {
  socket?.on(Events.CREATE_PROJECT, async (projectPath: string) => {
    try {
      const [cachePath, userPath] = await gitly.default(
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

      socket?.send(Events.CREATE_PROJECT, {
        result: 'success',
        data: null
      })
    } catch(error) {
      socket?.send(Events.CREATE_PROJECT, {
        result: 'fail',
        data: (error as unknown as Error)?.message ?? 'Network exception, failed to get template!'
      })
    }
  })
}
