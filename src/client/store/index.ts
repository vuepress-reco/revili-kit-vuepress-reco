import { reactive } from 'vue'

// 定义状态的类型
interface State {
  // 这里添加你需要的状态类型
  count: number
  // 可以根据需要添加更多状态
}

// 创建响应式状态
export const state = reactive<State>({
  count: 0,
})

// 定义修改状态的方法
export const mutations = {
  increment() {
    state.count++
  },
  decrement() {
    state.count--
  },
  // 可以根据需要添加更多方法
}

// 导出状态和方法
export default {
  state,
  mutations,
}
