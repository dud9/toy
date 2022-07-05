<script setup lang="ts">
import { IconArrowLeft, IconRefresh } from '@arco-design/web-vue/es/icon'

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
const router = useRouter()
function refresh() {
  const { fullPath } = route
  nextTick(() => {
    router.replace({
      path: `/redirect${fullPath}`,
    })
  })
}
</script>

<template>
  <div h-50px w-full flex justify-between items-center px-4 mb-2>
    <div flex-inline font-bold text="lg ![rgb(var(--primary-6))]">
      <div i-carbon-bookmark mr-2 translate-y-1 />
      {{ pageTitle }}
    </div>
    <div flex-inline>
      <a-button type="primary" font-bold mr-3 @click="refresh">
        <template #icon>
          <IconRefresh />
        </template>
        刷新
      </a-button>
      <a-button type="primary" status="danger" font-bold @click="$router.push('/')">
        <template #icon>
          <IconArrowLeft />
        </template>
        返回
      </a-button>
    </div>
  </div>
</template>
