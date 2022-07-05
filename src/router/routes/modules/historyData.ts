import { BASE_LAYOUT } from '~/router/constants'

export default {
  path: '/historyData',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'HistoryData',
      component: () => import('~/pages/history-data/index.vue'),
      meta: {
        title: '历史数据',
        requiresAuth: true,
        cached: false,
      },
    },
  ],
}
