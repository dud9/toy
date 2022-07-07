<script setup lang="ts">
import { IconCamera, IconEye, IconPlus } from '@arco-design/web-vue/es/icon'

const {
  avatar = undefined,
  showImagePreview = true,
} = defineProps<{
  avatar?: string
  showImagePreview?: boolean
}>()
const emit = defineEmits(['update:avatar'])

const file = ref()
const imagePreviewVisible = ref(false)
watch(() => avatar, (val) => {
  file.value = val
    ? {
        url: avatar,
      }
    : undefined
})

function onChange(_: any, currentFile: any) {
  file.value = {
    ...currentFile,
  }
  getBase64(unref(file).file).then((imageAsDateURL) => {
    emit('update:avatar', imageAsDateURL)
  })
}

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let imageAsDateURL = ''
    reader.readAsDataURL(file)
    reader.onload = (data) => {
      const res: any = data.target || data.srcElement
      imageAsDateURL = res.result
    }
    reader.onerror = (err) => {
      reject(err)
    }
    reader.onloadend = () => {
      resolve(imageAsDateURL)
    }
  })
}

function beforeUpload(file: any): any {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image')) {
      Message.error('请上传图片')
      return resolve(false)
    }
    resolve(true)
  })
}
</script>

<template>
  <a-space w-full flex justify-center items-center>
    <a-upload
      :file-list="file ? [file] : []"
      :show-file-list="false"
      :auto-upload="false"
      :image-preview="true"
      @change="onChange"
      @before-upload="beforeUpload"
    >
      <template #upload-button>
        <div
          :class="`arco-upload-list-item${
            file && file.status === 'error'
              ? ' arco-upload-list-item-error'
              : ''
          }`"
        >
          <div
            v-if="file && file.url"
            class="arco-upload-list-picture custom-upload-avatar"
          >
            <img :src="file.url" rounded-full>
            <div class="arco-upload-list-picture-mask" rounded-full>
              <IconCamera />
            </div>
            <a-progress
              v-if="file.status === 'uploading' && file.percent < 100"
              absolute class="left-1/2 top-1/2 translate-x-1/2 translate-y-1/2"
              :percent="file.percent"
              type="circle"
              size="mini"
            />
          </div>
          <div v-else class="arco-upload-picture-card">
            <div class="arco-upload-picture-card-text">
              <IconPlus />
              <div mt-10px font-bold>
                上传
              </div>
            </div>
          </div>
        </div>
      </template>
    </a-upload>
    <div v-if="showImagePreview && file?.url">
      <a-button type="text" @click="imagePreviewVisible = true">
        <IconEye />
        预览
      </a-button>
      <a-image-preview
        v-model:visible="imagePreviewVisible"
        :src="file.url"
      />
    </div>
  </a-space>
</template>
