<script setup lang="ts">
import ReactDataChart from './components/ReactDataChart.vue'
import ReactDataList from './components/ReactDataList.vue'

const { width, height } = useWindowSize()
const leftSideWidth = ref(unref(width) * 0.7)
watch([leftSideWidth, height], (val) => {
  // console.log(val, width.value)
  // console.log(val)
})
</script>

<template>
  <div>
    <PageHeader />
    <div
      style="height: calc(100vh - 140px);"
      w-full flex="inline nowrap" lt-md="grid grid-rows-2"
      border="1 neutral-600/10 dark:![var(--color-neutral-3)]"
    >
      <a-resize-box
        v-model:width="leftSideWidth"
        :directions="['right']"
        :style="{ minWidth: '50%', maxWidth: '100%', textAlign: 'center' }"
        lt-md="!w-full"
      >
        <ReactDataChart :wrapper-width="leftSideWidth" :wrapper-height="height" />
      </a-resize-box>
      <div lt-md="mt-20px !w-full" of="x-hidden y-auto" flex-1>
        <ReactDataList />
      </div>
    </div>
  </div>
</template>
