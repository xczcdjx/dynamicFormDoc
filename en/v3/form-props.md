DynamicForm Parameter Reference

## NaiDynamicForm Props

| Prop       | Description                                                                                  | Type                  | Default                                                                   | Required |
|------------|----------------------------------------------------------------------------------------------|-----------------------|---------------------------------------------------------------------------|----------|
| formConfig | Naive UI `NForm` configuration (e.g., `labelPlacement` / `size` / `labelWidth`, etc.)        | `FormProps`           | `{ labelPlacement: 'left', size: 'medium' }`                              | No       |
| gridConfig | `NGrid` configuration used when `preset="grid"` (e.g., `cols` / `xGap` / `responsive`, etc.) | `GridProps`           | `{ responsive: 'screen', cols: 'xs:1 s:2 m:3 l:3 xl:4 2xl:4', xGap: 10 }` | No       |
| rules      | Extra form validation rules (merged with the built-in rules from `items`)                    | `FormRules`           | `—`                                                                       | No       |
| preset     | Layout mode: `fullRow` = normal vertical form; `grid` = grid layout (with `gridConfig`)      | `'fullRow' \| 'grid'` | `'fullRow'`                                                               | No       |
| items      | Dynamic form item config array (each item is a `DyFormItem`)                                 | `DyFormItem[]`        | `—`                                                                       | Yes      |

## EleDynamicForm Props

| Prop       | Description                                                                                     | Type                  | Default                                          | Required |
|------------|-------------------------------------------------------------------------------------------------|-----------------------|--------------------------------------------------|----------|
| formConfig | Element Plus `ElForm` configuration (e.g., `labelPosition` / `size` / `labelWidth`, etc.)       | `FormProps`           | `{ labelPosition: 'left', size: 'default' }`     | No       |
| rowConfig  | `RowProps` configuration used when `preset="grid"` (e.g., `justify` / `align` / `gutter`, etc.) | `RowProps`            | `{ gutter: 10, justify: 'start', align: 'top' }` | No       |
| rules      | Extra form validation rules (merged with the built-in rules from `items`)                       | `FormRules`           | `—`                                              | No       |
| preset     | Layout mode: `fullRow` = normal vertical form; `grid` = grid layout (with `gridConfig`)         | `'fullRow' \| 'grid'` | `'fullRow'`                                      | No       |
| items      | Dynamic form item config array (each item is a `DyFormItem`)                                    | `DyFormItem[]`        | `—`                                              | Yes      |

::: tip preset validate
`preset` only allows `fullRow` or `grid`. Otherwise, an error message will be printed in the console and it will return
`false`.
:::

## Expose

| Method                 | Parameters                                                                        | Return             | Description                             |
|------------------------|-----------------------------------------------------------------------------------|--------------------|-----------------------------------------|
| `reset(v?: any)`       | `v = null` → reset the form data                                                  | `void`             | Reset form data                         |
| `validator`            | `-`                                                                               | `Promise<object>`  | Validate the form and return the result |
| `getResult(t = 'res')` | `t = 'res'` → get the final result<br>`t = 'ori'` → get the original render array | `object` / `array` | Get the internal form data structure    |

## Slots

| Slot     | Parameters | Description                           |
|----------|------------|---------------------------------------|
| `header` | `-`        | Named slot for the header/title       |
| `footer` | `-`        | Named slot for the footer/bottom area |
