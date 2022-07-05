<script setup lang="ts">
import { IconArrowLeft } from '@arco-design/web-vue/es/icon'

const {
  title = '',
} = defineProps<{
  title?: string
}>()

const route = useRoute()
const pageTitle = computed(() => {
  return title === ''
    ? route.meta?.title || ''
    : title
})
</script>

<template>
  <div h-50px w-full flex justify-between items-center px-4 mb-2>
    <div flex-inline font-bold text="lg ![rgb(var(--primary-6))]">
      <div i-carbon-plane-sea mr-2 />
      {{ pageTitle }}
    </div>
    <a-button type="primary" font-bold @click="$router.push('/')">
      <template #icon>
        <IconArrowLeft />
      </template>
      返回
    </a-button>
  </div>
</template>
