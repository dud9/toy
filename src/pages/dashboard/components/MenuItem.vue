<script setup lang="ts"></script>

<template>
  <div
    w-full min-h-180px
    border="3 gray-600"
    flex="~ col" text-6rem
    py-4 op="40 dark:80" rounded-md
    hover="!text-[rgb(var(--primary-6))] op-100"
  >
    <div w-full flex justify-center items-center>
      <div i-carbon-bot />
    </div>
    <div mt-4 flex justify-center items-center text="!1.5rem ![rgb(var(--primary-6))]">
      菜单1
    </div>
  </div>
</template>
