# Hooks

提供useReactiveForm与useDyForm,useDecorateForm,用于快速修改输入值及其表单状态

## 1. useReactiveForm

用于把 `DyFormItem[]` 统一做 `shallowReactive` 包装

### 签名

```ts
export function useReactiveForm<T extends Record<string, any>, U = any>(
    items: DyFormItem<T, U>[],
    isReactive: boolean = true
): DyFormItem<T, U>[]
```

### 参数

- `items`：表单项数组（每项是 `DyFormItem`）
- `isReactive`：是否包装为 `shallowReactive`（默认 `true`；传 `false` 原样返回）

### 示例

```ts
type FormRow = { username: string; password: string }

const formItems = useReactiveForm<FormRow>([
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
        render2: f => renderInput(f.value, {showPasswordOn: "click"}, f),
    },
    {
        key: "sex",
        label: "性别",
        value: ref<number | null>(null),
        render2: f => renderRadioGroup(f.value, [
            {label: '男', value: 0}, {label: '女', value: 1},
        ], {}, f),
    },
])
```

---

## 2. useDyForm

对 `DyFormItem[]` 提供外部控制能力：禁用、隐藏、赋值、取值、重置等。

[//]: # (支持传数组或 `Ref`。)

### 签名

```ts
export function useDyForm<Row extends Record<string, any>>(
    items: DyFormItem<Row>[] | Ref<DyFormItem<Row>[]>
)
```

### 返回方法一览

- `setDisabled(disabled, keys?)`：批量禁用/启用（不传 keys 则全量）
- `setHidden(hidden, keys?)`：批量隐藏/显示（不传 keys 则全量）
- `setValue(key, value)`：设置单个字段值
- `setValues(patch)`：批量设置字段值
- `getValue(key)`：获取字段对应值
- `getValues(keys?)`：获取表单值（不传 keys 返回全部；传 keys 返回指定字段）
- `getItem(key)`：获取某个字段对应的 `DyFormItem` 本体
- `setItem(key,{})`：设置指定字段不含value的其他值
- `setItems([[key,{}]])`：批量设置指定字段不含value的其他值
- `updateKeys([['username','name']])`：替换key

---

### API 用法示例

假设：

```ts
type FormRow = { username: string; password: string }
const useForm = useDyForm<FormRow>(formItems)
```

#### 1. 批量禁用/启用

```ts
useForm.setDisabled(true)                 // 全部禁用
useForm.setDisabled(true, ["username"])   // 仅禁用 username
useForm.setDisabled(false, ["password"])  // 仅启用 password
```

#### 2. 批量隐藏/显示

```ts
useForm.setHidden(true, ["username"])     // 隐藏 username
useForm.setHidden(false, ["username"])    // 显示 username
```

#### 3. 设置值（单个/批量）

```ts
useForm.setValue("username", "张三")

useForm.setValues({
    username: "naive-ui",
    password: "520",
})
```

#### 4. 取值

```ts
const all = useForm.getValues()
const part = useForm.getValues(["username"])
const part2 = useForm.getValue('username')
```

#### 5. 重置

```ts
useForm.onReset()     // 全部置 null
useForm.onReset("")   // 全部置空字符串
```

#### 6. 修改其他值

```ts
useForm.setItem('username', {placeholder: '请输入username'}) // 修改placeholder
useForm.setItems([
    ['username', {placeholder: '请输入username'}],
    ['password', {hidden: true}],
]) // 修改`DyFormItem`除value其他值
```

#### 7. 修改key

> 此方法直接修改key,容易混乱，谨慎使用

```ts
useForm.updateKeys([['sex', 'gender']])
```

## 3. useDecorateForm

简化render2函数，提供渲染类型，遍历去做处理，再`DyFormItem[]` 统一做 `shallowReactive` 包装
> 请从你选择的ui库中导入，例如 import {useDecorateForm} from "dynamicformdjx/naiveUi";

### 签名

```ts
// type
type RenderType =
    | "renderInput"
    | "renderSelect"
    | "renderPopSelect"
    | "renderTreeSelect"
    | "renderRadioGroup"
    | "renderRadioButtonGroup"
    | "renderCheckboxGroup"
    | "renderSwitch"
    | "renderDatePicker"
    | "renderTimePicker"
    | "renderCheckbox"
    | "renderDynamicTags"
    | "renderSlider"
    | "renderInputNumber"

type DecorateDyFormItem<Row extends Record<string, any>, RuleT = any> =
    Omit<DyFormItem<Row, RuleT>, "value"> & {
    value: DyFormItem<Row, RuleT>["value"] | any | null
    renderType?: RenderType
    renderProps?: Record<string, any>
}

// function
export function useDecorateForm<Row extends Record<string, any>, RuleT = any>(
    items: DecorateDyFormItem<Row, RuleT>[],
    isReactive = true
): DyFormItem<T, U>[]
```

### 参数

- `items`：表单项数组（每项是 `DecorateDyFormItem`）
- `isReactive`：是否包装为 `shallowReactive`（默认 `true`；传 `false` 原样返回）

### DecorateDyFormItem

- `renderType`：渲染类型，renderForm里提供的("renderInput"| "renderSelect"| "renderPopSelect"| "renderTreeSelect"| "
  renderRadioGroup"| "renderRadioButtonGroup"| "renderCheckboxGroup"| "renderSwitch"| "renderDatePicker"| "
  renderTimePicker"| "renderCheckbox"| "renderDynamicTags"| "renderSlider"| "renderInputNumber")
- `renderProps`:渲染参数，传入renderType里支持的props，例如`renderInput`的showPasswordOn:'click'

### 示例

```ts
type FormRow = { username: string; job: number }

const formItems = useDecorateForm<FormRow>([
    {
        key: "username",
        label: "姓名",
        value: null,
        required: true,
        renderType: 'renderInput'
    },
    {
        key: "job",
        label: "职位",
        value: null,
        required: true,
        options: ['前端', '后端'].map((label, value) => ({label, value})),
        renderType: 'renderSelect'
    },
])
```