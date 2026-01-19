<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import {useData} from 'vitepress'
import {darkTheme, NConfigProvider, NMessageProvider} from 'naive-ui'

const {isDark} = useData()
// 跟随 VitePress 的暗黑/明亮
const naiveTheme = computed(() => (isDark.value ? darkTheme : null))
console.log(isDark.value)

// 覆盖 Naive UI 主题色
const themeOverrides = ref({})

function syncFromVitepressCssVars() {
  const css = getComputedStyle(document.documentElement)

  // VitePress 品牌色（暗黑/明亮会自动切换，只要重新读一遍）
  const brand1 = css.getPropertyValue('--vp-c-brand-1').trim()
  const brand2 = css.getPropertyValue('--vp-c-brand-2').trim() || brand1
  const brand3 = css.getPropertyValue('--vp-c-brand-3').trim() || brand1

  // 你也可以把背景/文字一起同步（可选）
  // const bg = css.getPropertyValue('--vp-c-bg').trim()
  // const text1 = css.getPropertyValue('--vp-c-text-1').trim()

  themeOverrides.value = {
    common: {
      primaryColor: brand1,
      primaryColorHover: brand2,
      primaryColorPressed: brand3,
      primaryColorSuppl: brand2,

      // 可选：同步一些语义色
      // infoColor: brand1,
      // successColor: brand1,
    },

    // 可选：想让 Naive 的背景也贴合 VitePress，可以在这里覆盖
    // Card: { color: bg },
    // Typography: { textColor: text1 }
  }
}

/*const alertResult = (data) => {
  window.alert(JSON.stringify(data,null,2))
}*/
onMounted(() => {
  syncFromVitepressCssVars()
  watch(isDark, () => syncFromVitepressCssVars()) // 切换明暗主题时重新读取
})
</script>
<template>
  <n-config-provider :theme="naiveTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-modal-provider>
        <div class="demo-block">
          <!-- 效果区域 -->
          <div class="demo-preview">
            <slot/>
          </div>
          <!-- 代码区域 -->
          <div class="demo-code">
            <slot name="code"/>
          </div>
        </div>
      </n-modal-provider>
    </n-message-provider>
  </n-config-provider>
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
<script setup lang="ts">
</script>