# DyFormItem

`DyFormItem` 是动态表单的单项配置类型。你传入 `NaiDynamicForm` 的 `items` 数组，每一项就是一个 `DyFormItem`。

## SelectOptionItem

| 字段 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| label | 展示文本 | `string` | `—` | 是 |
| value | 选项值 | `any` | `—` | 是 |
| class | 自定义 class | `string` | `—` | 否 |
| style | 自定义样式 | `string \| CSSProperties` | `—` | 否 |
| disabled | 是否禁用 | `boolean` | `—` | 否 |

---

## BaseDyFormItem

| 字段 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| key | 字段标识（建议与表单 model 字段一致） | `keyof T` | `—` | 是 |
| label | 表单项 label | `string` | `—` | 是 |
| value | 响应式值（表单数据来源） | `Ref<any>` | `—` | 是 |
| placeholder | 占位提示 | `string` | `—` | 否 |
| options | 选项数据（select/checkbox/radio 等） | `SelectOptionItem[] \| any[]` | `—` | 否 |
| onChange | 值变化回调 | `(value: any, associationItem: DyFormItem, options?: SelectOptionItem[] \| any[]) => void` | `—` | 否 |
| span | 栅格占位（`preset="grid"` 时常用） | `number` | `—` | 否 |
| sort | 排序字段（如果启用排序逻辑则按此排序） | `number` | `—` | 否 |

---

## DyFormItem

`DyFormItem<K, RuleT>` 继承自 `BaseDyFormItem<K>`，并扩展渲染、校验、显示控制等能力。

| 字段 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| path | 表单校验 path（不传则默认使用 `key`） | `string` | `—` | 否 |
| hidden | 是否隐藏该项 | `boolean` | `false` | 否 |
| render2 | 自定义渲染函数（返回 VNode） | `(formItem: DyFormItem) => VNode` | `—` | 否 |
| reset | 自定义重置逻辑 | `(formItem: DyFormItem) => void` | `—` | 否 |
| rule | 单项校验规则（由具体 UI 层决定类型，如 Naive UI 的 FormItemRule 等） | `RuleT` | `—` | 否 |
| required | 简化必填（若未传 `rule`，可自动生成必填规则） | `boolean` | `false` | 否 |
| disabled | 禁用状态（支持 `boolean 或 Ref<boolean>）` | `boolean \| Ref<boolean>` | `false` | 否 |
| clearable | 是否允许清空 | `boolean` | `false` | 否 |
| type | 简化类型（常用于 input） | `"text" \| "textarea" \| "password"` | `"text"` | 否 |
| rows | 多行输入行数（`type="textarea"` 常用） | `number` | `—` | 否 |
| labelField | options 的 label 字段名映射 | `string` | `—` | 否 |
| valueField | options 的 value 字段名映射 | `string` | `—` | 否 |
| filterable | 是否可过滤（select 类常用） | `boolean` | `false` | 否 |
| multiple | 是否多选（select 类常用） | `boolean` | `false` | 否 |

::: tip 关于 RuleT
`DyFormItem` 的 `rule` 使用泛型 `RuleT` 以避免在通用类型文件中绑定某个 UI 框架。  
例如在 Naive UI 模块中可以把 `RuleT` 绑定为 `FormItemRule \| FormItemRule[]`。
:::
