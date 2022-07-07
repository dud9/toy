<script setup lang="ts">
import { IconDriveFile, IconPlus } from '@arco-design/web-vue/es/icon'
import RoleSearchForm from './components/RoleSearchForm.vue'
import RoleModal from './components/RoleModal.vue'
import { saveRoleHandler } from './helper'
import type { Menu, Pagination, Role } from '~/types'

const { loading, setLoading } = useLoading()
let tabledata = $ref([])
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}
const pagination = reactive({
  ...basePagination,
})
async function fetchRoleData(params: Record<string, any>) {
  params = { ...basePagination, ...params }
  setLoading(true)
  try {
    const { data: { records, total } } = await RoleApi.fetchRoleList(params) as any
    tabledata = records as any
    pagination.current = params.current
    pagination.total = total
  }
  catch (err) {
    // you can report use errorHandler or other
  }
  finally {
    useTimeoutFn(() => {
      setLoading(false)
    }, 1000)
  }
}
const refSearchForm = ref()
function onPageChange(current: number) {
  if (!refSearchForm.value)
    return
  const params = refSearchForm.value.formModel
  fetchRoleData({ ...params, ...basePagination, current })
}
function formartDate(date?: Date) {
  return date
    ? dayJs(date).format('YYYY-MM-DD HH:mm:ss')
    : ''
}
function formatRowIndex(idx: number) {
  const { current, pageSize } = pagination
  return (current - 1) * pageSize + idx + 1
}

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
function deleteRole({ id, name = '' }: Role) {
  if (id === unref(user)?.roleId) {
    Message.error('当前登录用户所属角色不可删除')
    return
  }
  const content = name === ''
    ? '确定要删除该角色吗?'
    : `确定要删除角色 (${name}) 吗?`
  Modal.info({
    title: '删除确认',
    content,
    hideCancel: false,
    onOk: async () => {
      const { code } = await RoleApi.deleteRoleById({ id }) as any
      if (code === 0) {
        Message.success('角色删除成功')
        onPageChange(pagination.current)
      }
      else {
        Message.error('角色删除失败')
      }
    },
  })
}

let menuTreeData = $ref()
async function fetchMenuTreeData() {
  const { data } = await MenuApi.fetchMenuList() as any
  menuTreeData = data.map((i: Menu) => {
    return {
      key: i.id,
      title: i.title,
      icon: () => h(IconDriveFile),
    }
  }) || []
}
fetchMenuTreeData()

const router = useRouter()
let roleModalVisible = $ref(false)
let showRoleModalType = $ref<'add' | 'edit'>('add')
let selectedRole = $ref({})
function showRoleModal(type: 'add' | 'edit', role = {}) {
  showRoleModalType = type
  selectedRole = role
  roleModalVisible = true
}
async function saveRole(data: Record<string, any>) {
  const success = await saveRoleHandler({
    type: showRoleModalType,
    data,
  })
  if (success) {
    useTimeoutFn(() => {
      roleModalVisible = false
      onPageChange(pagination.current)
      if (
        showRoleModalType === 'edit'
      && unref(user)?.roleId === data.id
      && checkRoleMenuListChanged(data)
      ) {
        Message.warning('当前角色权限发生改变, 请重新登录')
        router.push('/login')
        useLogout()
      }
    }, 500)
  }
}

const permissionStore = usePermissionStore()
function checkRoleMenuListChanged(newRole: Role) {
  const originMenuIdList = permissionStore.appMenus.map(i => i.id)
  if (originMenuIdList.length !== newRole.menuIdList!.length)
    return true
  let changed = false
  let idx = 0
  const checkList = newRole.menuIdList!
  while (!changed && idx < checkList.length) {
    if (!originMenuIdList.includes(checkList[idx])) {
      changed = true
      break
    }

    idx++
  }
  return changed
}
</script>

<template>
  <div>
    <PageHeader />
    <a-card title="查询角色">
      <template #extra>
        <a-button type="text" size="small" font-bold @click="showRoleModal('add')">
          <template #icon>
            <IconPlus />
          </template>
          添加
        </a-button>
      </template>
      <RoleSearchForm ref="refSearchForm" @fetchData="fetchRoleData" />
      <a-table
        row-key="id"
        :loading="loading"
        :data="tabledata"
        :bordered="false"
        :pagination="tabledata.length > pagination.pageSize ? pagination : false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
            title="序号"
            data-index="number"
            align="center"
          >
            <template #cell="{ rowIndex }">
              {{ formatRowIndex(rowIndex) }}
            </template>
          </a-table-column>
          <a-table-column
            title="角色名称"
            data-index="name"
            align="center"
          />
          <a-table-column
            title="角色描述"
            data-index="description"
            align="center"
          />
          <a-table-column
            title="创建时间"
            data-index="createTime"
            align="center"
          >
            <template #cell="{ record }">
              {{ formartDate(record.createTime) }}
            </template>
          </a-table-column>
          <a-table-column
            title="修改时间"
            data-index="updateTime"
            align="center"
          >
            <template #cell="{ record }">
              {{ formartDate(record.updateTime) }}
            </template>
          </a-table-column>
          <a-table-column
            title="操作"
            data-index="operations"
            align="center"
          >
            <template #cell="{ record }">
              <a-button type="text" size="small" font-bold @click="showRoleModal('edit', record)">
                编辑
              </a-button>
              <a-button type="text" size="small" font-bold @click="deleteRole(record)">
                删除
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <RoleModal
      v-model:visible="roleModalVisible"
      :type="showRoleModalType"
      :role="selectedRole"
      :menu-tree-data="menuTreeData"
      @save-role="saveRole"
    />
  </div>
</template>
