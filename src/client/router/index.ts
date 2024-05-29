import { createWebHashHistory, createRouter } from 'vue-router'

import Demo from '../pages/Demo/index.vue'
import ProjectList from '../pages/ProjectList/index.vue'
import ProjectCreate from '../pages/ProjectCreate/index.vue'
import ProjectManager from '../pages/ProjectManager/index.vue'

const routes = [
  { path: '/demo', component: Demo },
  { path: '/', component: ProjectList },
  { path: '/create', component: ProjectCreate },
  { path: '/project/:id', component: ProjectManager },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
