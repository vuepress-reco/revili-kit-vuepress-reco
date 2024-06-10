import { inject, toRefs } from "vue";
import { useData, type StepFormData } from "../../../composables/useData.js";

export function useFormData() {
  const { dataSymbol } = useData()
  const formData = inject<StepFormData>(dataSymbol) as StepFormData
  const { projectPath, configProject } = toRefs(formData)

  return { projectPath, configProject }
}
