---
outline: deep
---

# Zeal Components

Provide components that make list operations easier.

> The prefix below is omitted.
> If your UI library is **Naive UI**, import components as `NaiXxx`;
> if you use **Element Plus**, import them as `EleXxx`.

## 1. PopupModal

A popup modal dialog. The following example is based on the **Naive UI** version.

### Props

| Prop Name   | Description                                                                                                               | Type                                                | Default                | Required |
|-------------|---------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|------------------------|----------|
| title       | Modal title; can also be a render function                                                                                | `string \| (() => VNodeChild)`                      | `-`                    | No       |
| modalProps  | Props passed through / overriding Naive UI `NModal` props (merged with defaults)                                          | `ModalProps`                                        | `-`                    | No       |
| to          | Mount container (passed to `NModal` `to` prop)                                                                            | `string \| HTMLElement`                             | `-`                    | No       |
| showClose   | Whether to show the top-right close button (`closable`)                                                                   | `boolean`                                           | `true`                 | No       |
| closeOnMask | Whether clicking the mask closes the modal (`maskClosable`)                                                               | `boolean`                                           | `true`                 | No       |
| width       | Modal width (set via `style.width`)                                                                                       | `string`                                            | `'min(1080px,90%)'`    | No       |
| onCancel    | Callback when clicking **Cancel**; if the returned promise resolves to `false`, the modal stays open, otherwise it closes | `() => boolean \| void \| Promise<boolean \| void>` | `() => undefined`      | No       |
| onSubmit    | Callback when clicking **Submit**; if the returned promise resolves to `false`, the modal stays open, otherwise it closes | `() => boolean \| void \| Promise<boolean \| void>` | `() => undefined`      | No       |
| footerTxt   | Footer button labels `[Cancel, Submit]`                                                                                   | `string[]`                                          | `['Cancel', 'Submit']` | No       |

> In the **Element Plus** version, `title` only supports `string`, and `modalProps` corresponds to `ElDialog`’s
`DialogProps`.

### Expose

| Method | Description                                                                                               | Signature               |
|--------|-----------------------------------------------------------------------------------------------------------|-------------------------|
| toggle | Toggle visibility; without arguments it inverts the current state, passing `true/false` forces open/close | `(f?: boolean) => void` |

### Slots

#### Naive UI Version

* `default`: Modal main content (content placed inside the component tag)
* Other slots supported by Naive UI `NModal` (when `preset` is `card`) are also forwarded via `...slots`.
  For example, you can customize `footer` to override the default bottom buttons.

> Note: The component provides a default footer implementation.
> If you explicitly provide a `#footer` slot, it will override the default footer.

#### Element Plus Version

> type `ElDialogSlots`

| Slot Name | Slot Props                                                   | Description                                                                                                                                                                 |
|-----------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `default` | `-`                                                          | Default slot: dialog main content (content area).                                                                                                                           |
| `footer`  | `-`                                                          | Footer slot: dialog bottom action area (usually for buttons).                                                                                                               |
| `title`   | `-`                                                          | Title slot: replaces only the title text area.                                                                                                                              |
| `header`  | `{ close: () => void; titleId: string; titleClass: string }` | Header slot: customize the entire header area. `close` closes the dialog; `titleId` / `titleClass` are used for accessibility and styling (recommended for the title node). |

---

### Usage

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

A general-purpose page layout component based on `NCard` or `ElCard`.
It provides built-in sections for **header + search area + control buttons + table/content area + footer + bottom
extension area (rest)**.

It calculates `tableHeight` by observing the container size, and exposes `isMobile / width / height` based on the window
size for responsive layouts.

---

### Props

| Prop Name       | Description                                                                                                           | Type               | Default               | Required |
|-----------------|-----------------------------------------------------------------------------------------------------------------------|--------------------|-----------------------|----------|
| title           | Title text (used by the default header rendering)                                                                     | `string`           | `-`                   | No       |
| zealHeight      | Available outer height (used to calculate container height)                                                           | `string`           | `'100vh'`             | No       |
| outPadding      | Vertical outer padding (used in `height: calc(zealHeight - outPadding * 2)`)                                          | `number`           | `20`                  | No       |
| searchBtnTxt    | Default search button labels `[Reset, Search]` (effective when `searchForm` exists and `searchBtn` is not customized) | `[string, string]` | `['Reset', 'Search']` | No       |
| checkWindowSize | Responsive breakpoints `[mobileWidth, mobileHeight]` (passed to `useWindowSize`)                                      | `[number, number]` | `[756, 500]`          | No       |

---

### Slots

> `SizeObjType = { isMobile: boolean; width: number; height: number }`

