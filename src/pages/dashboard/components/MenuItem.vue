<script setup lang="ts">
import type { Menu } from '~/types'

const {
  item = {},
} = defineProps<{
  item?: Menu
}>()
</script>

<template>
  <div
    w-full min-h-180px
    border="3 gray-600"
    flex="~ col" text="5.6rem"
    py-4 op="40 dark:80" rounded-lg
    hover="!text-[rgb(var(--primary-6))] op-100"
  >
    <RouterLink :to="item?.path || '/'">
      <div w-full flex justify-center items-center>
        <div i-carbon-bot />
      </div>
      <div mt-4 flex justify-center items-center text="!1.5rem ![rgb(var(--primary-6))]">
        {{ item?.title || '' }}
      </div>
    </RouterLink>
  </div>
</template>
