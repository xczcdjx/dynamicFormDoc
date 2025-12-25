# NaiDynamicForm
动态表单,基本使用
```vue
<script setup lang="ts">
import { ref } from "vue"
import { useReactiveForm, useDyForm } from "dynamicformdjx"
import { NaiDynamicForm, type naiDynamicFormRef, renderInput } from "dynamicformdjx/naiveUi"

type FormRow = { username: string; password: string }

const formRef = ref<naiDynamicFormRef | null>(null)

const items = useReactiveForm<FormRow>([
  {
    key: "username",
    label: "姓名",
    value: ref<string | null>(null),
    required: true,
    render2: f => renderInput(f.value, {}, f),
  },
  {
    key: "password",
    label: "密码",
    value: ref<string | null>(null),
    required: true,
    render2: f => renderInput(f.value, { showPasswordOn: "click" }, f),
  },
])

const useForm = useDyForm<FormRow>(items)

const getData = () => console.log(formRef.value?.getResult?.())
const setData = () => useForm.setValues({ username: "naive-ui", password: "520" })
const validate = async () => console.log(await formRef.value?.validator())
</script>

<template>
  <NaiDynamicForm :items="items" ref="formRef" />
  <button @click="getData">get</button>
  <button @click="setData">set</button>
  <button @click="validate">validate</button>
</template>
```


## Props

| 属性名 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| formConfig | Naive UI `NForm` 配置（如 labelPlacement / size / labelWidth 等） | `FormProps` | `{ labelPlacement: 'left', size: 'medium' }` | 否 |
| gridConfig | `preset="grid"` 时使用的 `NGrid` 配置（如 cols / xGap / responsive 等） | `GridProps` | `{ responsive: 'screen', cols: 'xs:1 s:2 m:3 l:3 xl:4 2xl:4', xGap: 10 }` | 否 |
| rules | 额外传入的表单校验规则（会与 items 内置规则合并） | `FormRules` | `—` | 否 |
| preset | 渲染布局模式：`fullRow` 为普通纵向表单；`grid` 为栅格布局（配合 `gridConfig`） | `'fullRow' \| 'grid'` | `'fullRow'` | 否 |
| items | 动态表单项配置数组（每项为一个 `DyFormItem`） | `DyFormItem[]` | `—` | 是 |

::: tip preset 校验
`preset` 仅允许 `'fullRow'` 或 `'grid'`，否则会在控制台输出错误提示，并返回 `false`。
:::
