import { Events } from '../../constants/index.js'

export function getInitFolder(socket: any) {
  socket?.on(Events.GET_INIT_FOLDER, () => {
    const initFloder = getUserPath()
    socket?.send(Events.GET_INIT_FOLDER, initFloder)
  })
}

function getUserPath() {
  const userPath = process.cwd()
  return userPath
}
