import { ref } from 'vue'
import { StepsProps } from 'naive-ui'

export function useSteps() {
  const currStep = ref<number | null>(1)
  const currStepStatus = ref<StepsProps['status']>('process')
  const steps = ['Select Folder', 'Configure The Project', 'Create Project']

  function nextStep () {
    if (currStep.value === null) currStep.value = 1
    else if (currStep.value >= 3) currStep.value = null
    else currStep.value++
  }

  function prevStep () {
    if (currStep.value === 0) currStep.value = null
    else if (currStep.value === null) currStep.value = 3
    else currStep.value--
  }

  return { currStep, currStepStatus, steps, prevStep, nextStep }
}
