DynamicForm 参数说明
## NaiDynamicForm Props

| 属性名        | 说明                                                            | 类型                    | 默认值                                                                       | 必填 |
|------------|---------------------------------------------------------------|-----------------------|---------------------------------------------------------------------------|----|
| formConfig | Naive UI `NForm` 配置（如 labelPlacement / size / labelWidth 等）   | `FormProps`           | `{ labelPlacement: 'left', size: 'medium' }`                              | 否  |
| gridConfig | `preset="grid"` 时使用的 `NGrid` 配置（如 cols / xGap / responsive 等） | `GridProps`           | `{ responsive: 'screen', cols: 'xs:1 s:2 m:3 l:3 xl:4 2xl:4', xGap: 10 }` | 否  |
| rules      | 额外传入的表单校验规则（会与 items 内置规则合并）                                  | `FormRules`           | `—`                                                                       | 否  |
| preset     | 渲染布局模式：`fullRow` 为普通纵向表单；`grid` 为栅格布局（配合 `gridConfig`）        | `'fullRow' \| 'grid'` | `'fullRow'`                                                               | 否  |
| items      | 动态表单项配置数组（每项为一个 `DyFormItem`）                                 | `DyFormItem[]`        | `—`                                                                       | 是  |

## EleDynamicForm Props

| 属性名        | 说明                                                              | 类型                    | 默认值                                                                       | 必填 |
|------------|-----------------------------------------------------------------|-----------------------|---------------------------------------------------------------------------|----|
| formConfig | element plus `ElForm` 配置（如 labelPosition / size / labelWidth 等） | `FormProps`           | `{labelPosition: 'left', size: 'default'}`                              | 否  |
| rowConfig | `preset="grid"` 时使用的 `RowProps` 配置（如 justify / align / gutter 等）   | `RowProps`           | `{gutter: 10, justify: 'start', align: 'top'}` | 否  |
| rules      | 额外传入的表单校验规则（会与 items 内置规则合并）                                    | `FormRules`           | `—`                                                                       | 否  |
| preset     | 渲染布局模式：`fullRow` 为普通纵向表单；`grid` 为栅格布局（配合 `gridConfig`）          | `'fullRow' \| 'grid'` | `'fullRow'`                                                               | 否  |
| items      | 动态表单项配置数组（每项为一个 `DyFormItem`）                                   | `DyFormItem[]`        | `—`                                                                       | 是  |

::: tip preset 校验
`preset` 仅允许 `'fullRow'` 或 `'grid'`，否则会在控制台输出错误提示，并返回 `false`。
:::

## Expose

| 方法名                    | 参数说明                                            | 返回值                | 描述          |
|------------------------|-------------------------------------------------|--------------------|-------------|
| `reset(v?: any)`       | `v = null` → 重置新表单数据                            | `void`             | 重置表单数据      |
| `validator`            | `-`                                             | `Promise<object>`  | 校验表单，返回表单结果 |
| `getResult(t = 'res')` | `t = 'res'` → 获取当前最终结果<br>`t = 'ori'` → 获取渲染时数组 | `object` / `array` | 获取表单内部数据结构  |

## Slots

| 方法名      | 参数说明 | 描述     |
|----------|------|--------|
| `header` | `-`  | 标题具名插槽 |
| `footer` | `-`  | 底部具名插槽 |