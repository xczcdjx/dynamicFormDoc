---
outline: deep
---

# Hooks

```js
import { useReactiveForm, useDyForm } from 'dynamicformdjx-vue2/elementUi'

const items = useReactiveForm([
  { key: 'name', label: '姓名', value: '' },
  { key: 'age', label: '年龄', value: 18, renderType: 'renderInputNumber' }
])
const form = useDyForm(items)
form.setValues({ name: '张三', age: 20 })
console.log(form.getValues()) // { name: '张三', age: 20 }
```

在 Vue2 组件 `data()` 内创建这些对象，并将同一个 `items` 传给 `EleDynamicForm`。Vue2 版本返回字段数组，React 版本返回 `[items, setItems]`，两者调用方式不同。

## useReactiveForm

### 签名

```ts
useReactiveForm<Row>(items: DyFormItem<Row>[], isReactive = true): DyFormItem<Row>[]
```

### 参数

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| items | 字段配置数组 | 必传 |
| isReactive | 是否将字段转换为响应式对象 | true |

默认对每个字段调用 `Vue.observable`。传入 `false` 时返回原数组，由调用方保证响应式。此实现依赖 Vue 2.6+ 的 `Vue.observable`。

## useDyForm

### 签名

```ts
useDyForm<Row>(items: DyFormItem<Row>[] | { value: DyFormItem<Row>[] })
```

接受字段数组，或包含字段数组的 `{ value: items }` 对象。若需要整体替换数组，使用后一种形式并更新其 `value`，避免操作仍指向旧数组。

### 返回方法一览

| 方法 | 示例 | 说明 |
| --- | --- | --- |
| setValue(key, value) | `form.setValue('name', '李四')` | 设置单字段 |
| setValues(patch) | `form.setValues({ age: 21 })` | 更新已有字段，未知键被忽略 |
| getValue(key) | `form.getValue('name')` | 未找到时返回 undefined |
| getValues(keys?) | `form.getValues(['name'])` | 不传 keys 时读取全部字段，含隐藏字段；空数组返回空对象 |
| setDisabled(flag, keys?) | `form.setDisabled(true, ['name'])` | 不传 keys 时操作全部字段；空数组不操作任何字段 |
| setHidden(flag, keys?) | `form.setHidden(true, ['age'])` | 隐藏保留字段值 |
| getItem(key) | `form.getItem('age')` | 返回字段对象本身 |
| setItem(key, patch) | `form.setItem('age', { label: '周岁' })` | 修改字段属性 |
| setItems(patches) | `form.setItems([['age', { disabled: true }]])` | 批量修改字段 |
| updateKeys(patches) | `form.updateKeys([['name', 'username']])` | 修改字段名，调用方应避免重复键 |
| onReset(value = null) | `form.onReset()` | 全部字段统一赋值；不恢复初始值、不清除校验 |

自定义 `render2` 必须把 `item.disabled` 传给控件，才能响应 `setDisabled`。使用组件 `reset()` 和操作器 `onReset()` 的区别见[表单示例](./dy-elementUi-form#数据与重置)。


## useDecorateForm

```js
import { useDecorateForm } from 'dynamicformdjx-vue2/elementUi'
const items = useDecorateForm([
  { key: 'name', value: '', renderType: 'renderInput', renderProps: { clearable: true } }
])
```

签名为 `useDecorateForm(items, isReactive = true)`，返回字段数组；给没有 render2 的字段补上对应渲染函数，随后调用 useReactiveForm。renderType 在装饰时确定，之后更换控件类型请重新创建字段或显式替换 render2。

## usePagination

签名为 `usePagination(callback?, options = {})`，返回 Vue.observable 分页对象，不返回 React 版本的 tuple 或额外 setter 对象。

```js
const pagination = usePagination(() => fetchData(), { pageSize: 10, pageSizes: [10, 20, 50] })
pagination.setTotalSize(100)
pagination.pageNo = 1
```

默认 `pageNo=1`、`pageSize=25`、`total=0`、`pageSizes=[25,50,100,200]`。`onChange`、`onPageSizeChange` 默认调用 callback；初始化和直接修改属性不会自动触发请求，应显式调用 fetchData。

## useWindowSize

在 Vue 2.7 的 `setup()` 中调用 `useWindowSize(mobileWidth = 756, delay = 500)`，返回响应式 `width`、`height` 和 `isMobile`。宽度小于等于阈值视为移动端，参数也可传 getter。卸载时移除监听和定时器。

## useObserverSize

在 `setup()` 中调用 `useObserverSize(delay = 100)`，返回 `wrapRef`、`cardRef`、`restRef`、`footerRef`、`tableHeight` 和 `measure()`。将 refs 绑定容器、Element UI Card、外部内容和页脚；根据这些元素计算表格高度。一般直接使用 EleZealCard 即可。

## useZealColumnTool

从 Element UI 子入口导入，在 Vue 2.7 的 setup 中调用 `useZealColumnTool(createColumn, config?)`，返回 `eleZealCardRef` 和计算属性 `tableColumns`。回调收到 `{ isMobile, tableHeight }` 两个计算属性，按其 `.value` 生成列；config 是每列默认配置，具体列配置优先。
