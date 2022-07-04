<script setup lang="ts">
const permissionStore = usePermissionStore()
const { appMenus } = storeToRefs(permissionStore)
function queryMenus() {
  if (unref(appMenus).length === 0)
    permissionStore.fetchAppMenus()
}
queryMenus()
</script>

<template>
  <div flex="~ col" h-full w="4/5" mx="1/10" pt-12>
    <div h-100px w-full border="1 red">
      22
    </div>
    <div min-h-300px w-full mt-8 border="1 red">
      11
    </div>
  </div>
</template>

