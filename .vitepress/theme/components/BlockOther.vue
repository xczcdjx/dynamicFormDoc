<template>
  <div class="demo-block">
    <!-- 预览区域 -->
    <div class="demo-preview">
      <ClientOnly>
        <slot :dl="{url:linkUrl,isLocal}"/>
      </ClientOnly>
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
            v-if="linkUrl"
            class="demo-icon-btn"
            :href="lUrl"
            target="_blank"
            rel="noreferrer"
            title="在新窗口打开"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 3h7v7" />
            <path d="M10 14L21 3" />
            <path d="M21 14v7h-7" />
            <path d="M3 10V3h7" />
          </svg>
        </a>

        <button
            class="demo-icon-btn"
            type="button"
            title="展开代码"
            @click="toggleCode"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M8 16L4 12l4-4" />
            <path d="M16 8l4 4-4 4" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 代码区域 -->
    <details ref="codeRef" class="demo-code-wrap">
      <summary class="demo-summary sr-only">Details</summary>
      <div class="demo-code">
        <slot name="code" />
      </div>
    </details>
  </div>
</template>

<script setup>

import {computed, ref} from "vue";

const props = defineProps({
  linkUrl: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  isLocal: {
    type: Boolean,
    default: false,
  },
});

const codeRef = ref(null);
const lUrl=computed(()=>{
  let u = new URL(props.linkUrl);
  if (props.isLocal) u=new URL('http://localhost:6003'+u.pathname)
  return u.toString()
})
const toggleCode = () => {
  if (codeRef.value) {
    codeRef.value.open = !codeRef.value.open;
  }
};
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

.demo-code {
  padding: 0 20px 16px;
}

.demo-toolbar {
  display: flex;
  justify-content: center;
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