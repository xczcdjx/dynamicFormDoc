---
outline: deep
---

# Zeal 组件

提供便于列表操作的组件，均从 `dynamicformdjx-vue2/elementUi` 导入。示例使用 Vue 2.7 和 Element UI。

## 1. ElePopupModal

弹出对话框，通过 ref 的 `toggle(flag?)` 打开或关闭；省略参数时切换。

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| title | 弹窗标题 | string | — | 否 |
| modalProps | Element UI Dialog 属性 | object | {} | 否 |
| to | 挂载容器 | string 或 HTMLElement | — | 否 |
| showClose | 显示关闭按钮 | boolean | true | 否 |
| closeOnMask | 点击遮罩关闭 | boolean | true | 否 |
| width | 对话框宽度 | string | min(1080px,90%) | 否 |
| onCancel / onSubmit | 底部按钮回调，返回 false 保持打开，支持 Promise | function | 返回 true | 否 |
| footerTxt | 取消、提交文案 | string[] | ['Cancel', 'Submit'] | 否 |

### Slots

`default` 为内容，`title` 为标题，`footer` 替换底部按钮。`onCancel` 针对底部取消按钮；遮罩和右上角关闭由 Dialog 更新可见状态，不调用该回调。

### 示例

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/zeal/componentsZeal?zType=modal" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="300px"/>
</template>
<template #code>

```vue
<script>
import { ElePopupModal } from 'dynamicformdjx-vue2/elementUi'
export default {
  components: { ElePopupModal },
  data () { return { keepOpen: false, result: '' } },
  methods: {
    async submit () {
      this.result = this.keepOpen ? '返回 false，保持打开' : '提交成功'
      return !this.keepOpen
    }
  }
}
</script>

<template>
  <section style="padding: 16px">
    <el-button @click="$refs.modal.toggle(true)">打开弹窗</el-button>
    <ElePopupModal ref="modal" title="示例弹窗" :on-submit="submit" :footer-txt="['取消', '提交']">
      <el-checkbox v-model="keepOpen">提交时返回 false，保持打开</el-checkbox>
    </ElePopupModal>
    <pre aria-live="polite">{{ result }}</pre>
  </section>
</template>

```

</template>
</BlockOther>

## 2. EleZealCard

用于查询区、操作区、表格和分页的卡片容器，自动计算表格可用高度。

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| title | 标题 | string | — | 否 |
| zealHeight | 外部高度 | string | 100vh | 否 |
| outPadding | 上下预留间距，每边扣除此值 | number | 20 | 否 |
| checkWindowSize | 移动端阈值、resize 防抖毫秒数 | number[] | [756, 500] | 否 |
| observeDelay | 测量防抖毫秒数 | number | 100 | 否 |
| searchBtnTxt | 默认搜索按钮文案 | string[] | ['Reset', 'Search'] | 否 |

### Slots

`header`、`searchForm`、`searchBtn`、`controlBtn`、`toolBtn`、`footer`、`rest` 提供 `{ isMobile, width, height }`，`default` 额外提供 `tableHeight`。`header` 替换默认标题与查询区；`rest` 适合放弹窗。默认查询按钮没有业务事件，请使用 `searchBtn` 插槽绑定事件或接入 `EleZealTableSearch`。

### 示例

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/zeal/componentsZeal?zType=card" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="400px"/>
</template>
<template #code>

```vue
<script>
import { EleZealCard } from 'dynamicformdjx-vue2/elementUi'
export default { components: { EleZealCard } }
</script>

<template>
  <section style="padding: 16px">
    <EleZealCard title="列表卡片" zeal-height="360px" :out-padding="0">
      <template slot="controlBtn"><el-button size="small">新增</el-button></template>
      <template slot-scope="scope">
        <p>isMobile: {{ scope.isMobile }}，tableHeight: {{ scope.tableHeight }}</p>
      </template>
      <template slot="footer">底部分页区</template>
    </EleZealCard>
  </section>
</template>

```

