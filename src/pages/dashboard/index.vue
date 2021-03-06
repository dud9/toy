<script setup lang="ts">
import MenuItem from './components/MenuItem.vue'
import type { Equipment } from '~/types'

const REFRESH_INTERVAL = 10 * 1000

const { equipIp } = useAppStore()
const { user } = storeToRefs(useUserStore())
const permissionStore = usePermissionStore()
const { appMenus } = storeToRefs(permissionStore)
function queryMenus() {
  if (unref(appMenus).length === 0)
    permissionStore.fetchAppMenus(unref(user)?.roleId)
}
queryMenus()

let equipment = $ref<Equipment>()
let equipOnlineState = $ref(false)
let edgeOnlineState = $ref(false)
const equipName = computed(() => {
  return equipment?.name || ''
})

async function fetchEquipmentStatusByIp() {
  const { code, data, message } = await EquipmentApi.fetchEquipmentOnlineState({
    ip: equipIp,
  }) as any
  if (code !== 0) {
    Message.error(message)
    return
  }
  equipment = data.equipment
  equipOnlineState = data.equipOnlineState || false
  edgeOnlineState = data.edgeOnlineState || false
}
fetchEquipmentStatusByIp()

useIntervalFn(() => {
  fetchEquipmentStatusByIp()
}, REFRESH_INTERVAL)
</script>

<template>
  <div flex="~ col" h-auto mb-30px w="4/5" mx="1/10" pt-10 font-bold>
    <div
      h-auto min-h-50px w-full py-4 px-2
      border="5 [var(--color-primary-light-2)]"
      rounded-3 grid="~ flow-row-dense cols-3"
      text="1rem" sm="text-1.2rem" md="text-1.5rem"
      lg="text-1.8rem" xl="text-2.1rem"
    >
      <div
        h-full flex justify-center items-center
        text="[rgb(var(--primary-6))]" tracking-widest
      >
        <div i-carbon-edge-device mr-2 animate-bounce />
        {{ equipName }}
      </div>
      <div h-full flex justify-center items-center op-75>
        设备: <span ml-2 text-green-500 animate-pulse> {{ equipOnlineState ? '在线' : '离线' }} </span>
      </div>
      <div h-full flex justify-center items-center op-75>
        边缘端: <span ml-2 text-red-500 animate-pulse> {{ edgeOnlineState ? '在线' : '离线' }} </span>
      </div>
    </div>
    <div
      class="menu"
      min-h-300px w-full h-auto mt-8
      xs="grid !grid-cols-1 !gap-y-6"
      sm="grid !grid-cols-2 !gap-x-8 !gap-y-6"
      md="grid !grid-cols-3 !gap-x-12 !gap-y-8"
      lg="grid !grid-cols-4 !gap-x-12 !gap-y-8"
    >
      <MenuItem v-for="item, idx in appMenus" :key="idx" :item="item" />
    </div>
  </div>
</template>

