import { createApp } from 'vue'
import App from './App'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes = [

] as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')