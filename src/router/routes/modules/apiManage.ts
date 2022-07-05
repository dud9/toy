import { BASE_LAYOUT } from '~/router/constants'

export default {
  path: '/apiManage',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'ApiManage',
      component: () => import('~/pages/api-manage/index.vue'),
      meta: {
        title: '接口管理',
        requiresAuth: true,
        cached: false,
      },
    },
  ],
}
