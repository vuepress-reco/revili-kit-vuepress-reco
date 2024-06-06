<template>
  <n-flex>
    <n-input
      v-model:value="projectPath"
      :disabled="!editState"
      :status="!projectPath ? 'error' : 'success'"
      type="text"
      placeholder="Current Path"
      style="width: 600px;"
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
