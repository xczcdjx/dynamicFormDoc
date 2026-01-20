## EleZealTable

对 Element Plus `ElTable + ElTableColumn` 的轻量封装：通过 `columns` 快速生成列，支持三种单元格渲染方式（`render2` / slot /
`row[prop]`），并内置 `v-loading`、`stripe`、`border` 等常用配置。

---

### Props

| 属性名           | 说明                              | 类型                              | 默认值     | 必填 |
|---------------|---------------------------------|---------------------------------|---------|----|
| `data`        | 表格数据                            | `any[]`                         | `[]`    | 否  |
| `columns`     | 列配置                             | `ZealColumn<any>[]`             | `[]`    | 否  |
| `loading`     | 表格 loading（使用 `v-loading`）      | `boolean`                       | `false` | 否  |
| `maxHeight`   | 表格最大高度（传给 `ElTable.max-height`） | `number \| string`              | `-`     | 否  |
| `columnAlign` | 全局列对齐（当单列未设置 `align` 时生效）       | `'left' \| 'center' \| 'right'` | `-`     | 否  |
| `stripe`      | 斑马纹                             | `boolean`                       | `true`  | 否  |
| `border`      | 边框                              | `boolean`                       | `false` | 否  |
| `tableConfig` | 透传 `ElTable` 配置（会与 attrs 一起传入）  | `Partial<TableProps<any>>`      | `-`     | 否  |

> 说明：组件会把 `attrs` 也透传给 `ElTable`，因此你可以直接在 `EleZealTable` 上写 `row-key`、`highlight-current-row` 等原生
`ElTable` 属性。

---

### Slots（`EleZealTableSlots`）

| 插槽名       | 参数说明 | 描述                                               |
|-----------|------|--------------------------------------------------|
| `default` | `-`  | 默认插槽：表格内容区域（会透传给 `ElTable`）。                     |
| `append`  | `-`  | 追加内容插槽：在表格最后一行后追加内容（对应 `ElTable` 的 `append`）。    |
| `empty`   | `-`  | 空数据插槽：当 `data` 为空时的占位内容（对应 `ElTable` 的 `empty`）。 |

* 组件将 `v-slots={slots}` 原样透传给 `ElTable`，因此 **`ElTable` 支持的插槽**均可直接使用（如 `empty`、`append` 等）。
* 单元格插槽命名规则见下方。

---

#### 单元格渲染优先级

每一列的 `ElTableColumn.default` 渲染顺序如下：

1. **`render2(row, $index)`**：如果列配置里提供 `render2`，直接使用它渲染（最高优先级）
2. **具名 slot**：如果存在对应的 cell slot，则使用 slot 渲染
3. **`row[prop]`**：如果列配置提供了 `prop`，默认渲染 `scope.row[prop]`
4. 以上都没有：返回 `null`

---

#### 单元格 slot 命名规则

每列会计算一个 `slotKey`：

* 如果列配置提供了 `slot`：`slotKey = slot`
* 否则如果提供了 `prop`：`slotKey = 'cell-' + prop`（例如 `prop: 'name'` → `#cell-name`）
* 否则：无 slotKey

因此你可以这样写：

* `prop` 自动 slot：`#cell-name`
* 自定义 slot key：列配置 `slot: 'action'` → 使用 `#action`

---

### 示例

> 常见用法（prop + slot + render2）

```vue

<script setup lang="ts">
  import type {ZealColumn} from '@/xxx' // 你的导出路径

  type Row = { name: string; age: number }

  const data: Row[] = [
    {name: 'Alice', age: 18},
    {name: 'Bob', age: 20}
  ]

  const columns: ZealColumn<Row>[] = [
    {label: 'Name', prop: 'name', minWidth: 120},
    {label: 'Age', prop: 'age', width: 80, align: 'center'},
    {label: 'Action', key: 'action', slot: 'action', width: 160, fixed: 'right'},
    {
      label: 'Custom',
      key: 'custom',
      render2: (row) => <span style = "font-weight:600" > {row.name} < /span>
    }
  ]
</script>

<template>
  <EleZealTable
      :data="data"
      :columns="columns"
      :loading="false"
      :maxHeight="360"
      columnAlign="left"
      stripe
      border
  >
    <!-- prop 自动 slot：cell-name -->
    <template #cell-name="{ row }">
      <span>{{ row.name }}</span>
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
```

---

