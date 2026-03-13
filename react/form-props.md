DynamicForm 参数说明

## AdDynamicForm Props

| 属性名             | 说明                                                          | 类型                    | 默认值             | 必填 |
|-----------------|-------------------------------------------------------------|-----------------------|-----------------|----|
| items           | 动态表单项配置数组（每项为一个 `DyFormItem`）                               | `onBlur`              | `—`             | 是  |
| formConfig      | Antd `Form` 配置（如 labelPlacement / size / labelWidth 等）      | `FormProps`           | `-`             | 否  |
| gridConfig      | `preset="grid"` 时使用的 `Row` 配置（如 gutter / align / justify 等） | `RowProps`            | `{ gutter:10 }` | 否  |
| rules           | 额外传入的表单校验规则（会与 items 内置规则合并）                                | `RulesMap`            | `—`             | 否  |
| preset          | 渲染布局模式：`fullRow` 为普通纵向表单；`grid` 为栅格布局（配合 `gridConfig`）      | `'fullRow' \| 'grid'` | `'fullRow'`     | 否  |
| validateTrigger | Form校验方式                                                    | `'string' \| 'null'`  | `onBlur`        | 否  |

::: tip preset 校验
`preset` 仅允许 `'fullRow'` 或 `'grid'`，否则会在控制台输出错误提示，并返回 `false`。
:::

## Ref

| 方法名                    | 参数说明                                            | 返回值                | 描述          |
|------------------------|-------------------------------------------------|--------------------|-------------|
| `reset(v?: any)`       | `v = null` → 重置新表单数据                            | `void`             | 重置表单数据      |
| `validator`            | `-`                                             | `Promise<object>`  | 校验表单，返回表单结果 |
| `getResult(t = 'res')` | `t = 'res'` → 获取当前最终结果<br>`t = 'ori'` → 获取渲染时数组 | `object` / `array` | 获取表单内部数据结构  |

## Slots (Function)

| 方法名      | 参数说明 | 描述     |
|----------|------|--------|
| `header` | `-`  | 标题具名插槽 |
| `footer` | `-`  | 底部具名插槽 |