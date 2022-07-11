<script setup lang="ts">
import HistoryDataChart from './components/HistoryDataChart.vue'
</script>

<template>
  <div>
    <PageHeader />
    <div
      style="height: calc(100vh - 140px);"
      w-full flex="inline nowrap" lt-md="grid grid-rows-2"
      border="1 neutral-600/10 dark:![var(--color-neutral-3)]"
    >
      <HistoryDataChart />
    </div>
  </div>
</template>