| Slot Name    | Slot Props                                     | Description                                                                                                                               |
|--------------|------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `header`     | `(size: SizeObjType)`                          | Customize the entire header area. When provided, it overrides the default header (title + search area).                                   |
| `searchForm` | `-`                                            | Search form area (rendered inside the default header).                                                                                    |
| `searchBtn`  | `-`                                            | Search button area (inside the default header). If omitted while `searchForm` is provided, default Reset/Search buttons will be rendered. |
| `controlBtn` | `-`                                            | Right-side control button area (on the right of the default header).                                                                      |
| `toolBtn`    | `-`                                            | Right-side tool button area (rendered after `controlBtn`).                                                                                |
| `default`    | `(ctx: { tableHeight: number } & SizeObjType)` | Main content area. Injects `tableHeight` and window size info, commonly used for auto-resizing tables.                                    |
| `footer`     | `(size: SizeObjType)`                          | Card footer area.                                                                                                                         |
| `rest`       | `-`                                            | Bottom extension area outside the card (rendered below `NCard`, still inside the ZealCard container).                                     |

---

### Slot Parameter Details

| Parameter     | Type      | Description                                                    |
|---------------|-----------|----------------------------------------------------------------|
| `isMobile`    | `boolean` | Mobile indicator derived from `useWindowSize(checkWindowSize)` |
| `width`       | `number`  | Current window width                                           |
| `height`      | `number`  | Current window height                                          |
| `tableHeight` | `number`  | Available table height calculated via `useObserverSize(NCard)` |

---

### Default Layout Logic (Summary)

* If the `header` slot is **not** provided, the header renders
  `title + searchForm + (searchBtn or default Reset/Search buttons)`
* As long as `searchForm` is provided and `searchBtn` is not, default buttons will be rendered automatically (labels
  come from `searchBtnTxt`)
* The `default` slot receives `{ tableHeight, isMobile, width, height }`, making it easy to build adaptive tables or
  lists
* The `rest` slot is rendered below the card, suitable for pagination, modal mount points, or additional descriptions

---

### Usage

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

A generic table search area component that supports two modes: **inline form for desktop** and **drawer-based search for
mobile**.
It provides built-in **Reset / Search** buttons and exposes methods via `expose` for external control.

* `copyDefault = true`: The initial form values are cached once after the component is mounted. Clicking **Reset**
  restores these cached values.
* `copyDefault = false`: Reset uses the default behavior of `useForm.onReset(null)`.
* When `closeDrawerAuto = true`: the component watches `isMobile`. When switching from mobile to non-mobile (
  `isMobile = false`), the drawer will be closed automatically.
  If `closeDrawerAuto = false`, this behavior is disabled.

---

### Props

| Prop Name           | Description                                                         | Type           | Default               | Required |
|---------------------|---------------------------------------------------------------------|----------------|-----------------------|----------|
| title               | Title text (can be overridden by the `#title` slot)                 | `string`       | `-`                   | No       |
| drawerTitle         | Drawer title (falls back to `title` if not provided)                | `string`       | `-`                   | No       |
| searchItems         | Dynamic form item configuration (passed to `NaiDynamicForm`)        | `DyFormItem[]` | `[]`                  | No       |
| searchFormMaxHeight | Max height of the form container in non-drawer mode                 | `string`       | `'200px'`             | No       |
| drawerMaxHeight     | Max height in drawer mode (`NDrawer.maxHeight`)                     | `number`       | `420`                 | No       |
| drawerOpenTxt       | Text for the “open drawer” button on mobile                         | `string`       | `'Search Drawer'`     | No       |
| searchBtnTxt        | Default button labels `[Reset, Search]`                             | `string[]`     | `['Reset', 'Search']` | No       |
| mobileDrawer        | Whether to enable mobile drawer mode                                | `boolean`      | `true`                | No       |
| closeDrawerAuto     | Whether to automatically close the drawer when mobile state changes | `boolean`      | `true`                | No       |
| copyDefault         | Whether to cache initial form values as the reset target            | `boolean`      | `false`               | No       |
| isMobile            | Externally provided mobile flag (used to switch UI mode)            | `boolean`      | `false`               | No       |

1. **Mode selection**: When `mobileDrawer = true` and `isMobile = true`, a drawer entry button is shown; otherwise, the
   inline search form is rendered.
2. **Element Plus version**: `drawerMaxHeight` is replaced by the `size` prop, with type `string | number`.

---

### Emits

| Event Name | Payload          | Description                                                                                                   |
|------------|------------------|---------------------------------------------------------------------------------------------------------------|
| `onReset`  | `-`              | Triggered when Reset is clicked (the drawer will be closed after reset).                                      |
| `onSearch` | `(data: object)` | Triggered when Search is clicked; `data` is the current form values (the drawer will be closed after search). |

---

### Expose

| Method Name    | Parameters      | Description                                                                |
|----------------|-----------------|----------------------------------------------------------------------------|
| `toggleDrawer` | `(f?: boolean)` | Open/close the drawer; toggles when no argument is provided                |
| `onReset`      | `-`             | Triggers the reset logic (emits `onReset`, then closes the drawer)         |
| `onSearch`     | `-`             | Triggers the search logic (emits `onSearch(data)`, then closes the drawer) |
| `getParams`    | `-`             | Returns the current form values (`useForm.getValues()`)                    |

---

### Slots

