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
  <div flex="~ col" px="1/10" border="1 red" pt-50px style="height: 1500px">
    <div h-50px max-w="2/3" border="1 red" />
  </div>
</template>
