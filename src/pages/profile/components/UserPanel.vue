<script lang="ts" setup>
const { user } = storeToRefs(useUserStore())
const avatar = computed(() => {
  return unref(user)?.avatar
})
const data = computed(() => {
  const _createTime = unref(user)?.createTime
  const createTime = _createTime
    ? dayJs(_createTime).format('YYYY-MM-DD HH:mm:ss')
    : ''
  return [
    {
      label: '账号',
      value: unref(user)?.username || '',
    },
    {
      label: '名称',
      value: unref(user)?.name || '',
    },
    {
      label: '创建时间',
      value: createTime,
    },
  ]
})
</script>

<template>
  <a-card :bordered="false">
    <a-space :size="64" pl-25px>
      <a-avatar :size="100">
        <img
          alt="头像"
          :src="avatar"
        >
      </a-avatar>
      <a-descriptions
        lt-sm="hidden"
        lt-md="!text-right"
        :data="data"
        :column="2"
        align="right"
        layout="inline-horizontal"
        :label-style="{
          width: '100px',
          fontWeight: 'bold',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{
          width: '180px',
          paddingLeft: '8px',
          textAlign: 'left',
        }"
      />
    </a-space>
  </a-card>
</template>
