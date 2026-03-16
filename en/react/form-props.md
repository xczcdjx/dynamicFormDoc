# DynamicForm Parameter Description

## AdDynamicForm Props

| Property          | Description                                                                                                    | Type                  | Default          | Required |
|-------------------|----------------------------------------------------------------------------------------------------------------|-----------------------|------------------|----------|
| `items`           | Array of dynamic form item configurations, where each item is a `DyFormItem`                                   | `DyFormItem[]`        | `—`              | Yes      |
| `formConfig`      | Antd `Form` configuration, such as `labelPlacement`, `size`, `labelWidth`, etc.                                | `FormProps`           | `-`              | No       |
| `gridConfig`      | `Row` configuration used when `preset="grid"`, such as `gutter`, `align`, `justify`, etc.                      | `RowProps`            | `{ gutter: 10 }` | No       |
| `rules`           | Additional form validation rules passed in, which will be merged with the built-in rules in `items`            | `RulesMap`            | `—`              | No       |
| `preset`          | Rendering layout mode: `fullRow` for a standard vertical form; `grid` for grid layout (used with `gridConfig`) | `'fullRow' \| 'grid'` | `'fullRow'`      | No       |
| `validateTrigger` | Form validation trigger mode                                                                                   | `'string' \| 'null'`  | `onBlur`         | No       |

::: tip Preset Validation
`preset` only accepts `'fullRow'` or `'grid'`. Otherwise, an error will be logged in the console and `false` will be
returned.
:::

## Ref

| Method                 | Parameters                                                                           | Return Type        | Description                                    |
|------------------------|--------------------------------------------------------------------------------------|--------------------|------------------------------------------------|
| `reset(v?: any)`       | `v = null` → resets the form data to a new state                                     | `void`             | Reset form data                                |
| `validator`            | `-`                                                                                  | `Promise<object>`  | Validates the form and returns the form result |
| `getResult(t = 'res')` | `t = 'res'` → gets the current final result<br>`t = 'ori'` → gets the rendered array | `object` / `array` | Gets the internal form data structure          |

## Slots (Function)

| Name     | Parameters | Description               |
|----------|------------|---------------------------|
| `header` | `-`        | Named slot for the header |
| `footer` | `-`        | Named slot for the footer |
