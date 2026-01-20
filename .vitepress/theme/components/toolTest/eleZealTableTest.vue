<script setup lang="ts">
import {EleZealTable} from 'dynamicformdjx/elementPlus'
import type {ZealColumn} from "dynamicformdjx/types/form";
import {h, onMounted, ref} from "vue";
import {ElButton} from "element-plus";

type Row = { name: string; age: number, id: string }

const data = ref<Row[]>([])
const loading = ref<boolean>(false)
const columns: ZealColumn<Row>[] = [
  {type: 'index', label: '#'},
  {label: 'Id', prop: 'id'}, // 默认渲染
  {label: 'Name', prop: 'name'},
  {label: 'Age', prop: 'age', render2: (r) => h('div', {style: {color: 'red'}}, r.age)}, // 使用render2函数渲染
  {label: 'Action', key: 'action', slot: 'action', width: 160, fixed: 'right'},
]

async function fetchData() {
  loading.value = true
  setTimeout(() => {
    data.value = Array(10).fill(0).map((_, i) => ({
      name: `Test_${i + 1}`,
      age: i + 11,
      id: (Date.now() + i * i).toString()
    }))
    loading.value = false
  }, 2000)
}

onMounted(fetchData)
</script>

<template>
  <h3>Ele Table</h3>
  <EleZealTable
      :data="data"
      :columns="columns"
      :loading="loading"
      :maxHeight="360"
      columnAlign="center"
      stripe
      border
  >
    <!-- prop 自动 slot：cell-name -->
    <template #cell-name="{ row }">
      <el-tag>{{ row.name }}</el-tag>
    </template>

    <!-- 自定义 slot key：action -->
    <template #action="{ row }">
      <el-button size="small" type="primary">Edit {{ row.name }}</el-button>
    </template>

    <!-- ElTable 原生 slots 也可用（透传） -->
    <template #empty>
      <div style="padding: 12px;">No Data</div>
    </template>
  </EleZealTable>
</template>
<style scoped>
h3 {
  text-align: center;
  margin-bottom: 15px;
  margin-top: 0;
}
</style>