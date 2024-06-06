import { reactive } from "vue"
import { type RecoThemeData } from 'vuepress-theme-reco/lib/types'

export interface StepFormData {
  projectPath: string,
  configProject: ConfigProject
}

export interface ConfigProject {
  title: string
  description: string
  bundler: string
  recoThemeConfig: RecoThemeData
}

const dataSymbol = Symbol('data')

const formData = reactive<StepFormData>({
  projectPath: '',
  configProject: {
    title: '',
    description: '',
    bundler: '',
    recoThemeConfig: {
      author: '',
      docsDir: '/',
      docsRepo: '',
      docsBranch: '',
      lastUpdated: false,
      lastUpdatedText: '',
      autoSetSeries: false
    }
  }
})

export function useData(): { formData: StepFormData, dataSymbol: Symbol } {
  return { formData, dataSymbol }
}
