<script setup lang="ts">
import ColorPicker from './ColorPicker.vue'

const appStore = useAppStore()
const {
  menuShape,
  menuInverted,
  fixHeader,
  showTheLogo,
  primaryColor,
  openAnimation,
  animationMode,
} = appStore.getStageVal()
const switchRect = reactive<any>({
  menuShape,
  menuInverted,
  primaryColor,
  fixHeader,
  showTheLogo,
  openAnimation,
  animationMode,
})
const switchItems = [
  { name: '页面Logo', prop: 'showTheLogo', type: 'switch', dependOn: undefined },
  { name: '固定页头', prop: 'fixHeader', type: 'switch', dependOn: undefined },
  { name: '主要色调', prop: 'primaryColor', type: 'colorPicker', dependOn: undefined },
  { name: '菜单反转色', prop: 'menuInverted', type: 'switch', dependOn: undefined },
  { name: '菜单形状', prop: 'menuShape', type: 'select', dependOn: undefined },
  { name: '页面切换动画', prop: 'openAnimation', type: 'switch', dependOn: undefined },
  { name: '页面切换动画类型', prop: 'animationMode', type: 'select', dependOn: 'openAnimation' },
]
const filterSwitchItems = computed(() => {
  return switchItems.filter(i => i.dependOn === undefined || switchRect[i.dependOn!])
})
const switchColors = {
  checked: 'rgb(var(--primary-6))',
  unchecked: 'rgb(var(--gray-6))',
}
const selectOptions: Record<string, any> = {
  animationMode: [
    { label: '滑动', value: 'fade-slide' },
    { label: '消退', value: 'fade' },
    { label: '底部消退', value: 'fade-bottom' },
    { label: '缩放消退', value: 'fade-scale' },
    { label: '渐变', value: 'zoom-fade' },
    { label: '闪现', value: 'zoom-out' },
  ],
  menuShape: [
    { label: '方形', value: 'square' },
    { label: '圆形', value: 'round' },
  ],
}
</script>

<template>
  <div ha of="x-hidden y-auto" flex="~ col" gap-4>
    <div v-for="{ name, prop, type }, idx of filterSwitchItems" :key="idx">
      <span>{{ name }}</span>
      <ColorPicker v-if="type === 'colorPicker'" v-model:color-name="primaryColor" />
      <a-switch
        v-if="type === 'switch'"
        v-model="switchRect[prop]"
        type="round" float-right
        :checked-color="switchColors.checked"
        :unchecked-color="switchColors.unchecked"
      />
      <a-select
        v-if="type === 'select'"
        v-model="switchRect[prop]" float-right class="!w-120px"
        :options="selectOptions[prop]" size="small"
      />
    </div>
  </div>
</template>

