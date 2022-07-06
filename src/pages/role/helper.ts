import type { Role } from '~/types'

export async function saveRoleHandler(
  {
    type = 'add',
    data = {},
  }: {
    type?: 'add' | 'edit'
    data?: Role
  },
) {
  const map = {
    add: async () => {
      const { code } = await RoleApi.addRole(data) as any
      if (code === 0)
        Message.success('角色添加成功')

      else
        Message.error('角色添加失败')

      return code === 0
    },
    edit: async () => {
      const { code } = await RoleApi.updateRole(data) as any
      if (code === 0)
        Message.success('角色更新成功')

      else
        Message.error('角色更新失败')

      return code === 0
    },
  }

  return await map[type]()
}
