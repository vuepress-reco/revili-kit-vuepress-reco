import { inject, toRefs } from "vue";
import { useSocket } from "./useSocket.js";
import { useData, type StepFormData } from "../../../composables/useData.js";

export function useProjectPath() {
  const { dataSymbol } = useData()
  const formData = inject<StepFormData>(dataSymbol) as StepFormData
  const { projectPath } = toRefs(formData)

  const { getInitFolder } = useSocket()
  getInitFolder().then((path = '') => {
    projectPath.value = path
  })

  return { projectPath }
}
