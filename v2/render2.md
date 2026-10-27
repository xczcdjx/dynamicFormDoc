---
outline: deep
---

# Render2

从 `dynamicformdjx-vue2/elementUi` 导入。推荐先使用 `renderType`，需要组合控件或自行控制事件时再使用 `render2`。

## 内置渲染

```js
const items = [
  { key: 'name', value: '', renderType: 'renderInput', renderProps: { clearable: true } },
  { key: 'role', value: null, renderType: 'renderSelect',
    options: [{ label: '管理员', value: 'admin' }] }
]
```

| 函数 | 对应控件 | 调用方式 |
| --- | --- | --- |
| renderInput | Input | `(model, props, item)` |
| renderInputNumber | InputNumber | `(model, props, item)` |
| renderSwitch / renderCheckbox | Switch / Checkbox | `(model, props, item)` |
| renderDatePicker / renderTimePicker | DatePicker / TimePicker | `(model, props, item)` |
| renderSlider | Slider | `(model, props, item)` |
| renderDynamicTags | Tag + Input | `(model, props, item)` |
| renderSelect / renderPopSelect | Select | `(model, options, props, item)` |
| renderTreeSelect | Cascader | `(model, options, props, item)` |
| renderRadioGroup / renderRadioButtonGroup | RadioGroup | `(model, options, props, item)` |
| renderCheckboxGroup | CheckboxGroup | `(model, options, props, item)` |

Vue2 的 `renderPopSelect` 使用 Select，`renderTreeSelect` 使用 Cascader，默认 `emitPath: false`。`renderDynamicTags` 使用数组值，输入后按 Enter 或失焦新增，关闭标签删除。

## 显式调用

```js
import { renderInput, renderSelect } from 'dynamicformdjx-vue2/elementUi'

const items = [
  { key: 'name', value: '', render2: item => renderInput(item.value, { clearable: true }, item) },
  { key: 'role', value: null, options: [{ label: '访客', value: 'guest' }],
    render2: item => renderSelect(item.value, item.options, {}, item) }
]
```

传入最后的 `item` 参数，渲染函数才会将编辑结果写回字段；不要直接套用 React 的参数顺序。自定义 VNode 示例见 [EleDynamicForm](./dy-elementUi-form)。
