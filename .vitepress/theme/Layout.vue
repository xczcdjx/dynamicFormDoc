<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { watchEffect } from 'vue'
import { i18n } from './i18n'

const { lang } = useData()

watchEffect(() => {
  i18n.global.locale.value = lang.value as any
})
</script>

<template>
  <DefaultTheme.Layout />
</template>
