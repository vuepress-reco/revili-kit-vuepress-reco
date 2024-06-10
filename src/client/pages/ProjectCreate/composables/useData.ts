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

const initData = {
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
}

const formData = reactive<StepFormData>(initData)

export function useData(): { formData: StepFormData, dataSymbol: Symbol, resetFormData: () => void } {
  const resetFormData = () => {
    // @ts-ignore
    formData.value = JSON.parse(JSON.stringify(initDatas))
  }

  return { formData, dataSymbol, resetFormData }
}
