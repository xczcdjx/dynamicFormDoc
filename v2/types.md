---
outline: deep
---

# Types

类型从 `dynamicformdjx-vue2/elementUi` 导入。

## DyFormItem

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| key | `string` | 必填，唯一字段名，也是结果对象的键 |
| value | `any` | 必填，字段当前值 |
| label | `string` | 字段标题 |
| hidden / disabled | `boolean` | 隐藏字段 / 禁用内置输入 |
| required | `boolean` | 生成必填规则 |
| requiredHint | `(label: string) => string` | 自定义必填提示 |
| rule | `object \| object[]` | 字段校验规则 |
| path | `string` | FormItem 的 prop 与规则键，省略时使用 key；不会自动把结果转换成嵌套对象 |
| span / offset | `number` | grid 布局的列宽 / 偏移；默认 24 / 0 |
| sort | `number` | 升序排列，未设置时排在后面 |
| renderType | `RenderType` | 内置渲染函数名，默认 renderInput |
| renderProps | `object` | 传给内置渲染函数的组件属性 |
| options | `object[]` | 选择项 |
| labelField / valueField | `string` | 选项标题和值的键，默认 label / value |
| render2 | `(item, setValue) => VNode \| VNode[] \| null` | 自定义控件，优先于 renderType |
| onChange | `(value, item, options?) => void` | 内置控件或 setValue 回写时触发；useDyForm 直接赋值不触发此回调 |

## PresetType

```ts
import type { DyFormItem, PresetType, ZealColumn, ZealPagination, TableBtnType } from 'dynamicformdjx-vue2/elementUi'
type Row = { name: string; age: number }
const preset: PresetType = 'grid'
const items: DyFormItem<Row>[] = [{ key: 'name', value: '', label: '姓名' }]
const columns: ZealColumn<Row>[] = [{ prop: 'name', label: '姓名' }]
```

## ZealColumn

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| prop / label / key | string | 数据字段、标题和唯一标识 |
| type | `'default' \| 'selection' \| 'index' \| 'expand'` | 列类型 |
| width / minWidth | string 或 number | 宽度 |
| align | `'left' \| 'center' \| 'right'` | 对齐 |
| fixed | boolean 或 left / right | 固定列 |
| slot | string | 自定义单元格插槽 |
| render2 | `(row, index) => VNode \| string \| number \| null` | 自定义渲染，优先于插槽 |

## ZealPagination / TableBtnType

`ZealPagination` 包含 `pageNo`、`pageSize`、`total`、`pageSizes`、`layout`、`onChange`、`onPageSizeChange` 和 `setTotalSize(total)`，通常由 [usePagination](./hooks#usepagination) 创建。

`TableBtnType` 的 `key` 必填，其他常用字段为 `title`、`disabled`、`onSelect(key)`，以及传给 Element UI Button 的属性。
