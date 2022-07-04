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
  <div>
    <a-card>
      11
    </a-card>
  </div>
</template>

