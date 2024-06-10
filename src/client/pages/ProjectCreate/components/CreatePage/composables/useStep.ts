import { ref } from "vue"
import { StepsProps } from 'naive-ui'

export function useStep() {
  const currStep = ref<number>(1)
  const  currStatus = ref<StepsProps['status']>('process')
  const steps = ref([
    {
      title: 'Load template file',
      description: 'Load template file from GitHub'
    },
    {
      title: 'Custom theme configuration',
      description: 'Configure theme according to user\'s preset'
    },
    {
      title: 'Project creation completed',
      description:'Go to the project details page or local editor to set up the project in detail'
    }
  ])

  const next = () => {
    if (currStep.value < 3) {
      currStep.value++
    }
  }

  const prev = () => {
    if (currStep.value > 1) {
      currStep.value--
    }
  }

  return { currStep, currStatus, steps, prev, next }
}
