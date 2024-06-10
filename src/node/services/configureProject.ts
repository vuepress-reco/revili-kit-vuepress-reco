import fs from 'node:fs'
import path from 'node:path'
import { Events } from '../../constants/index.js'

export function configureProject(socket: any) {
  socket?.on(Events.CONFIGURE_PROJECT, async (data: any) => {
    handlePackageJson(socket, data)
    handleConfig(socket, data)

    socket?.send(Events.CONFIGURE_PROJECT, {
      result: 'success',
      data: null
    })
  })
}

function handlePackageJson(socket: any, data: any) {
  const { projectPath, configProject } = data
  const packageFilePath = path.resolve(projectPath, './package.json')

  fs.readFile(packageFilePath, (err, data) => {
    if (err) {
      socket?.send(Events.CONFIGURE_PROJECT, {
        result: 'fail',
        data: 'Failed to modify package.json!'
      })

      return
    }

    const { title, description, recoThemeConfig: { author } } = configProject || {}

    const _data = JSON.parse(data.toString())
    _data.name = title
    _data.description = description
    _data.version = '1.0.0'
    _data.author = author

    const str = JSON.stringify(_data, null, 2)

    fs.writeFile(packageFilePath, str, () => {})
  })
}

function handleConfig(socket: any, { projectPath, configProject }: any) {
  const packageFilePath = path.resolve(projectPath, './.vuepress/config.ts')

  try {
    fs.readFile(packageFilePath, (err, data) => {
      if (err) {
        socket?.send(Events.CONFIGURE_PROJECT, {
          result: 'fail',
          data: 'Failed to modify config.ts!'
        })

        return
      }

      let _data = data.toString()

      const {
        title,
        description,
        bundler,
        recoThemeConfig: {
          author,
          docsDir,
          docsRepo,
          docsBranch,
          lastUpdated,
          lastUpdatedText
        }
      } = configProject || {}

      if (title) {
        _data = _data.replace(/title: (["'])(.*?)\1/, `title: "${title}"`)
      }

      if (description) {
        _data =_data.replace(/description: (["'])(.*?)\1/, `description: "${description}"`)
      }

      if (bundler && bundler === 'webpackBundler') {
        _data = _data.replace(/bundler: viteBundler\(\)/, `bundler: "${bundler}()"`)
      }

      if (author) {
        _data = _data.replace(/author: (["'])(.*?)\1/, `author: "${author}"`)
      }

      if (docsDir) {
        _data = _data.replace(/docsDir: (["'])(.*?)\1/, `docsDir: "${docsDir}"`)
      }

      if (docsRepo) {
        _data = _data.replace(/docsRepo: (["'])(.*?)\1/, `docsRepo: "${docsRepo}"`)
      }

      if (docsBranch) {
        _data = _data.replace(/docsBranch: (["'])(.*?)\1/, `docsBranch: "${docsBranch}"`)
      }

      if (lastUpdated) {
        _data = _data.replace(/lastUpdated: (["'])(.*?)\1/, `lastUpdated: "${lastUpdated}"`)
      }

      if (lastUpdatedText) {
        _data = _data.replace(/lastUpdatedText: (["'])(.*?)\1/, `lastUpdatedText: "${lastUpdatedText}"`)
      }

      fs.writeFile(packageFilePath, _data, () => {})
    })
  } catch(error) {
    socket?.send(Events.CONFIGURE_PROJECT, {
      result: 'fail',
      data: (error as unknown as Error).message ?? 'Failed to modify config.ts!'
    })
  }
}
