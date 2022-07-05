<script setup lang="ts">
import type { Menu } from '~/types'

const {
  item = {},
} = defineProps<{
  item?: Menu
}>()

const { menuInverted, menuShape } = storeToRefs(useAppStore())
const iconMap: Record<string, string> = {
  user: 'i-carbon-user',
  role: 'i-carbon-user-certification',
  reactData: 'i-carbon-chart-area-smooth',
  historyData: 'i-carbon-chart-combo',
  alarm: 'i-mdi-alarm-light-outline',
  device: 'i-ri-device-line',
  api: 'i-carbon-document',
}
</script>

<template>
  <div
    class="wrap" shadow-md
    flex="~ col" text="5.3rem" py-4
    hover="translate-y-[-4px]" duration-300
    :class="{
      '!bg-[rgb(var(--primary-1))] dark:!bg-[rgb(35,35,36)]': menuInverted,
      'border-1 !border-[var(--color-neutral-3)]': !menuInverted,
      '!w-full !min-h-180px !rounded-lg': menuShape === 'square',
      '!w-210px !h-210px !rounded-full mx-auto md:!w-190px md:!h-190px': menuShape === 'round',
    }"
  >
    <RouterLink :to="item?.path || '/'">
      <div w-full flex justify-center items-center>
        <div :class="iconMap[item.icon!]" text="![rgb(var(--primary-3))]" />
      </div>
      <div mt-4 flex justify-center items-center text="!1.5rem" op-50>
        {{ item?.title || '' }}
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .wrap:hover {
    transform: translateX(-8px) !important;
  }
}
</style>
