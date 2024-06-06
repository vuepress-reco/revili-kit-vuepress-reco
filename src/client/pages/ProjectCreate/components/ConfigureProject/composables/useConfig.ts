export function useConfig() {
  const rules = {
    title: { required: true, message: 'Input the title of site', trigger: ['input'] },
    description: { required: true, message: 'Input the description of site', trigger: ['input'] },
    bundler: { required: true, message: 'Select the bundler of vuepress', trigger: ['input'] },
    recoThemeConfig: {
      author: { required: true, message: 'Input the name of author', trigger: ['input'] },
      docsDir: { required: true, message: 'Input the folder where the document is located, default /', trigger: ['input'] },
    }
  }

  const bundlerOptions = [
    { label: 'viteBundler', value: 'viteBundler' },
    { label: 'webpackBundler', value: 'webpackBundler' }
  ]

  return { rules, bundlerOptions }
}
