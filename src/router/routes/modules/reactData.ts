import { BASE_LAYOUT } from '~/router/constants'

export default {
  path: '/reactData',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'ReactData',
      component: () => import('~/pages/react-data/index.vue'),
      meta: {
        title: '实时数据',
        requiresAuth: true,
        cached: false,
      },
    },
  ],
}
