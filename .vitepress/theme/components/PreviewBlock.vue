<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {useData} from 'vitepress'

const props = withDefaults(defineProps<{ url: string, hideMenu: boolean, mh: string }>(), {
  mh: '300px'
})
const {isDark} = useData()
const iframeRef = ref<HTMLIFrameElement | null>(null)
const src = computed(() => {
  if (!props.hideMenu) return props.url.replace('hideMenu=true','')
  return props.url
})
watch(isDark, (v) => {
  iframeRef.value?.contentWindow?.postMessage(
      {type: 'theme', value: v ? 'dark' : 'light'},
      '*'
  )
}, {immediate: true})
</script>

<template>
  <iframe ref="iframeRef" :src="src"
          class="iframeCls"
          :style="{
    minHeight:mh,
          }"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  />
</template>
<style scoped>
.iframeCls {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}
</style>