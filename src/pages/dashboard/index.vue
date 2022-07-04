<script setup lang="ts">
const permissionStore = usePermissionStore()
const { appMenus } = storeToRefs(permissionStore)
function queryMenus() {
  if (unref(appMenus).length === 0)
    permissionStore.fetchAppMenus()
}
queryMenus()
const equipName = '数控拼焊'
</script>

<template>
  <div flex="~ col" w="4/5" mx="1/10" pt-12 font-bold>
    <div
      h-100px min-h-50px w-full
      border="5 [var(--color-primary-light-2)]"
      rounded-3 grid="~ flow-row-dense cols-3"
      text="1.2rem" lg="text-1.8rem"
      md="text-1.5rem" xl="text-2.1rem"
    >
      <div border="1 red" h-full flex justify-center items-center>
        {{ equipName }}
      </div>
      <div h-full flex justify-center items-center>
        <span mr-2>设备</span> 在线
      </div>
      <div h-full flex justify-center items-center>
        <span mr-2>边缘端</span> 在线
      </div>
    </div>
    <div min-h-300px w-full mt-8 border="1 red">
      11
    </div>
  </div>
</template>

