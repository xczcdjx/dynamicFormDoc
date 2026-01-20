<script setup>
import {NButton} from "naive-ui";
import {NaiZealCard} from "dynamicformdjx/naiveUi";
</script>
<template>
  <NaiZealCard zeal-height="50vh" title="Zeal Card">
    <template #searchForm>
      <!-- 你的筛选表单 -->
    </template>

    <template #controlBtn>
      <n-button size="small" type="primary">New</n-button>
    </template>

    <template #default="{ tableHeight, isMobile }">
      <div>tableHeight: {{ tableHeight }}, isMobile: {{ isMobile }}</div>
      <!-- 你的表格组件，传入 tableHeight 做滚动高度等 -->
    </template>

    <template #footer="{ width }">
      <div>window width: {{ width }}</div>
    </template>

    <template #rest>
      <!-- 卡片下方扩展区（比如分页） -->
    </template>
  </NaiZealCard>
</template>
<style scoped></style>