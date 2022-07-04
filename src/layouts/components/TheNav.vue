<script setup lang="ts">
import NavFullScreen from '../widgets/NavFullScreen.vue'
import NavStyleSetting from '../widgets/NavStyleSetting.vue'
import NavAvatar from '../widgets/NavAvatar.vue'
import Logo from '../widgets/Logo.vue'
import Menu from '../widgets/Menu.vue'

const { appMenus } = storeToRefs(usePermissionStore())

const { width } = useWindowSize()
let shortLogo = $ref(false)
watchEffect(() => {
  shortLogo = width.value < 1200
})
const navStyleSettingPanelVisible = ref(false)
</script>

<template>
  <div flex justify-between items-center pr-5 shadow="sm light-900 dark:dark-700">
    <Logo :class="shortLogo ? 'w-64px' : 'w-200px'" />
    <Menu mode="horizontal" :metadata="appMenus" />
    <div flex-auto />
    <a
      icon-btn text-lg i-carbon-logo-github mx-3
      href="https://github.com/dud9/parfait"
      target="_blank" title="GitHub"
    />
    <NavFullScreen mr-3 />
    <DarkToggle mr-3 />
    <NavStyleSetting v-model:visible="navStyleSettingPanelVisible" />
    <NavAvatar mx-3 />
  </div>
</template>
