import { createApp } from 'vue'
import App from './App'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { MainPage } from './pages/index'

const routes = [
  { name: 'index', path: '/', component: MainPage },
  { path: '/:pathMatch(.*)*', redirect: '/' }
] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')