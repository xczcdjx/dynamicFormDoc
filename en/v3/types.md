# DyFormItem

`DyFormItem` is the configuration type for a single field in a dynamic form. You pass an `items` array into
`NaiDynamicForm`, and each element in that array is a `DyFormItem`.

## SelectOptionItem

| Field    | Description      | Type                      | Default | Required |
|----------|------------------|---------------------------|---------|----------|
| label    | Display text     | `string`                  | `—`     | Yes      |
| value    | Option value     | `any`                     | `—`     | Yes      |
| class    | Custom class     | `string`                  | `—`     | No       |
| style    | Custom style     | `string \| CSSProperties` | `—`     | No       |
| disabled | Whether disabled | `boolean`                 | `—`     | No       |

---

## BaseDyFormItem

| Field       | Description                                                            | Type                                                                                                                    | Default | Required |
|-------------|------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|---------|----------|
| key         | Field identifier (recommended to match the form model field)           | `keyof T`                                                                                                               | `—`     | Yes      |
| label       | Form item label                                                        | `string`                                                                                                                | `—`     | No       |
| value       | Reactive value (form data source)                                      | `Ref<any>`; if wrapped by `useReactiveForm` or `useDecorateForm`, you can omit `ref` (it will be wrapped automatically) | `—`     | Yes      |
| placeholder | Placeholder text                                                       | `string`                                                                                                                | `—`     | No       |
| options     | Options data (for select/checkbox/radio, etc.)                         | `SelectOptionItem[] \| any[]`                                                                                           | `—`     | No       |
| onChange    | Value change callback                                                  | `(value: any, associationItem: DyFormItem, options?: SelectOptionItem[] \| any[]) => void`                              | `—`     | No       |
| span        | Grid span (commonly used when `preset="grid"`)                         | `number`                                                                                                                | `—`     | No       |
| offset      | Grid offset (commonly used when `preset="grid"`)                       | `number`                                                                                                                | `—`     | No       |
| sort        | Sort key (if sorting logic is enabled, items are sorted by this field) | `number`                                                                                                                | `—`     | No       |

---

## DyFormItem

`DyFormItem<K, RuleT>` extends `BaseDyFormItem<K>` and adds rendering, validation, and display-control capabilities.

| Field        | Description                                                                                         | Type                                 | Default                   | Required |
|--------------|-----------------------------------------------------------------------------------------------------|--------------------------------------|---------------------------|----------|
| path         | Validation path (defaults to `key` if not provided)                                                 | `string`                             | `—`                       | No       |
| hidden       | Whether to hide this item                                                                           | `boolean`                            | `false`                   | No       |
| render2      | Custom render function (returns a VNode)                                                            | `(formItem: DyFormItem) => VNode`    | `—`                       | No       |
| reset        | Custom reset logic                                                                                  | `(formItem: DyFormItem) => void`     | `—`                       | No       |
| rule         | Field validation rule (type depends on the UI layer, e.g., Naive UI’s `FormItemRule`)               | `RuleT`                              | `—`                       | No       |
| required     | Shorthand required flag (if `rule` is not provided, a required rule can be generated automatically) | `boolean`                            | `false`                   | No       |
| requiredHint | Required-field message generator                                                                    | `(label: string) => string`          | `"label" cannot be empty` | No       |
| disabled     | Disabled state (supports `boolean` or `Ref<boolean>`)                                               | `boolean \| Ref<boolean>`            | `false`                   | No       |
| clearable    | Whether clearing is allowed                                                                         | `boolean`                            | `false`                   | No       |
| type         | Shorthand input type (commonly used for input)                                                      | `"text" \| "textarea" \| "password"` | `"text"`                  | No       |
| rows         | Number of rows for multiline input (commonly used with `type="textarea"`)                           | `number`                             | `—`                       | No       |
| labelField   | Mapping for the label field name in `options`                                                       | `string`                             | `—`                       | No       |
| valueField   | Mapping for the value field name in `options`                                                       | `string`                             | `—`                       | No       |
| filterable   | Whether filtering is enabled (commonly used for select-like components)                             | `boolean`                            | `false`                   | No       |
| multiple     | Whether multiple selection is enabled (commonly used for select-like components)                    | `boolean`                            | `false`                   | No       |

::: tip about RuleT
`DyFormItem` uses the generic `RuleT` for its `rule` field to avoid binding the shared type definitions to a specific UI framework.
For example, in the Naive UI module, you can bind `RuleT` to `FormItemRule \| FormItemRule[]`.
:::
