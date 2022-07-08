import type { Menu } from './types'

/**
 * the source of app menus
 */
export const menuSource: 'front' | 'back' = 'back'

export const menus: Menu[] = [
  {
    id: 101,
    title: '用户管理',
    icon: 'user',
    path: '/system/user',
  },
  {
    id: 102,
    title: '角色管理',
    icon: 'role',
    path: '/system/role',
  },
  {
    id: 103,
    title: '实时数据',
    icon: 'reactData',
    path: '/reactData',
  }, {
    id: 104,
    title: '历史数据',
    icon: 'historyData',
    path: '/historyData',
  },
  {
    id: 105,
    title: '告警管理',
    icon: 'alarm',
    path: '/alarm',
  },
  {
    id: 106,
    title: '设备配置',
    icon: 'device',
    path: '/device',
  },
  {
    id: 107,
    title: '接口管理',
    icon: 'api',
    path: '/apiManage',
  },
]

