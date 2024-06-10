import { useClientSocket } from 'revili/client'

import { Events } from '../../../../../../constants/index.js'

export function useSocket() {
  const socket = useClientSocket()

  const getInitFolder: () => Promise<any> = () => {
    return new Promise((resolve) => {
      socket?.on(Events.GET_INIT_FOLDER, (currentPath) => {
        resolve(currentPath + '/new-reco')
      })
      socket?.send(Events.GET_INIT_FOLDER, null)
    })
  }

  return { getInitFolder }
}
