import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue') },
  { path: '/ip', redirect: '/' },
  { path: '/ip/:id', name: 'detail', component: () => import('../pages/DetailPage.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})