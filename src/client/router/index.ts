import { createWebHashHistory, createRouter } from 'vue-router'

import Home from '../pages/Home/index.vue'
import ProjectList from '../pages/ProjectList/index.vue'
import ProjectCreate from '../pages/ProjectCreate/index.vue'
import ProjectManager from '../pages/ProjectManager/index.vue'

const routes = [
  // { path: '/', component: Home },
  { path: '/', component: ProjectList },
  { path: '/create', component: ProjectCreate },
  { path: '/project/:id', component: ProjectManager },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
