<script setup lang="ts">
import { IconArrowLeft } from '@arco-design/web-vue/es/icon'
import { iconMap } from '~/menus'

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
const pageIcon = computed<string>(() => {
  return iconMap[route.meta?.icon as string || 'default']
})
</script>

<template>
  <div h-50px w-full flex justify-between items-center>
    <div>
      <div :class="pageIcon" text-lg />
      {{ pageTitle }}
    </div>
    <a-button type="primary" @click="$router.push('/')">
      <template #icon>
        <IconArrowLeft />
      </template>
      返回
    </a-button>
  </div>
</template>
