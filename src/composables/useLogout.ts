/**
 * when logout, clear store effects
 */
export function useLogout() {
  const { removeUser } = useUserStore()
  const { removeAppMenus } = usePermissionStore()
  const actions = [removeUser, removeAppMenus]

  actions.forEach((removeEffect) => {
    removeEffect()
  })
}

