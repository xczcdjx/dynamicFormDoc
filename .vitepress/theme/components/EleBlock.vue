<template>
  <div class="demo-block">
    <!-- 预览区域 -->
    <div class="demo-preview">
      <slot :dl="{ url: lUrl }" />
    </div>

    <!-- 说明区域 -->
    <div v-if="title || description" class="demo-desc">
      <div v-if="title" class="demo-desc-title">
        {{ title }}
      </div>
      <div v-if="description" class="demo-desc-text">
        {{ description }}
      </div>
    </div>

    <!-- 底部操作区 -->
    <div class="demo-toolbar">
      <div class="demo-actions">
        <a
            v-show="isOpen"
            class="demo-icon-btn"
            :href="lUrl"
            target="_blank"
            rel="noreferrer"
            :title="hintLang.openNew"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 3h7v7" />
            <path d="M10 14L21 3" />
            <path d="M21 14v7h-7" />
            <path d="M3 10V3h7" />
          </svg>
        </a>

        <button
            v-show="isCopy"
            class="demo-icon-btn"
            type="button"
            :title="copied ? hintLang.copied : hintLang.copy"
            @click="copyCode"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        </button>

        <button
            class="demo-icon-btn"
            type="button"
            :title="hintLang.unfold"
            @click="toggleCode"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 16L4 12l4-4" />
            <path d="M16 8l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 代码区域 -->
    <details ref="codeRef" class="demo-code-wrap">
      <summary class="demo-summary sr-only">Details</summary>
      <div ref="codeContentRef" class="demo-code">
        <slot name="code" />
      </div>
    </details>
  </div>
</template>

<script setup>
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import {ElMessage} from "element-plus";

const props = defineProps({
  linkUrl: {
    type: String
  },
  pathUrl: {
    type: String
  },
  isOpen: {
    type: Boolean
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  isLocal: {
    type: Boolean,
    default: false
  },
  isCopy:{
    type: Boolean,
    default: true
  }
})
const copied = ref(false)
const codeRef = ref(null)
const codeContentRef = ref(null)
const { isDark, lang } = useData()
const site = 'https://xczcdjx.github.io/packageTest/'

const lUrl = computed(() => {
  let u = new URL(props.linkUrl ?? (site + props.pathUrl))

  const hash = u.hash || '#/'
  const hashBody = hash.slice(1)

  const [hashPath, hashQuery = ''] = hashBody.split('?')
  const hashParams = new URLSearchParams(hashQuery)

  hashParams.set('theme', isDark.value ? 'dark' : 'light')
  hashParams.set('hideMenu', 'true')

  u.hash = `${hashPath}?${hashParams.toString()}`

  if (props.isLocal) {
    let p = 6003
    if (u.pathname.includes('Vue2')) p = 6004
    u = new URL(`http://localhost:${p}` + u.pathname + u.search + u.hash)
  }

  return u.toString()
})

const hintLang = computed(() => {
  if (lang.value === 'en-US') {
    return {
      openNew: 'open in new window',
      unfold: 'show code',
      copy: 'copy',
      copied: 'copied'
    }
  }
  return {
    openNew: '在新窗口打开',
    unfold: '展开代码',
    copy: '复制',
    copied: '已复制'
  }
})

const toggleCode = () => {
  if (codeRef.value) {
    codeRef.value.open = !codeRef.value.open
  }
}

const getActiveCodeText = () => {
  const root = codeContentRef.value
  if (!root) return ''

  // 1. 优先找 VitePress code-group 当前激活的面板
  const activePanel =
      root.querySelector('.vp-code-group .blocks > div.active') ||
      root.querySelector('.vp-code-group .blocks > .active')

  if (activePanel) {
    const codeEl = activePanel.querySelector('pre code')
    if (codeEl?.textContent) return codeEl.textContent.trim()
  }

  // 2. 如果没有 code-group，就直接取第一个 code block
  const firstCode = root.querySelector('pre code')
  if (firstCode?.textContent) return firstCode.textContent.trim()

  return ''
}

const copyCode = async () => {
  try {
    const text = getActiveCodeText()
    if (!text) return

    await navigator.clipboard.writeText(text)
    copied.value = true
    ElMessage.success(hintLang.value.copied)
    setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch (e) {
    console.error('copy failed:', e)
  }
}
</script>

<style scoped>
.demo-block {
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.demo-preview {
  padding: 20px;
}

.demo-desc {
  padding: 16px 20px;
  border-top: 1px dashed var(--vp-c-divider);
}

.demo-desc-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}

.demo-desc-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.demo-code-wrap {
  border-top: 1px dashed var(--vp-c-divider);
}

.demo-summary {
  display: none;
}

/*.demo-code {
  padding: 0 8px;
}*/
.demo-code:deep(.vp-code-group){
  margin-top: 0;
}

.demo-toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 10px 16px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.demo-actions {
  display: flex;
  gap: 10px;
}

.demo-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.demo-icon-btn:hover {
  color: var(--vp-c-brand-1);
}
</style>