</template>
</BlockOther>

## 3. EleZealTableSearch

桌面端显示栅格查询表单，移动端可切换为顶部抽屉。

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| title / drawerTitle | 标题 / 抽屉标题 | string | — | 否 |
| searchItems | 查询字段 | DyFormItem[] | [] | 否 |
| isMobile | 移动端模式 | boolean | false | 否 |
| mobileDrawer | 移动端启用抽屉 | boolean | true | 否 |
| size | 抽屉大小 | number 或 string | 240 | 否 |
| searchFormMaxHeight | 桌面查询区最大高度 | string | 200px | 否 |
| drawerOpenTxt | 抽屉按钮文字 | string | Search Drawer | 否 |
| searchBtnTxt | 重置和查询文案 | string[] | ['Reset', 'Search'] | 否 |
| copyDefault | 挂载时保存字段初值，用于重置 | boolean | false | 否 |
| closeDrawerAuto | false 时切换到桌面自动关闭抽屉 | boolean | false | 否 |
| formSize | 桌面表单尺寸，建议传 small / mini | string | default | 否 |

### Emits / Ref

`@onSearch` 接收查询参数；`@onReset` 在重置后触发。`copyDefault=false` 时重置为 null。实例方法有 `getParams()`、`onSearch()`、`onReset()`、`toggleDrawer(flag?)`。

### Slots

`title` 自定义标题，`drawerBtn` 提供 `{ openDrawer }`，`searchBtn` 提供 `{ onSearch, onReset }`。

### 示例

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/zeal/componentsZeal?zType=search" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="300px"/>
</template>
<template #code>

```vue
<script>
import { EleZealTableSearch, useDecorateForm } from 'dynamicformdjx-vue2/elementUi'
export default {
  components: { EleZealTableSearch },
  data () {
    return {
      mobile: false, result: '',
      items: useDecorateForm([{ key: 'name', label: '姓名', value: '', span: 12 }])
    }
  },
  methods: { search (values) { this.result = JSON.stringify(values) } }
}
</script>

<template>
  <section style="padding: 16px">
    <el-switch v-model="mobile" active-text="抽屉模式" />
    <EleZealTableSearch title="搜索" :search-items="items" :is-mobile="mobile"
                        form-size="small" :search-btn-txt="['重置', '查询']" drawer-open-txt="打开查询"
                        @onSearch="search" @onReset="result = '已重置'" />
    <pre aria-live="polite">{{ result }}</pre>
  </section>
</template>

```

</template>
</BlockOther>

## 4. EleZealTablePaginationControl

连接 `usePagination()` 与 Element UI Pagination。

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| pagination | 分页对象 | ZealPagination | — | 是 |
| pageConfig | 覆盖 Pagination 属性 | object | {} | 否 |
| isMobile | 无默认插槽时移除 sizes、jumper | boolean | false | 否 |

页码变化时先更新 `pageNo`，再调用 `pagination.onChange()`；每页条数变化时先将 `pageNo` 设为 1、更新 `pageSize`，再调用 `onPageSizeChange()`。`default` 插槽传给 Pagination。

### 示例

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/zeal/componentsZeal?zType=pagination" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="300px"/>
</template>
<template #code>

```vue
<script>
import { EleZealTablePaginationControl, usePagination } from 'dynamicformdjx-vue2/elementUi'
export default {
  components: { EleZealTablePaginationControl },
  data () {
    return {
      mobile: false, result: '',
      pagination: usePagination(undefined, { total: 55, pageSize: 5, pageSizes: [5, 10, 20] })
    }
  },
  created () {
    this.pagination.onChange = () => { this.result = '页码：' + this.pagination.pageNo }
    this.pagination.onPageSizeChange = () => {
      this.result = '每页：' + this.pagination.pageSize + '，页码：' + this.pagination.pageNo
    }
  }
}
</script>

<template>
  <section style="padding: 16px">
    <el-switch v-model="mobile" active-text="移动端布局" />
    <EleZealTablePaginationControl :pagination="pagination" :is-mobile="mobile" />
    <pre aria-live="polite">{{ result }}</pre>
  </section>
</template>

```

