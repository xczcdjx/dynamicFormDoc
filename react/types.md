# DyFormItem

`DyFormItem` 是动态表单的单项配置类型。你传入 `AdDynamicForm` 的 `items` 数组，每一项就是一个 `DyFormItem`。
:::tip
下方类型大多数与`vue3`版本的属性类似
:::

## SelectOptionItem

| 字段        | 说明        | 类型                        | 默认值 | 必填 |
|-----------|-----------|---------------------------|-----|----|
| label     | 展示文本      | `string`                  | `—` | 是  |
| value     | 选项值       | `any`                     | `—` | 是  |
| className | 自定义 class | `string`                  | `—` | 否  |
| style     | 自定义样式     | `string \| CSSProperties` | `—` | 否  |
| disabled  | 是否禁用      | `boolean`                 | `—` | 否  |

---

## BaseDyFormItem

| 字段          | 说明                            | 类型                                                                                         | 默认值 | 必填 |
|-------------|-------------------------------|--------------------------------------------------------------------------------------------|-----|----|
| key         | 字段标识（建议与表单 model 字段一致）        | `keyof T`                                                                                  | `—` | 是  |
| label       | 表单项 label                     | `string`                                                                                   | `—` | 否  |
| value       | 响应式值（表单数据来源）                  | `Ref<any>`,使用`useReactiveForm` 或`useDecorateForm`包装的可以省略ref函数，会做包装处理                       | `—` | 是  |
| placeholder | 占位提示                          | `string`                                                                                   | `—` | 否  |
| options     | 选项数据（select/checkbox/radio 等） | `SelectOptionItem[] \| any[]`                                                              | `—` | 否  |
| onChange    | 值变化回调                         | `(value: any, associationItem: DyFormItem, options?: SelectOptionItem[] \| any[]) => void` | `—` | 否  |
| span        | 栅格占位（`preset="grid"` 时常用）     | `number`                                                                                   | `—` | 否  |
| offset      | 偏移占位（`preset="grid"` 时常用）     | `number`                                                                                   | `—` | 否  |
| sort        | 排序字段（如果启用排序逻辑则按此排序）           | `number`                                                                                   | `—` | 否  |

---

## DyFormItem

`DyFormItem<K, RuleT>` 继承自 `BaseDyFormItem<K>`，并扩展渲染、校验、显示控制等能力。

| 字段            | 说明                                               | 类型                                   | 默认值             | 必填 |
|---------------|--------------------------------------------------|--------------------------------------|-----------------|----|
| path          | 表单校验 path（不传则默认使用 `key`）                         | `string`                             | `—`             | 否  |
| hidden        | 是否隐藏该项                                           | `boolean`                            | `false`         | 否  |
| render2       | 自定义渲染函数（返回 VNode）                                | `(formItem: DyFormItem) => VNode`    | `—`             | 否  |
| rule          | 单项校验规则（由具体 UI 层决定类型，如 Naive UI 的 FormItemRule 等） | `RuleT`                              | `—`             | 否  |
| required      | 简化必填（若未传 `rule`，可自动生成必填规则）                       | `boolean`                            | `false`         | 否  |
| requiredHint  | 必填提示                                             | `(label: string) => string`          | ``"label"不能为空`` | 否  |
| disabled      | 禁用状态（支持 `boolean`)                               | `boolean`                            | `false`         | 否  |
| allowClear    | 是否允许清空                                           | `boolean`                            | `false`         | 否  |
| type          | 简化类型（常用于 input）                                  | `"text" \| "textarea" \| "password"` | `"text"`        | 否  |
| rows          | 多行输入行数（`type="textarea"` 常用）                     | `number`                             | `—`             | 否  |
| labelField    | options 的 label 字段名映射                            | `string`                             | `—`             | 否  |
| valueField    | options 的 value 字段名映射                            | `string`                             | `—`             | 否  |
| childField    | options 的 child 字段名映射                            | `string`                             | `—`             | 否  |
| showSearch    | 是否可过滤（select 类常用）                                | `boolean`                            | `-`             | 否  |
| searchOnLabel | 是否可过滤（按`label`值过滤）                               | `boolean`                            | `-`             | 否  |
| showCount     | 是否显示字数                                           | `boolean`                            | `-`             | 否  |
| mode          | 渲染模式                                             | `'multiple' \| 'tags'`               | `-`             | 否  |
| isCustom      | 是否自定义校验规则                                        | `boolean`                            | `-`             | 否  |
| formItemProps | `Form.Item ` 属性                                  | `object`                             | `-`             | 否  |

