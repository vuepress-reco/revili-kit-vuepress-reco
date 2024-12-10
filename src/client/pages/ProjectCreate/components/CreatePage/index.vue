<template>
    <n-steps vertical :current="(currStep as number)" :status="currStatus" style="height: 300px;">
      <n-step
        v-for="(step, index) in steps"
        :key="index"
        :title="step.title"
        :description="step.description"
      />
    </n-steps>
</template>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { useClientSocket } from 'revili/client'

import { useStep } from "./composables";
import { Events } from '../../../../../constants/index.js'
import { useFormData } from '../ConfigureProject/composables';

const message = useMessage()
const socket = useClientSocket()
const { projectPath, configProject } = useFormData()
const { currStep, currStatus, steps, prev, next } = useStep()

socket?.on(Events.CREATE_PROJECT, ({ result, data }) => {
  if (result === 'fail') {
    currStatus.value = 'error'
    steps.value[currStep.value - 1].description = data
  } else {
    const params = {
      projectPath: projectPath.value,
      configProject: configProject.value
    }
    socket?.send(Events.CONFIGURE_PROJECT, params)

    message.success('Create project success!')
    next()
  }
})

socket?.on(Events.CONFIGURE_PROJECT, ({ result, data }) => {
  if (result === 'fail') {
    currStatus.value = 'error'
    steps.value[currStep.value - 1].description = data
  } else {
    next()
    currStatus.value = 'finish'
  }
})

const handleNext = (cb: () => void) => {
  if (cb) cb()
}

defineExpose({ handleNext })
</script>