</template>
</BlockOther>

## 5. EleZealTable

根据 columns 生成 Element UI TableColumn。

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| data | 数据 | object[] | [] | 否 |
| columns | 列配置 | ZealColumn[] | [] | 否 |
| loading | 加载状态 | boolean | false | 否 |
| maxHeight | 最大高度 | number 或 string | — | 否 |
| columnAlign | 默认对齐方式 | left / center / right | — | 否 |
| stripe / border | 斑马纹 / 边框 | boolean | true / false | 否 |
| tableConfig | Table 属性 | object | {} | 否 |

### Slots / Events

单元格优先级为 `column.render2(row, index)`、具名插槽、`row[prop]`。显式 `slot` 指定插槽名，否则使用 `cell-字段名`。单元格插槽提供 `{ row, $index }`。支持 `empty`、`append`，事件如 `selection-change` 透传到 Table。

### 示例

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/zeal/componentsZeal?zType=table" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="300px"/>
</template>
<template #code>

```vue
<script>
import { EleZealTable } from 'dynamicformdjx-vue2/elementUi'
export default {
  components: { EleZealTable },
  data () {
    return {
      result: '', rows: [{ id: 1, name: '张三' }, { id: 2, name: '李四' }],
      columns: [{ prop: 'id', label: '编号' }, { prop: 'name', label: '姓名' },
        { label: '操作', slot: 'actions' }]
    }
  }
}
</script>

<template>
  <section style="padding: 16px">
    <EleZealTable :data="rows" :columns="columns">
      <template slot="cell-name" slot-scope="cell"><el-tag>{{ cell.row.name }}</el-tag></template>
      <template slot="actions" slot-scope="cell">
        <el-button size="small" @click="result = cell.row.name">查看</el-button>
      </template>
    </EleZealTable>
    <pre aria-live="polite">{{ result }}</pre>
  </section>
</template>

```

</template>
</BlockOther>

## 6. EleZealTableBtnControl

桌面显示按钮组，移动端显示下拉菜单。

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| btnItems | 按钮配置，key 必填 | TableBtnType[] | [] | 否 |
| isMobile | 下拉模式 | boolean | false | 否 |
| size | 按钮尺寸 | string | small | 否 |
| dropDownProps | Dropdown 属性 | object | {} | 否 |
| dropDownText | 下拉入口文字 | string | controls | 否 |

选择按钮时先调用按钮自身的 `onSelect(key)`，然后触发 `@onSelect`。`text` 插槽替换下拉入口。`disabled` 同时作用于按钮和菜单项。

### 示例

<BlockOther pathUrl="/dynamicForm-Vue2-old/#/zeal/componentsZeal?zType=buttons" isOpen>
<template #default="{dl}">
<PreviewBlock hideMenu v-bind="dl" mh="300px"/>
</template>
<template #code>

```vue
<script>
import { EleZealTableBtnControl } from 'dynamicformdjx-vue2/elementUi'
export default {
  components: { EleZealTableBtnControl },
  data () {
    return { mobile: false, result: '', buttons: [
      { key: 'edit', title: '编辑' }, { key: 'delete', title: '删除', type: 'danger' }
    ] }
  }
}
</script>

<template>
  <section style="padding: 16px">
    <el-switch v-model="mobile" active-text="下拉菜单" />
    <EleZealTableBtnControl :btn-items="buttons" :is-mobile="mobile" drop-down-text="操作"
                            @onSelect="result = $event" />
    <pre aria-live="polite">{{ result }}</pre>
  </section>
</template>

```

</template>
</BlockOther>

