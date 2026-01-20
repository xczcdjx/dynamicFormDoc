---
outline: deep
---

# Zeal 组件

提供便于列表操作的组件
> 下方省略前缀，如果你使用的ui库是naive ui,使用`NaiXxx`导入;
> 如果使用elementPlus,使用`EleXxx`导入

## 1. PopupModal

弹出模态框,以naive ui版本为例

### Props

| 属性名         | 说明                                      | 类型                                                  | 默认值                    | 必填 |
|-------------|-----------------------------------------|-----------------------------------------------------|------------------------|----|
| title       | 弹窗标题；也可传渲染函数                            | `string \| (() => VNodeChild)`                      | `-`                    | 否  |
| modalProps  | 透传 / 覆盖 Naive UI `NModal` 的参数（会与默认值合并）  | `ModalProps`                                        | `-`                    | 否  |
| to          | 挂载容器（传给 `NModal` 的 `to`）                | `string \| HTMLElement`                             | `-`                    | 否  |
| showClose   | 是否显示右上角关闭按钮（`closable`）                 | `boolean`                                           | `true`                 | 否  |
| closeOnMask | 点击遮罩是否关闭（`maskClosable`）                | `boolean`                                           | `true`                 | 否  |
| width       | 弹窗宽度（通过 `style.width` 设置）               | `string`                                            | `'min(1080px,90%)'`    | 否  |
| onCancel    | 点击取消按钮回调；返回promise 为 `false` 时保持打开，否则关闭 | `() => boolean \| void \| Promise<boolean \| void>` | `() => undefined`      | 否  |
| onSubmit    | 点击提交按钮回调；返回promise 为 `false` 时保持打开，否则关闭 | `() => boolean \| void \| Promise<boolean \| void>` | `() => undefined`      | 否  |
| footerTxt   | 页脚按钮文案 `[取消, 提交]`                       | `string[]`                                          | `['Cancel', 'Submit']` | 否  |

> 其中elementPlus 版本中`title`只支持`String`,`modalProps`为`ElDialog`的`DialogProps`

### Expose

| 方法名    | 说明                                     | 签名                      |
|--------|----------------------------------------|-------------------------|
| toggle | 切换显示/隐藏；不传参则取反，传 `true/false` 则强制打开/关闭 | `(f?: boolean) => void` |

### Slots

#### naiveUi 版本

