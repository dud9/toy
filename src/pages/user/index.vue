<script setup lang="ts">
import { IconPlus } from '@arco-design/web-vue/es/icon'
import UserModal from './components/UserModal.vue'
import UserSearchForm from './components/UserSearchForm.vue'
import { saveUserHandler } from './helper'
import type { Pagination, Role, SelectOptionData } from '~/types'

const { loading, setLoading } = useLoading()
let tabledata = $ref([])
const basePagination: Pagination = {
  current: 1,
  pageSize: 10,
}
const pagination = reactive({
  ...basePagination,
})
let roleOptions = $ref<SelectOptionData[]>()
async function fetchRoleOptions() {
  const { data: { records } } = await RoleApi.fetchRoleList({}) as any
  roleOptions = records.map((i: Role) => ({ value: i.id, label: i.name }))
}
fetchRoleOptions()
async function fetchTableData(params: Record<string, any>) {
  params = { ...basePagination, ...params }
  setLoading(true)
  try {
    const { data: { records, total } } = await UserApi.fetchUserList(params) as any
    tabledata = records
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
  fetchTableData({ ...params, ...basePagination, current })
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

let userModalVisible = $ref(false)
let showUserModalType = $ref<'add' | 'edit'>('add')
let selectedUser = $ref({})
function showUserModal(type: 'add' | 'edit', user = {}) {
  showUserModalType = type
  selectedUser = user
  userModalVisible = true
}
function saveUser(data: Record<string, any>) {
  saveUserHandler({
    type: showUserModalType,
    data,
  })
  useTimeoutFn(() => {
    userModalVisible = false
  }, 500)
}
</script>

<template>
  <div>
    <PageHeader />
    <a-card title="查询用户">
      <template #extra>
        <a-button type="text" size="small" font-bold>
          <template #icon>
            <IconPlus />
          </template>
          添加
        </a-button>
      </template>
      <UserSearchForm ref="refSearchForm" :role-options="roleOptions" @fetchData="fetchTableData" />
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
            title="账号"
            data-index="username"
            align="center"
          />
          <a-table-column
            title="名称"
            data-index="name"
            align="center"
          />
          <a-table-column
            title="角色"
            data-index="roleId"
            align="center"
          >
            <template #cell="{ record }">
              {{ record?.role?.name || '无' }}
            </template>
          </a-table-column>
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
              <a-button type="text" size="small" font-bold @click="showUserModal('edit', record)">
                编辑
              </a-button>
              <a-button type="text" size="small" font-bold>
                删除
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <UserModal
      v-model:visible="userModalVisible"
      :type="showUserModalType"
      :role-options="roleOptions"
      :user="selectedUser"
      @save-user="saveUser"
    />
  </div>
</template>
