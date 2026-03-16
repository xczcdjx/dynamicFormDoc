# DyFormItem

`DyFormItem` is the configuration type for a single dynamic form item. Each entry in the `items` array passed to
`AdDynamicForm` is a `DyFormItem`.

:::tip
Most of the types below are similar to the props in the vue3 version.
:::

## SelectOptionItem

| Field     | Description      | Type                      | Default | Required |
|-----------|------------------|---------------------------|---------|----------|
| label     | Display text     | `string`                  | `—`     | Yes      |
| value     | Option value     | `any`                     | `—`     | Yes      |
| className | Custom class     | `string`                  | `—`     | No       |
| style     | Custom style     | `string \| CSSProperties` | `—`     | No       |
| disabled  | Whether disabled | `boolean`                 | `—`     | No       |

---

## BaseDyFormItem

| Field       | Description                                                  | Type                                                                                          | Default | Required |
|-------------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------|---------|----------|
| key         | Field identifier (recommended to match the form model field) | `keyof T`                                                                                     | `—`     | Yes      |
| label       | Form item label                                              | `string`                                                                                      | `—`     | No       |
| value       | Reactive value (source of form data)                         | `any`, when wrapped with `useReactiveForm` or `useDecorateForm` will be wrapped automatically | `—`     | Yes      |
| placeholder | Placeholder text                                             | `string`                                                                                      | `—`     | No       |
| options     | Option data (for select / checkbox / radio, etc.)            | `SelectOptionItem[] \| any[]`                                                                 | `—`     | No       |
| onChange    | Callback triggered when the value changes                    | `(value: any, associationItem: DyFormItem, options?: SelectOptionItem[] \| any[]) => void`    | `—`     | No       |
| span        | Grid span (commonly used when `preset="grid"`)               | `number`                                                                                      | `—`     | No       |
| offset      | Grid offset (commonly used when `preset="grid"`)             | `number`                                                                                      | `—`     | No       |
| sort        | Sort field (used for sorting if sorting logic is enabled)    | `number`                                                                                      | `—`     | No       |

---

## DyFormItem

`DyFormItem<K, RuleT>` extends `BaseDyFormItem<K>` and adds rendering, validation, display control, and related
capabilities.

| Field         | Description                                                                                               | Type                                  | Default                   | Required |
|---------------|-----------------------------------------------------------------------------------------------------------|---------------------------------------|---------------------------|----------|
| path          | Form validation path (defaults to `key` if not provided)                                                  | `string`                              | `—`                       | No       |
| hidden        | Whether to hide this item                                                                                 | `boolean`                             | `false`                   | No       |
| render2       | Custom render function (returns `ReactNode`)                                                              | `(formItem: DyFormItem) => ReactNode` | `—`                       | No       |
| rule          | Validation rule for this item (the exact type depends on the UI layer, such as Naive UI's `FormItemRule`) | `RuleT`                               | `—`                       | No       |
| required      | Simplified required option (if `rule` is not provided, a required rule can be generated automatically)    | `boolean`                             | `false`                   | No       |
| requiredHint  | Required field message                                                                                    | `(label: string) => string`           | `"label" cannot be empty` | No       |
| disabled      | Disabled state (supports `boolean`)                                                                       | `boolean`                             | `false`                   | No       |
| allowClear    | Whether clearing is allowed                                                                               | `boolean`                             | `false`                   | No       |
| type          | Simplified type (commonly used for input)                                                                 | `"text" \| "textarea" \| "password"`  | `"text"`                  | No       |
| rows          | Number of rows for multiline input (commonly used when `type="textarea"`)                                 | `number`                              | `—`                       | No       |
| labelField    | Mapping for the label field name in `options`                                                             | `string`                              | `—`                       | No       |
| valueField    | Mapping for the value field name in `options`                                                             | `string`                              | `—`                       | No       |
| childField    | Mapping for the child field name in `options`                                                             | `string`                              | `—`                       | No       |
| showSearch    | Whether filtering is enabled (commonly used for select components)                                        | `boolean`                             | `-`                       | No       |
| searchOnLabel | Whether filtering is based on the `label` value                                                           | `boolean`                             | `-`                       | No       |
| showCount     | Whether to display the character count                                                                    | `boolean`                             | `-`                       | No       |
| mode          | Rendering mode                                                                                            | `'multiple' \| 'tags'`                | `-`                       | No       |
| isCustom      | Whether to use a custom validation rule                                                                   | `boolean`                             | `-`                       | No       |
| formItemProps | `Form.Item` props                                                                                         | `object`                              | `-`                       | No       |

::: tip About RuleT
The `rule` field in `DyFormItem` uses the generic type `RuleT` to avoid binding the shared type file to a specific UI
framework.
For example, in the Antd module, `RuleT` can be bound to `Rule \| Rule[]`.
:::
