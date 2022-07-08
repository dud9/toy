<script setup lang="ts">
import { EquipmentApi } from '~/server/api/equipment'
import type { Equipment } from '~/types'

const {
  tabIdx = 1,
} = defineProps<{
  tabIdx?: number
}>()

const { equipIp } = useAppStore()

const refForm = ref()
const validateTrigger = ref<('change' | 'input' | 'focus' | 'blur')[]>(['change', 'input'])

const baseFormModel: Equipment = {
  id: undefined,
  name: '',
  type: '',
  productionDate: undefined,
  information: '',
  ip: '',
  port: undefined,
  collectInterval: undefined,
}

let formModel = $ref<Equipment>({
  ...baseFormModel,
})
async function getFormModel() {
  const { code, data, message } = await EquipmentApi.fetchEquipmentByIp({ ip: equipIp }) as any
  if (code !== 0) {
    Message.error(message || '设备不存在')
    formModel = {
      ...baseFormModel,
    }
  }
  formModel = {
    ...data,
  }
}
getFormModel()

async function resetFormModel() {
  getFormModel()
  refForm.value && refForm.value.clearValidate()
}

watch(() => tabIdx, resetFormModel)

function onSubmit() {
  refForm.value.validate(async (errors: any) => {
    if (errors)
      return
    const { id, username, name } = JSON.parse(JSON.stringify(unref(formModel)))
    const { code } = await UserApi.updateUser({
      id,
      username,
      name,
    }) as any
    if (code !== 0) {
      Message.error('设备信息配置失败')
      return
    }
    Message.success('设备信息配置成功')
  })
}
</script>

<template>
  <a-form ref="refForm" :model="formModel" size="large" class="lg:!w-540px  md:!w-440px sm:!w-350px xs:!w-260px mx-auto">
    <a-form-item
      field="name" label="设备名称" hide-asterisk feedback
      :rules="[
        { required: true, message: '设备名称是必须的' },
      ]"
      :validate-trigger="validateTrigger"
    >
      <a-input
        v-model="formModel.name"
        placeholder="请输入设备名称..."
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="type" label="设备类型" hide-asterisk feedback
      :rules="[
        { required: true, message: '设备类型是必须的' },
      ]"
      :validate-trigger="validateTrigger"
    >
      <a-input
        v-model="formModel.type"
        placeholder="请输入设备类型..."
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="productionDate" label="出厂时间" hide-asterisk feedback
      :rules="[
        { required: true, message: '出厂时间是必须的' },
      ]"
      :validate-trigger="validateTrigger"
    >
      <a-input
        v-model="formModel.productionDate"
        placeholder="请输入出厂时间..."
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="information" label="出厂信息" hide-asterisk feedback
      :rules="[
        { required: true, message: '出厂信息是必须的' },
      ]"
      :validate-trigger="validateTrigger"
    >
      <a-input
        v-model="formModel.information"
        placeholder="请输入出厂信息..."
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="ip" label="设备IP" hide-asterisk feedback
      :rules="[
        { required: true, message: '设备IP是必须的' },
      ]"
      :validate-trigger="validateTrigger"
    >
      <a-input
        v-model="formModel.ip"
        placeholder="请输入设备IP..."
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="port" label="设备端口号" hide-asterisk feedback
      :rules="[
        { required: true, message: '设备端口号是必须的' },
      ]"
      :validate-trigger="validateTrigger"
    >
      <a-input
        v-model="formModel.port"
        placeholder="请输入设备端口号..."
        allow-clear
      />
    </a-form-item>
    <a-form-item
      field="collectInterval" label="采集间隔(毫秒)" hide-asterisk feedback
      :rules="[
        { required: true, message: '采集间隔(毫秒)是必须的' },
      ]"
      :validate-trigger="validateTrigger"
    >
      <a-input
        v-model="formModel.collectInterval"
        placeholder="请输入采集间隔(毫秒)..."
        allow-clear
      />
    </a-form-item>
    <div m="x-auto y-20px">
      <a-button
        mr-3 font-bold
        type="primary"
        @click="onSubmit"
      >
        更新设备
      </a-button>
      <a-button
        font-bold
        @click="resetFormModel"
      >
        重置
      </a-button>
    </div>
  </a-form>
</template>