| Slot Name   | Slot Props                                      | Description                                                       |
|-------------|-------------------------------------------------|-------------------------------------------------------------------|
| `title`     | `-`                                             | Title area slot (overrides the default title, returns `VNode[]`). |
| `searchBtn` | `{ onSearch: () => void; onReset: () => void }` | Custom action button area (returns `VNode[]`).                    |
| `drawerBtn` | `{ openDrawer: () => void }`                    | Custom mobile drawer entry button (returns `VNode[]`).            |

---

### Usage

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

A lightweight wrapper around `NPagination` or `ElPagination`.
It accepts a mutable `pagination` object and, on page change or page-size change, internally updates
`pageNo / pageSize` and invokes the corresponding callbacks.

---

### Props

| Prop Name  | Description                                                                           | Type              | Default           | Required |
|------------|---------------------------------------------------------------------------------------|-------------------|-------------------|----------|
| pagination | Pagination state and callbacks (the component mutates `pageNo / pageSize` internally) | `ZealPagination`  | `-`               | Yes      |
| pageConfig | Props passed through to `NPagination` or `ElPagination` (merged into component props) | `PaginationProps` | `PaginationProps` | No       |
| isMobile   | Whether the layout is in mobile mode (affects `showSizePicker` behavior)              | `boolean`         | `false`           | No       |

---

### Slots

| Slot Name | Slot Props             | Description                                                            |
|-----------|------------------------|------------------------------------------------------------------------|
| `prefix`  | `(info) => VNodeChild` | Prefix area (for example, displaying total count)                      |
| `suffix`  | `(info) => VNodeChild` | Suffix area                                                            |
| `-`       | `-`                    | All other slots supported by Naive UI `NPagination` are also available |

---

### Additional Behavior

When **the `prefix` slot is provided and `isMobile = true`**:

* `showSizePicker` is forcibly set to `false`
* `sizes` and `jumper` are removed from the pagination `layout`

This avoids overcrowding the pagination UI on mobile devices.

---

### Usage

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

**This component is specific to the Element Plus version.**

A lightweight wrapper around Element Plus `ElTable` and `ElTableColumn`.
It allows you to quickly generate columns via a `columns` configuration, supports three cell rendering strategies
(`render2` / slot / `row[prop]`), and comes with common built-in options such as `v-loading`, `stripe`, and `border`.

---

### Props

| Prop Name     | Description                                                             | Type                            | Default | Required |
|---------------|-------------------------------------------------------------------------|---------------------------------|---------|----------|
| `data`        | Table data                                                              | `any[]`                         | `[]`    | No       |
| `columns`     | Column configuration                                                    | `ZealColumn<any>[]`             | `[]`    | No       |
| `loading`     | Table loading state (uses `v-loading`)                                  | `boolean`                       | `false` | No       |
| `maxHeight`   | Table max height (passed to `ElTable.max-height`)                       | `number \| string`              | `-`     | No       |
| `columnAlign` | Global column alignment (applied when a column does not define `align`) | `'left' \| 'center' \| 'right'` | `-`     | No       |
| `stripe`      | Zebra striping                                                          | `boolean`                       | `true`  | No       |
| `border`      | Table border                                                            | `boolean`                       | `false` | No       |
| `tableConfig` | Props passed through to `ElTable` (merged with component attrs)         | `Partial<TableProps<any>>`      | `-`     | No       |

> **Note**: Component `attrs` are also forwarded to `ElTable`.
> You can directly set native `ElTable` props such as `row-key`, `highlight-current-row`, etc. on `EleZealTable`.

---

### Slots (`EleZealTableSlots`)

| Slot Name | Slot Props | Description                                                                        |
|-----------|------------|------------------------------------------------------------------------------------|
| `default` | `-`        | Default slot: table content area (forwarded to `ElTable`).                         |
| `append`  | `-`        | Append slot: content appended after the last table row (maps to `ElTable.append`). |
| `empty`   | `-`        | Empty slot: placeholder content when `data` is empty (maps to `ElTable.empty`).    |

* The component forwards `v-slots={slots}` directly to `ElTable`, so **all slots supported by `ElTable`** can be used (
  such as `empty`, `append`, etc.).
* Cell slot naming rules are described below.

---

### Cell Rendering Priority

For each column, the rendering order of `ElTableColumn.default` is:

1. **`render2(row, $index)`**: If provided in the column config, it is used directly (highest priority)
2. **Named slot**: If a matching cell slot exists, the slot is used
3. **`row[prop]`**: If the column config defines `prop`, `scope.row[prop]` is rendered by default
4. If none of the above are present: returns `null`

---

### Cell Slot Naming Rules

Each column computes a `slotKey` as follows:

* If the column config defines `slot`: `slotKey = slot`
* Else if it defines `prop`: `slotKey = 'cell-' + prop` (e.g. `prop: 'name'` → `#cell-name`)
* Otherwise: no `slotKey`

Therefore, you can write:

* **Auto-generated slot from `prop`**: `#cell-name`
* **Custom slot key**: set `slot: 'action'` in the column config → use `#action`

### Usage

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




