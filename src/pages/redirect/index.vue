<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { params: { path }, query } = route
useTimeoutFn(() => {
  router.replace({ path: `/${path}`, query })
}, 500)
</script>

<template>
  <div w-full h-full flex justify-center items-center>
    <a-spin dot :size="24" />
  </div>
</template>
