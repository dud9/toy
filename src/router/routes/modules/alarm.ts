import { BASE_LAYOUT } from '~/router/constants'

export default {
  path: '/alarm',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Alarm',
      component: () => import('~/pages/alarm/index.vue'),
      meta: {
        title: '告警管理',
        requiresAuth: true,
        cached: false,
      },
    },
  ],
}
