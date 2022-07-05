import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import { BASE_LAYOUT, BLANK_LAYOUT } from './constants'
import appRoutes from './routes'
import createRouterGuard from './guards'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 1000 })

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      component: BLANK_LAYOUT,
      children: [
        {
          path: '',
          name: 'Login',
          component: () => import('~/pages/login/index.vue'),
          meta: {
            requiresAuth: false,
          },
        },
      ],
    },
    {
      path: '/dashboard',
      component: BASE_LAYOUT,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('~/pages/dashboard/index.vue'),
          meta: {
            title: '首页',
            requiresAuth: true,
            cached: true,
          },
        },
      ],
    },
    ...appRoutes,
    {
      path: '/500',
      component: BLANK_LAYOUT,
      children: [
        {
          path: '',
          name: 'ErrorPage',
          component: () => import('~/pages/exception/500/index.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: BLANK_LAYOUT,
      children: [
        {
          path: '',
          name: 'NotFound',
          component: () => import('~/pages/exception/404/index.vue'),
        },
      ],
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouterGuard(router)

export default router
