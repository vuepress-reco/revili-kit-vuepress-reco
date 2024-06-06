<template>
  <n-form
    ref="formRef"
    :label-width="140"
    :model="configProject"
    :rules="rules"
    label-placement="left"
    style="width: 600px;"
  >
    <n-divider dashed>Vuepress Config</n-divider>

    <n-form-item label="Title" path="title">
      <n-input v-model:value="configProject.title" placeholder="Input the title of site" />
    </n-form-item>

    <n-form-item label="Description" path="description">
      <n-input v-model:value="configProject.description" placeholder="Input the description of site" />
    </n-form-item>

    <n-form-item label="Bundler" path="bundler">
      <n-radio-group v-model:value="configProject.bundler">
          <n-space>
            <n-radio
              v-for="(option, index) in bundlerOptions"
              :value="option.value"
              :key="index"
            >
              {{ option.label }}
            </n-radio>
          </n-space>
        </n-radio-group>
    </n-form-item>

    <n-divider dashed>Reco Theme Config</n-divider>

    <n-form-item label="Author" path="recoThemeConfig.author">
      <n-input
        v-model:value="configProject.recoThemeConfig.author"
        placeholder="Input the name of author"
      />
    </n-form-item>

    <n-form-item label="Docs Repo" path="recoThemeConfig.docsDir">
      <n-input
        v-model:value="configProject.recoThemeConfig.docsDir"
        placeholder="Input the folder where the document is located, default /"
      />
    </n-form-item>

    <n-form-item label="Docs Repo" path="recoThemeConfig.docsRepo">
      <n-input
        v-model:value="configProject.recoThemeConfig.docsRepo"
        placeholder="Input the repository url of your documentation source files"
      />
    </n-form-item>

    <n-form-item label="Docs Branch" path="recoThemeConfig.docsBranch">
      <n-input
        v-model:value="configProject.recoThemeConfig.docsBranch"
        placeholder="Input the repository branch of your documentation source files"
      />
    </n-form-item>

    <n-form-item label="Show the lastupdated time" path="recoThemeConfig.lastUpdated">
      <n-checkbox v-model:checked="configProject.recoThemeConfig.lastUpdated" />
    </n-form-item>

    <n-form-item label="Lastupdated timestamp label" path="recoThemeConfig.lastUpdatedText">
      <n-input
        v-model:value="configProject.recoThemeConfig.lastUpdatedText"
        placeholder="Input the text of the last updated timestamp label"
      />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormInst, useMessage } from 'naive-ui'
import { useConfig, useFormData } from "./composables";

const message = useMessage()
const { configProject } = useFormData()
const { rules, bundlerOptions } = useConfig()

const formRef = ref<FormInst | null>(null)

const handleNext = (cb: () => void) => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (cb) cb()
    } else {
      message.error('Please fill in the complete information!')
    }
  })
}

defineExpose({ handleNext })
</script>
