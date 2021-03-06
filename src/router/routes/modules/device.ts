import { BASE_LAYOUT } from '~/router/constants'

export default {
  path: '/device',
  component: BASE_LAYOUT,
  children: [
    {
      path: '',
      name: 'Device',
      component: () => import('~/pages/device/index.vue'),
      meta: {
        title: '设备配置',
        requiresAuth: true,
        cached: false,
      },
    },
  ],
}
