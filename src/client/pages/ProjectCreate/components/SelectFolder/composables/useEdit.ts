import { ref } from "vue";

export function useEdit() {
  const editState = ref(false)

  const toggleEditState = () => {
    editState.value = !editState.value
  }

  return { editState, toggleEditState }
}