[//]: # (> 可参考 <a href="https://www.naiveui.com/zh-CN/os-theme/components/modal#Modal%EF%BC%88Card-%E9%A2%84%E8%AE%BE%EF%BC%89Props"  target="_blank" rel="noreferrer">Naive ui modal slots</a>)

- default：弹窗主体内容（你放在组件标签内部的内容）

- 其他 Naive UI NModal（preset 为 card 时）支持的插槽也会透传（通过 ...slots），例如你可以自定义 footer 覆盖默认底部按钮

注意：组件内默认实现了 footer，但如果你显式提供 #footer 插槽，会覆盖默认 footer。

#### elementPlus 版本.

> type `ElDialogSlots`

| 插槽名       | 参数说明                                                         | 描述                                                                               |
|-----------|--------------------------------------------------------------|----------------------------------------------------------------------------------|
| `default` | `-`                                                          | 默认插槽：对话框主体内容（content 区域）。                                                        |
| `footer`  | `-`                                                          | 底部插槽：对话框底部操作区（通常放按钮）。                                                            |
| `title`   | `-`                                                          | 标题插槽：仅替换标题文本区域。                                                                  |
| `header`  | `{ close: () => void; titleId: string; titleClass: string }` | 头部插槽：自定义整个 header 区域。`close` 用于关闭弹窗；`titleId`/`titleClass` 用于无障碍与样式绑定（建议用于标题节点）。 |

### 示例

<NaiBlock>
<template #code>
<details>
<summary>code</summary>

```vue

<script setup lang="ts">
  import {NButton} from "naive-ui";
  import {NaiPopupModal, type naiPopupModalRef} from "dynamicformdjx/naiveUi";
  import {ref} from "vue";

  const naiPopupModalRef = ref<naiPopupModalRef | null>(null)
  const toggleShow = () => {
    naiPopupModalRef.value?.toggle?.(true);
  }
  const onCancel = async () => {

  }
  const onSubmit = async () => {
    return await new Promise<boolean>(resolve => setTimeout(() => {
      resolve(true)
    }, 2000))
  }
</script>

<template>
  <n-button @click="toggleShow">nai popupOpen</n-button>
  <NaiPopupModal title="addTest" ref="naiPopupModalRef" :on-cancel="onCancel" :on-submit="onSubmit"
                 :close-on-mask="false">
    <p>Test Modal</p>
    <!--    <template #footer>
          <n-button @click="onSubmit">submit</n-button>
        </template>-->
  </NaiPopupModal>
</template>

<style scoped>

</style>
```

</details>

  </template>
<PopupModal/>
</NaiBlock>

## 2. ZealCard

基于`NCard`或`ElCard`的通用页面布局组件：内置**标题区 + 搜索区 + 控制按钮区 + 表格内容区 + footer + 底部扩展区（rest）**。
通过监听容器尺寸计算 `tableHeight`，并根据窗口尺寸输出 `isMobile / width / height`，用于响应式布局。

---

### Props

| 属性名             | 说明                                                          | 类型                | 默认值                  | 必填 |
|-----------------|-------------------------------------------------------------|-------------------|----------------------|----|
| title           | 标题文本（默认 header 渲染使用）                                        | `string`          | `-`                  | 否  |
| zealHeight      | 外层可用高度（参与计算容器高度）                                            | `string`          | `'100vh'`            | 否  |
| outPadding      | 外层上下 padding（用于 `height: calc(zealHeight - outPadding*2)`）  | `number`          | `20`                 | 否  |
| searchBtnTxt    | 默认搜索按钮文案 `[重置, 查询]`（当存在 `searchForm` 且未自定义 `searchBtn` 时生效） | `[string,string]` | `['Reset','Search']` | 否  |
| checkWindowSize | 响应式断点 `[mobileWidth, mobileHeight]`（传给 `useWindowSize`）     | `[number,number]` | `[756, 500]`         | 否  |

---

### Slots

> `SizeObjType = { isMobile: boolean; width: number; height: number }`

| 插槽名          | 参数说明                                           | 描述                                                                  |
|--------------|------------------------------------------------|---------------------------------------------------------------------|
| `header`     | `(size: SizeObjType)`                          | 自定义整个头部区域。提供后会覆盖默认 header（标题 + 搜索区）。                                |
| `searchForm` | `-`                                            | 搜索表单区域（默认 header 内）。                                                |
| `searchBtn`  | `-`                                            | 搜索按钮区域（默认 header 内）。若不提供且提供了 `searchForm`，会显示默认的 Reset/Search 两个按钮。 |
| `controlBtn` | `-`                                            | 右侧控制按钮区域（默认 header 右侧）。                                             |
| `toolBtn`    | `-`                                            | 右侧工具按钮区域（跟随 `controlBtn` 后面渲染）。                                     |
| `default`    | `(ctx: { tableHeight: number } & SizeObjType)` | 主体内容区。会注入 `tableHeight` 与窗口尺寸信息，常用于表格高度自适应。                         |
| `footer`     | `(size: SizeObjType)`                          | 卡片底部 footer 区域。                                                     |
| `rest`       | `-`                                            | 卡片外部的底部扩展区（位于 `NCard` 下方，仍在 zealCard 容器内）。                          |

---

#### 参数说明

| 参数名           | 类型        | 说明                                          |
|---------------|-----------|---------------------------------------------|
| `isMobile`    | `boolean` | 由 `useWindowSize(checkWindowSize)` 推导的移动端标识 |
| `width`       | `number`  | 当前窗口宽度                                      |
| `height`      | `number`  | 当前窗口高度                                      |
| `tableHeight` | `number`  | 由 `useObserverSize(NCard)` 计算得到的可用表格高度      |

---

### 默认布局逻辑（简述）

* 若未提供 `header` 插槽：header 会显示 `title` + `searchForm` +（`searchBtn` 或默认 Reset/Search）
* 只要提供了 `searchForm` 且未提供 `searchBtn`，就会自动渲染默认按钮（文案来自 `searchBtnTxt`）
* `default` 插槽会收到 `{ tableHeight, isMobile, width, height }`，便于表格/列表自适应高度
* `rest` 渲染在卡片下方，适合放分页、弹窗挂载点、额外说明等

---

### 示例

<NaiBlock>
<template #code>
<details>
<summary>code</summary>

```vue

<script setup>
  import {NaiZealCard} from "dynamicformdjx/naiveUi";
</script>
<template>
  <NaiZealCard title="Zeal Card">
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
```

</details>
</template>
<ZealCard/>
</NaiBlock>

---

## 3. ZealTableSearch

通用表格搜索区组件：支持 **桌面直显表单** 与 **移动端抽屉搜索（Drawer）** 两种模式；内置 Reset / Search 按钮，并通过 `expose`
提供外部调用能力。

* `copyDefault=true`：组件挂载后会缓存一次初始表单值；点击 Reset 时恢复到该缓存值。
* `copyDefault=false`：Reset 走 `useForm.onReset(null)` 的默认重置。
* `closeDrawerAuto=false` 时：监听 `isMobile`，当从移动端切回非移动端（`isMobile=false`）会自动关闭抽屉；若
  `closeDrawerAuto=true` 则不做该处理。

### Props

| 属性名                 | 说明                            | 类型             | 默认值                  | 必填 |
|---------------------|-------------------------------|----------------|----------------------|----|
| title               | 标题文本（可被 `#title` 插槽覆盖）        | `string`       | `-`                  | 否  |
| drawerTitle         | 抽屉标题（不传则取 `title`）            | `string`       | `-`                  | 否  |
| searchItems         | 动态表单项配置（传给 `NaiDynamicForm`）  | `DyFormItem[]` | `[]`                 | 否  |
| searchFormMaxHeight | 非抽屉模式下表单容器最大高度                | `string`       | `'200px'`            | 否  |
| drawerMaxHeight     | 抽屉模式最大高度（`NDrawer.maxHeight`） | `number`       | `420`                | 否  |
| drawerOpenTxt       | 移动端“打开抽屉”按钮文本                 | `string`       | `'Search Drawer'`    | 否  |
| searchBtnTxt        | 默认按钮文案 `[重置, 查询]`             | `string[]`     | `['Reset','Search']` | 否  |
| mobileDrawer        | 是否启用移动端抽屉模式                   | `boolean`      | `true`               | 否  |
| closeDrawerAuto     | 移动端状态变化时是否自动关闭抽屉              | `boolean`      | `true`               | 否  |
| copyDefault         | 是否缓存初始表单值作为“重置”目标             | `boolean`      | `false`              | 否  |
| isMobile            | 外部传入的移动端标识（用于切换 UI 形态）        | `boolean`      | `false`              | 否  |

1. 模式判定：当 `mobileDrawer=true` 且 `isMobile=true` 时，显示抽屉入口按钮；否则显示直显搜索表单。
2. elementPlus版本`drawerMaxHeight`改为`size`属性传入，类型为`string|number`

---

### Emits

| 事件名        | 参数               | 描述                             |
|------------|------------------|--------------------------------|
| `onReset`  | `-`              | 点击重置触发（重置后会关闭抽屉）               |
| `onSearch` | `(data: object)` | 点击查询触发；`data` 为当前表单值（查询后会关闭抽屉） |

---

### Expose

| 方法名            | 参数说明            | 描述                                     |
|----------------|-----------------|----------------------------------------|
| `toggleDrawer` | `(f?: boolean)` | 打开/关闭抽屉；不传则取反                          |
| `onReset`      | `-`             | 触发重置逻辑（并 emit `onReset`，随后关闭抽屉）        |
| `onSearch`     | `-`             | 触发查询逻辑（并 emit `onSearch(data)`，随后关闭抽屉） |
| `getParams`    | `-`             | 获取当前表单值（`useForm.getValues()`）         |

---

### Slots

| 插槽名         | 参数说明                                            | 描述                           |
|-------------|-------------------------------------------------|------------------------------|
| `title`     | `-`                                             | 标题区域插槽（覆盖默认标题，返回 `VNode[]`）。 |
| `searchBtn` | `{ onSearch: () => void; onReset: () => void }` | 自定义按钮区域（返回 `VNode[]`）。       |
| `drawerBtn` | `{ openDrawer: () => void }`                    | 自定义移动端抽屉入口按钮（返回 `VNode[]`）。  |

---

### 示例

<NaiBlock>
<template #code>
<details>
<summary>code</summary>

```vue [Typescript]

<script setup lang="ts">
  import {ref} from 'vue'
  import {NaiZealTableSearch, useDecorateForm, type naiZealTableSearchRef} from 'dynamicformdjx/naiveUi'
  import {useWindowSize} from "dynamicformdjx";

  const {isMobile} = useWindowSize()
  const searchRef = ref<naiZealTableSearchRef | null>(null)

  interface RowData {
    key: number
    name: string
    age: number
    address: string
  }

  const searchFormItems = useDecorateForm<RowData>([
    {
      key: "name",
      label: "Name",
    },
    {
      key: "age",
      label: "Age",
    },
    {
      key: "address",
      label: "Address",
    },
  ].map(it => ({
    value: null,
    clearable: true,
    renderType: 'renderInput',
    span: 8,
    ...it,
  })) as any[])
  const onSearch = (params: any) => {
    console.log('search params:', params)
  }

  const onReset = () => {
    console.log('reset')
  }
</script>

<template>
  <nai-zeal-table-search
      ref="searchRef"
      title="Search Params"
      :isMobile="isMobile"
      :searchItems="searchFormItems"
      @onSearch="onSearch"
      @onReset="onReset"
  />

  <!-- 外部主动触发查询 -->
  <n-button size="small" @click="searchRef?.onSearch?.()">Search (Expose)</n-button>
</template>
```

</details>
</template>
<ZealTableSearch/>
</NaiBlock>

---

## 4. ZealTablePaginationControl

对`NPagination`或`ElPagination` 的轻量封装：接收一个可变的 `pagination` 对象，内部在翻页/改页大小时会同步修改
`pageNo/pageSize`
并调用回调。

### Props

| 属性名        | 说明                                              | 类型                | 默认值               | 必填  |
|------------|-------------------------------------------------|-------------------|-------------------|-----|
| pagination | 分页状态与回调（组件内部会直接改 `pageNo/pageSize`）             | `ZealPagination`  | `-`               | 是   |
| pageConfig | 透传 `NPagination`或`PaginationProps` 配置（合并到组件参数上） | `PaginationProps` | `PaginationProps` | `-` | 否  |
| isMobile   | 是否移动端（影响 `showSizePicker` 的表现）                  | `boolean`         | `false`           | 否   |

---

### Slots

| 插槽名      | 参数说明                   | 描述                                  |
|----------|------------------------|-------------------------------------|
| `prefix` | `(info) => VNodeChild` | 前缀区域（例如显示 Total）                    |
| `suffix` | `(info) => VNodeChild` | 后缀区域                                |
| `-`      | `-`                    | 其他 Naive UI `NPagination` 支持的插槽同样可用 |

额外行为：当 **存在 `prefix` 插槽且 `isMobile=true`** 时，会强制 `showSizePicker=false`,layout 会剔除`sizes`, `jumper`
属性（避免移动端空间拥挤）。

---

### 示例

<NaiBlock>
<template #code>
<details>
<summary>code</summary>

```vue 

<script setup>
  import {NaiZealTablePaginationControl} from 'dynamicformdjx/naiveUi'
  import {usePagination, useWindowSize} from "dynamicformdjx";
  import {onMounted} from "vue";

  const {isMobile} = useWindowSize()
  const pagination = usePagination(fetchData)

  function fetchData() {
    console.log(pagination.pageNo, pagination.pageSize)
  }

  onMounted(() => {
    pagination.total = 52
  })
</script>

<template>
  <NaiZealTablePaginationControl :pagination="pagination" :isMobile="isMobile">
    <template #prefix="{ itemCount }">
      <span>Total {{ itemCount }}</span>
    </template>
  </NaiZealTablePaginationControl>
</template>
```

</details>
</template>
<ZealPagination/>
</NaiBlock>

---

## 5. EleZealTable

**此组件为elementPlus 版本特有**

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

> 说明：组件会把 `attrs` 也透传给 `ElTable`，可以直接在 `EleZealTable` 上写 `row-key`、`highlight-current-row` 等原生
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

<NaiBlock>
<template #code>
<details>
<summary>code</summary>

```vue [Typescript]

<script setup lang="ts">
  import {EleZealTable} from 'dynamicformdjx/elementPlus'
  import type {ZealColumn} from "dynamicformdjx/types/form";
  import {h, onMounted, ref} from "vue";

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
  }
</style>
```

</details>
</template>
<EleZealTableTest/>
</NaiBlock>

---




