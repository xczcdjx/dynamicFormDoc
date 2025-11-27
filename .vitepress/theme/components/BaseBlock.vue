<template>
  <div class="demo-block">
    <!-- 代码区域 -->
    <div class="demo-code">
      <slot name="code" />
    </div>

    <!-- 效果区域 -->
    <div class="demo-preview">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.demo-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.demo-code {
  margin-bottom: 12px;
}

.demo-preview {
  padding: 12px;
  overflow: auto;
  border-top: 1px dashed var(--vp-c-divider);
}
</style>
