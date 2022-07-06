<script setup lang="ts">
const {
  visible = false,
  role = {},
  type = 'add',
  menuTreeData = [],
} = defineProps<{
  visible?: boolean
  role?: Record<string, any>
  type?: 'add' | 'edit'
  menuTreeData?: any
}>()
const emits = defineEmits(['update:visible', 'saveRole'])

const refForm = ref()
const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])
const baseFormModel = {
  id: undefined,
  name: '',
  description: '',
  menuIdList: [],
}
const formModel = reactive<Record<string, any>>({
  ...baseFormModel,
})
const title = computed(() => {
  return ['添加角色', '编辑角色'][type === 'add' ? 0 : 1]
})

const { loading, setLoading } = useLoading()
function assign() {
  const target = visible && type === 'edit'
    ? unref(role)
    : baseFormModel
  for (const [k, v] of Object.entries(target)) {
    if (!Object.prototype.hasOwnProperty.call(formModel, k))
      continue
    formModel[k] = v
  }
}
watch(() => visible, () => {
  assign()
  setLoading(false)
  refForm.value && refForm.value.clearValidate()
})

function handleOk() {
  refForm.value.validate((errors: any) => {
    if (errors)
      return
    setLoading(true)
    if (type === 'edit')
      formModel.password = undefined
    emits('saveRole', formModel)
  })
}
function handleCancel() {
  emits('update:visible', false)
}

const allCheckedKeys = $computed(() => {
  return menuTreeData.map((i: Record<string, any>) => i.key) || []
})

const isAllChecked = $computed(() => {
  return formModel.menuIdList?.length > 0
  && formModel.menuIdList?.length === allCheckedKeys.length
})

function toggleChecked() {
  formModel.menuIdList = isAllChecked
    ? []
    : allCheckedKeys
}
</script>

<template>
  <a-modal
    :visible="visible"
    :width="600"
    :mask-closable="false"
    :ok-loading="loading"
    :ok-text="type === 'add' ? '添加' : '更新'"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title>
      {{ title }}
    </template>
    <a-form ref="refForm" :model="formModel" auto-label-width size="large">
      <a-form-item
        field="name" label="角色名称" hide-asterisk feedback
        :rules="[
          { required: true, message: '角色名称是必须的' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input
          v-model="formModel.name"
          placeholder="请输入角色名称..."
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="description" label="角色描述" hide-asterisk feedback
        :rules="[
          { required: true, message: '角色描述是必须的' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <a-input
          v-model="formModel.description"
          placeholder="请输入角色描述..."
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="menuIdList" label="角色权限" hide-asterisk feedback
        :rules="[
          { required: true, message: '角色权限是必须的' },
        ]"
        :validate-trigger="validateTrigger"
      >
        <div flex="~ col">
          <a-button
            type="text" font-bold
            @click="toggleChecked"
          >
            {{ isAllChecked ? '取消全选' : '全选' }}
          </a-button>
          <a-tree
            v-model:checked-keys="formModel.menuIdList"
            :checkable="true"
            :data="menuTreeData"
          />
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
