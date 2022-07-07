import type { Menu } from '~/types'
import { menuSource, menus } from '~/menus'

export const usePermissionStore = defineStore(
  'permissionStore',
  () => {
    const appMenus = ref<Menu[]>([])
    async function fetchAppMenus(roleId?: number) {
      if (menuSource === 'front') {
        appMenus.value = menus
        return
      }
      if (!roleId) {
        Message.error('请联系管理员配置用户角色权限')
        return
      }
      const { data } = await MenuApi.fetchMenuListByRoleId({ roleId })
      appMenus.value = data
    }
    function removeAppMenus() {
      appMenus.value = []
    }

    return {
      appMenus,
      fetchAppMenus,
      removeAppMenus,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
