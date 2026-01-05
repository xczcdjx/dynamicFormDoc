<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import { useData } from 'vitepress'

const props=defineProps<{ url: string }>()
const { isDark } = useData()
const iframeRef = ref<HTMLIFrameElement | null>(null)
const src = computed(() => {
  const u = new URL(props.url)
  u.searchParams.set('theme', isDark.value ? 'dark' : 'light')
  return u.toString()
})
watch(isDark, (v) => {
  iframeRef.value?.contentWindow?.postMessage(
      { type: 'theme', value: v ? 'dark' : 'light' },
      '*'
  )
}, { immediate: true })
</script>

<template>
  <iframe ref="iframeRef" :src="src"
          style="width:100%;height:520px;border:1px solid var(--vp-c-divider);border-radius:12px;"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  />
</template>
