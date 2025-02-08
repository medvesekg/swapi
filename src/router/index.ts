import DetailPage from '@/pages/DetailPage.vue'
import HomePage from '@/pages/HomePage.vue'
import ListPage from '@/pages/ListPage.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import routeConfig, { type RouteConfig } from './config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: createRoutes(routeConfig),
})

function createRoutes(config: RouteConfig[]): RouteRecordRaw[] {
  return [
    {
      path: '/',
      component: HomePage,
      props: {
        routes: config,
      },
    },
    ...config.flatMap(createListAndDetailsRoutes),
  ]
}

function createListAndDetailsRoutes(config: RouteConfig): RouteRecordRaw[] {
  return [
    {
      path: `/${config.path}`,
      component: ListPage,
      props: {
        apiPath: config.apiPath,
        title: config.title,
        fields: config.listFields,
      },
    },
    {
      path: `/${config.path}/:id`,
      component: DetailPage,
      props: {
        apiPath: config.apiPath,
      },
    },
  ]
}

export default router
