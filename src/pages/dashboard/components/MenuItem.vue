<script setup lang="ts">
import type { Menu } from '~/types'

const {
  item = {},
} = defineProps<{
  item?: Menu
}>()

const { menuInverted } = storeToRefs(useAppStore())
</script>

<template>
  <div
    w-full min-h-180px class="wrap" shadow-md
    flex="~ col" text="5.6rem" duration-300
    py-4 rounded-lg hover="translate-y-[-4px]"
    :class="{
      'dark:!bg-[var(--color-bg-3)] !bg-[rgb(var(--primary-1))]': menuInverted,
      'border-1 !border-[var(--color-neutral-3)]': !menuInverted,
    }"
  >
    <RouterLink :to="item?.path || '/'">
      <div w-full flex justify-center items-center>
        <div i-carbon-bot text="![rgb(var(--primary-3))]" />
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
