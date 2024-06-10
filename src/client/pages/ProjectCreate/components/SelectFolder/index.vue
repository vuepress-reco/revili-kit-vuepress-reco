<template>
  <n-flex justify="center">
    <n-input
      v-model:value="projectPath"
      :disabled="!editState"
      :status="!projectPath ? 'error' : 'success'"
      type="text"
      placeholder="Current Path"
      style="max-width: 600px;"
    />
    <n-button strong secondary circle type="primary">
      <template #icon>
        <n-icon>
          <save-icon v-show="editState" @click="handleEditState()" />
          <create-icon v-show="!editState" @click="handleEditState()" />
        </n-icon>
      </template>
    </n-button>
  </n-flex>

  <n-alert title="Warning" type="warning" :bordered="false" style="margin-top: 20px; width: 650px;">
    The project file will be created under the <n-button text type="primary">/new-reco</n-button>.
    If you want to create the project under current directory, please remove <n-button text type="primary">/new-reco</n-button>.
  </n-alert>
</template>

<script lang="ts" setup>
import {
  Save as SaveIcon,
  Create as CreateIcon,
} from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { useProjectPath, useEdit } from "./composables";

const { projectPath } = useProjectPath()
const { editState, toggleEditState } = useEdit()

const message = useMessage()
function handleEditState() {
  if (!editState.value) {
    toggleEditState()
    return
  }

  if (!projectPath.value) {
    message.warning('The directory cannot be empty!')
    return
  }

  message.success('The directory has been modified successfully!')
    toggleEditState()
  }

const handleNext = (cb: () => void) => {
  if (editState.value) {
    message.warning('Your changes have not been saved yet!')
    return
  }

  if (cb) cb()
}

defineExpose({ handleNext })
</script>

<style lang="postcss">
.select-folder {
  width: 800px;
}
</style>
