import { defineKit, useServerSocket, type Kit } from 'revili/node'

import { createProject, getInitFolder, configureProject } from './services/index.js'

const defaultPlugin: Kit = defineKit({
  name: 'revili-kit-default',

  registerService: server => {
    const socket = useServerSocket(server)

    createProject(socket)
    getInitFolder(socket)
    configureProject(socket)
  },

  registerCommand: ({program}) => {},
})



export default defaultPlugin
