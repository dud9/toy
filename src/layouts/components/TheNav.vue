<script setup lang="ts">
import NavTimestamp from '../widgets/NavTimestamp.vue'
import NavFullScreen from '../widgets/NavFullScreen.vue'
import NavStyleSetting from '../widgets/NavStyleSetting.vue'
import NavAvatar from '../widgets/NavAvatar.vue'
import NavLogo from '../widgets/NavLogo.vue'

const { width } = useWindowSize()
let shortLogo = $ref(false)
watchEffect(() => {
  shortLogo = width.value < 1200
})
const navStyleSettingPanelVisible = ref(false)
</script>

<template>
  <div flex justify-between items-center pr-5 shadow="sm light-900 dark:dark-700">
    <NavLogo :class="shortLogo ? 'w-64px' : 'w-200px'" />
    <div flex-auto />
    <NavTimestamp />
    <a
      icon-btn text-lg i-carbon-logo-github mx-4
      href="https://github.com/dud9/parfait"
      target="_blank" title="GitHub"
    />
    <NavFullScreen mr-4 />
    <DarkToggle mr-4 />
    <NavStyleSetting v-model:visible="navStyleSettingPanelVisible" />
    <NavAvatar ml-4 />
  </div>
</template>
