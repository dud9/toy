<script setup lang="ts">
</script>

<template>
  <div>
    <PageHeader />
    <div
      w-full ha min-h-500px flex-inline flex-nowrap
      border="1 slate-800/10 dark:![var(--color-neutral-3)]"
    >
      <a-resize-box
        :directions="['right']"
        :style="{ width: '70%', minWidth: '50%', maxWidth: '100%', textAlign: 'center' }"
      >
        <a-typography-paragraph>We are building the future of content discovery and creation.</a-typography-paragraph>
        <a-divider />
        <a-typography-paragraph>
          ByteDance's content platforms enable people to enjoy content powered by AI technology. We
          inform, entertain, and inspire people across language, culture and geography.
        </a-typography-paragraph>
        <a-divider>ByteDance</a-divider>
        <a-typography-paragraph>Yiming Zhang is the founder and CEO of ByteDance.</a-typography-paragraph>
      </a-resize-box>
      <div>
        <h1 />
      </div>
    </div>
  </div>
</template>
