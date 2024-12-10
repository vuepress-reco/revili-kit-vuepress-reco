import { defineKit, useServerSocket, type Kit } from 'revili/node'

import { createProject, getInitFolder, configureProject, getProjectList, openEditor } from './services/index.js'

const defaultPlugin: Kit = defineKit({
  name: 'revili-kit-vuepress-reco',

  registerService: server => {
    const socket = useServerSocket(server)

    openEditor(socket)
    createProject(socket)
    getInitFolder(socket)
    getProjectList(socket)
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
