import type { Menu } from '~/types'
import { menuSource, menus } from '~/menus'

export const usePermissionStore = defineStore(
  'permissionStore',
  () => {
    const appMenus = ref<Menu[]>([])
    async function fetchAppMenus() {
      if (menuSource === 'front') {
        appMenus.value = menus
        return
      }
      const { data } = await MenuApi.fetchMenuList()
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
