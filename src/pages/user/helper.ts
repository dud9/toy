import type { User } from '~/types'

export async function saveUserHandler(
  {
    type = 'add',
    data = {},
  }: {
    type?: 'add' | 'edit'
    data?: User
  },
) {
  const map = {
    add: async () => {
      const { code } = await UserApi.addUser(data) as any
      if (code === 0)
        Message.success('用户添加成功')

      else
        Message.error('用户添加失败')

      return code === 0
    },
    edit: async () => {
      const { code } = await UserApi.updateUser(data) as any
      if (code === 0)
        Message.success('用户更新成功')

      else
        Message.error('用户更新失败')

      return code === 0
    },
  }

  return await map[type]()
}
