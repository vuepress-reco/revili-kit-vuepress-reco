<template>
  <n-flex justify="center" align="center" vertical style="height: calc(100vh - 140px);">
    <n-steps :current="(currStep as number)" :status="currStepStatus" class="create-steps">
      <n-step v-for="(item, index) in steps" :title="item" :key="index" :style="index === 2 ? 'flex: none' : ''" />
    </n-steps>

    <div style="flex: 1; padding-top: 40px;">
      <select-folder ref="selectFolderRef" v-if="currStep === 1" />
      <configure-project ref="configureProjectRef" v-else-if="currStep === 2" />
      <create-project ref="createProjectRef" v-else-if="currStep === 3" />
    </div>

    <div>
      <n-button
        round
        tertiary
        type="primary"
        v-show="currStep !== 1"
        @click="handlePrev()"
      >
        Prev Step
      </n-button>

      <n-button
        round
        tertiary
        type="primary"
        style="margin-left: 40px;"
        @click="handleNext()"
      >
        {{ btnNextText }}
      </n-button>
    </div>
  </n-flex>
</template>

<script lang="ts" setup>
import { ref, provide, computed } from "vue";
import { useRouter } from "vue-router";

import { useSteps, useData } from "./composables";
import { SelectFolder, CreateProject, ConfigureProject } from "./components";

const router = useRouter()
const { formData, dataSymbol } = useData()
const { currStep, currStepStatus, steps,  prevStep, nextStep } = useSteps()

const selectFolderRef = ref<{ handleNext: any }>()
const configureProjectRef = ref<{ handleNext: any }>()
const createProjectRef = ref<{ handleNext: any }>()

const btnNextText = computed(() => {
  if (currStep.value === 2) return 'Create'
  if (currStep.value === 3) return 'Go to project list'
  return 'Next Step'
})

provide(dataSymbol, formData)

function handlePrev() {
  prevStep()
}

function handleNext() {
  if (currStep.value === 1 && selectFolderRef.value) {
    selectFolderRef.value.handleNext(() => {
      nextStep()
    })

    return
  }

  if (currStep.value === 2 && configureProjectRef.value) {
    configureProjectRef.value.handleNext(() => {
      nextStep()
    })

    return
  }

  if (currStep.value === 3 && createProjectRef.value) {
    createProjectRef.value.handleNext(() => {
      router.push('/projects')
    })

    return
  }
}
</script>

<style lang="postcss">
.create-steps {
  max-width: 1000px;
}
</style>
