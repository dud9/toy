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
    border="1px [!var(--color-border)]"
    flex="~ col" text="5.6rem" transition="all duration-300"
    py-4 rounded-lg hover="translate-y-[-4px] "
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
