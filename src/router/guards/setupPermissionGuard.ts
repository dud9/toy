import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import type { Menu } from '~/types'
import { NOT_FOUND, WHITE_LIST } from '~/router/constants'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const allowAccess = !to.meta?.requiresAuth
    if (allowAccess
      || WHITE_LIST.find(i => i.name === to.name)
    ) {
      NProgress.done()
      return next()
    }

    const permissionStore = usePermissionStore()
    const menus = [...permissionStore.appMenus]
    let exist = false
    while (menus.length && !exist) {
      const element = menus.shift()
      if (element?.path === to.path)
        exist = true

      if (element?.children) {
        menus.push(
          ...(element.children as unknown as Menu[]),
        )
      }
    }

    if (exist)
      next()

    else
      next(NOT_FOUND)

    useTimeoutFn(() => {
      NProgress.done()
    }, 200)
  })
}
