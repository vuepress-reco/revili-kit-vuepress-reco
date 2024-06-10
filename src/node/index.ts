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

  viteOptions: {
    resolve: {
      alias: [
        {
          find: 'date-fns/esm/',
          replacement: 'date-fns/esm/',
        },
        {
          find: 'date-fns/',
          replacement: 'date-fns/esm/',
        },
      ],
    },
  }
})



export default defaultPlugin