::: tip 关于 RuleT
`DyFormItem` 的 `rule` 使用泛型 `RuleT` 以避免在通用类型文件中绑定某个 UI 框架。  
例如在 Naive UI 模块中可以把 `RuleT` 绑定为 `FormItemRule \| FormItemRule[]`。
:::

[//]: # (## ZealPagination)

[//]: # ()

[//]: # (分页hooks参数)

[//]: # ()

[//]: # (| 字段                 | 类型           | 说明                                  |)

[//]: # (|--------------------|--------------|-------------------------------------|)

[//]: # (| `pageNo`           | `number`     | 当前页码                                |)

[//]: # (| `pageSize`         | `number`     | 每页数量                                |)

[//]: # (| `total`            | `number`     | 总条数（映射到 `itemCount`）                |)

[//]: # (| `pageSizes`        | `number[]`   | 可选每页条数                              |)

[//]: # (| `pageSlot`         | `number`     | 页码按钮展示数量（传给 `NPagination.pageSlot`） |)

[//]: # (| `showSizePicker`   | `boolean`    | 是否显示 size picker                    |)

[//]: # (| `onChange`         | `&#40;&#41; => void` | 页码变化回调                              |)

[//]: # (| `onPageSizeChange` | `&#40;&#41; => void` | 每页数量变化回调                            |)

[//]: # ()

[//]: # (## ZealColumn`<T>`)

[//]: # ()

[//]: # (EleZealTable 的列配置类型，用于描述每一列如何展示、对齐、宽度、排序、以及自定义渲染。)

[//]: # ()

[//]: # (| 字段                    | 说明                            | 类型                                                | 默认值         | 必填 |)

[//]: # (|-----------------------|-------------------------------|---------------------------------------------------|-------------|----|)

[//]: # (| `label`               | 列标题                           | `string`                                          | `-`         | 否  |)

[//]: # (| `prop`                | 行数据字段名（用于默认显示 `row[prop]`）    | `keyof T`                                         | `-`         | 否  |)

[//]: # (| `key`                 | 列唯一 key（不传会用 `prop/label` 生成） | `string`                                          | `-`         | 否  |)

[//]: # (| `width`               | 列宽                            | `string \| number`                                | `-`         | 否  |)

[//]: # (| `minWidth`            | 最小列宽                          | `string \| number`                                | `-`         | 否  |)

[//]: # (| `type`                | 特殊列类型（选择/序号/展开）               | `'default' \| 'selection' \| 'index' \| 'expand'` | `'default'` | 否  |)

[//]: # (| `align`               | 列内容对齐                         | `'left' \| 'center' \| 'right'`                   | `-`         | 否  |)

[//]: # (| `fixed`               | 固定列                           | `boolean \| 'left' \| 'right'`                    | `-`         | 否  |)

[//]: # (| `sortable`            | 是否排序（`'custom'` 为自定义排序）       | `boolean \| 'custom'`                             | `-`         | 否  |)

[//]: # (| `showOverflowTooltip` | 内容溢出时显示 tooltip               | `boolean`                                         | `-`         | 否  |)

[//]: # (| `resizable`           | 列宽可拖拽调整                       | `boolean`                                         | `-`         | 否  |)

[//]: # (| `render2`             | 自定义单元格渲染（优先级最高）               | `&#40;row: T, $index: number&#41; => VNode`               | `-`         | 否  |)

[//]: # (| `slot`                | 指定具名单元格插槽 key（用于匹配组件 slots）   | `string`                                          | `-`         | 否  |)

[//]: # ()
