<template>
  <n-flex justify="center" align="center" vertical style="height: calc(100vh - 140px);">
    <n-steps :current="(currStep as number)" :status="currStepStatus" class="create-steps">
      <n-step v-for="(item, index) in steps" :title="item" :key="index" />
    </n-steps>

    <div style="flex: 1; padding-top: 40px;">
      <select-folder ref="selectFolderRef" v-if="currStep === 1" />
      <configure-project ref="configureProjectRef" v-else-if="currStep === 2" />
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
        Next Step
      </n-button>
    </div>
  </n-flex>
</template>

<script lang="ts" setup>
import { ref, provide } from "vue";
import { SelectFolder, ConfigureProject } from "./components";
import { useSteps, useData } from "./composables";

const { formData, dataSymbol } = useData()
const { currStep, currStepStatus, steps,  prevStep, nextStep } = useSteps()

const selectFolderRef = ref<{ handleNext: any }>()
const configureProjectRef = ref<{ handleNext: any }>()

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
}
</script>

<style lang="postcss">
.create-steps {
  max-width: 1200px;
}
</style>
