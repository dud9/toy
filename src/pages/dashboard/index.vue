<script setup lang="ts">
import MenuItem from './components/MenuItem.vue'

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
  <div flex="~ col" h-auto mb-30px w="4/5" mx="1/10" pt-10 font-bold>
    <div
      h-auto min-h-50px w-full py-5 px-2
      border="5 [var(--color-primary-light-2)]"
      rounded-3 grid="~ flow-row-dense cols-3"
      text="1rem" sm="text-1.2rem" md="text-1.5rem"
      lg="text-1.8rem" xl="text-2.1rem"
    >
      <div
        h-full flex justify-center items-center
        text="[rgb(var(--primary-6))]" tracking-widest
      >
        <div i-carbon-edge-device mr-2 />
        {{ equipName }}
      </div>
      <div h-full flex justify-center items-center op-75>
        设备: <span ml-2 text-green-500> 在线 </span>
      </div>
      <div h-full flex justify-center items-center op-75>
        边缘端: <span ml-2 text-red-500> 离线 </span>
      </div>
    </div>
    <div
      min-h-300px w-full h-auto mt-8
      flex justify-center items-center
      grid="~ cols-1" gap="2"
      sm="grid !grid-cols-2 gap-4"
      md="grid !grid-cols-3 gap-6"
      lg="grid !grid-cols-4 gap-9"
    >
      <MenuItem v-for="i in 7" :key="i" />
    </div>
  </div>
</template>

