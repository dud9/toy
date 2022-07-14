<script setup lang="ts">
const router = useRouter()
function logout() {
  Message.success('登出成功')
  useTimeoutFn(() => {
    router.push('/login')
    useLogout()
  }, 1000)
}
function onSelect(value: any) {
  const actionMap: Record<string, any> = {
    0: () => router.push('/profile'),
    1: () => useOpenWindow('https://github.com/dud9/toy'),
    2: () => useOpenWindow('http://localhost:8004/swagger-ui.html'),
    3: logout,
  }
  const action = actionMap[value]
  action()
}
const userStore = useUserStore()
const avatar = computed(() => {
  return userStore.user?.avatar
})
</script>

<template>
  <div cursor-pointer>
    <a-dropdown trigger="click" @select="onSelect">
      <a-avatar :size="32" shape="square">
        <img alt="头像" :src="avatar">
      </a-avatar>
      <template #content>
        <a-doption value="0">
          个人资料
        </a-doption>
        <a-doption value="1">
          Github
        </a-doption>
        <a-doption value="2">
          接口文档
        </a-doption>
        <a-doption value="3">
          <template #icon>
            <div i-carbon-touch-1-down-filled bg-red />
          </template>
          退出登录
        </a-doption>
      </template>
    </a-dropdown>
  </div>
</template>
