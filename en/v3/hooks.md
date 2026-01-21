---
outline: deep
---

# Hooks

Provides `useReactiveForm` and `useDyForm` and `useDecorateForm` to quickly update input values and manage form state.

## 1. useReactiveForm

Used to wrap a `DyFormItem[]` with `shallowReactive` in a unified way.

### Signature

```ts
export function useReactiveForm<T extends Record<string, any>, U = any>(
    items: DyFormItem<T, U>[],
    isReactive: boolean = true
): DyFormItem<T, U>[]
```

### 参数

- `items`：form item array (each item is a `DyFormItem`)
- `isReactive`：whether to wrap with `shallowReactive` (default `true`; pass `false` to return the original array as-is)

### Example

```ts
type FormRow = { username: string; password: string }

const formItems = useReactiveForm<FormRow>([
    {
        key: "username",
        label: "Name",
        value: ref<string | null>(null),
        required: true,
        render2: f => renderInput(f.value, {}, f),
    },
    {
        key: "password",
        label: "Password",
        value: ref<string | null>(null),
        required: true,
        render2: f => renderInput(f.value, {showPasswordOn: "click"}, f),
    },
    {
        key: "sex",
        label: "Sex",
        value: ref<number | null>(null),
        render2: f => renderRadioGroup(f.value, [
            {label: 'male', value: 0}, {label: 'female', value: 1},
        ], {}, f),
    },
])
```

---

## 2. useDyForm

Provides external control for a `DyFormItem[]`: disable, hide, set/get values, reset, etc.

[//]: # (支持传数组或 `Ref`。)

### Signature

```ts
export function useDyForm<Row extends Record<string, any>>(
    items: DyFormItem<Row>[] | Ref<DyFormItem<Row>[]>
)
```

### Return Functions

- `setDisabled(disabled, keys?)`：batch disable/enable (if keys is omitted, applies to all)
- `setHidden(hidden, keys?)`：batch hide/show (if keys is omitted, applies to all)
- `setValue(key, value)`：set a single field value
- `setValues(patch)`：batch set field values
- `getValue(key)`：get the `DyFormItem` object for a given field
- `getValues(keys?)`：get form values (if keys is omitted, returns all; otherwise returns specified fields)
- `onReset(value=null)`：reset all field values to the same value (default `null`)
- `getItem(key)`: Get the `DyFormItem` instance for the specified field.
- `setItem(key, {})`: Set non-`value` properties for the specified field.
- `setItems([[key, {}]])`: Batch set non-`value` properties for specified fields.
- `updateKeys([['username', 'name']])`: Replace keys.

---

### API usage example

Assume：

```ts
type FormRow = { username: string; password: string }
const useForm = useDyForm<FormRow>(formItems)
```

#### 1. Batch disable / enable

```ts
useForm.setDisabled(true)                 // disable all
useForm.setDisabled(true, ["username"])   // disable only username
useForm.setDisabled(false, ["password"])  // enable only password
```

#### 2. Batch hide / show

```ts
useForm.setHidden(true, ["username"])     // hide username
useForm.setHidden(false, ["username"])    // show username
```

#### 3. Set values (single / batch)

```ts
useForm.setValue("username", "zhangsan")

useForm.setValues({
    username: "naive-ui",
    password: "520",
})
```

#### 4. Get values

```ts
const all = useForm.getValues()
const part = useForm.getValues(["username"])
const part2 = useForm.getValue('username')
```

#### 5. Reset

```ts
useForm.onReset()     // set all to null
useForm.onReset("")   // set all to empty string
```

#### 6. Modify other values

```ts
useForm.setItem('username', {placeholder: 'please input username'}) // modify placeholder
useForm.setItems([
    ['username', {placeholder: 'please input username'}],
    ['password', {hidden: true}],
]) // Modify all properties of `DyFormItem` except `value`.
```

#### 7. Modify key

> This method modifies keys directly, which can easily cause confusion. Use with caution.

```ts
useForm.updateKeys([['sex', 'gender']])
```

## 3. useDecorateForm

Simplifies the render2 function by providing render types. It iterates and processes items, then wraps the
`DyFormItem[]` with `shallowReactive` in a unified way.
> Import from the UI adapter you choose, for example: import { useDecorateForm } from "dynamicformdjx/naiveUi";

### Signature

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

### Parameters

- `items`：form item array (each item is a `DecorateDyFormItem`)
- `isReactive`：whether to wrap with `shallowReactive` (default `true`; pass `false` to return the original array as-is)

### DecorateDyFormItem

- `renderType`：render type (from helpers provided in renderForm, e.g.("renderInput"| "renderSelect"| "
  renderPopSelect"| "renderTreeSelect"| "
  renderRadioGroup"| "renderRadioButtonGroup"| "renderCheckboxGroup"| "renderSwitch"| "renderDatePicker"| "
  renderTimePicker")
- `renderProps`:render props passed to the selected renderType, e.g. showPasswordOn: "click" for `renderInput`

### Example

```ts
type FormRow = { username: string; job: number }

const formItems = useDecorateForm<FormRow>([
    {
        key: "username",
        label: "Name",
        value: null,
        required: true,
        renderType: 'renderInput'
    },
    {
        key: "job",
        label: "Role",
        value: null,
        required: true,
        options: ['Frontend', 'Backend'].map((label, value) => ({label, value})),
        renderType: 'renderSelect'
    },
])
```

---

## 4. usePagination

Pagination hook that provides basic pagination configuration.

### Signature

```ts
export type PageModal = {
    pageSize: number
    pageNo: number
    total: number
}

export type ZealPagination = {
    showSizePicker: boolean
    pageCount?: number
    pageSizes: number[]
    pageSlot?: number
    onChange: () => void
    onPageSizeChange: () => void
    setTotalSize: (totalSize: number) => void
    layout?: string
} & PageModal

export function usePagination(
    cb?: () => void,
    options?: Partial<ZealPagination>
): ZealPagination
```

### Parameters

* `cb`: Request callback. It will be triggered when the internal page number or page size changes.
* `options`: Initial pagination configuration. The passed options will be merged with the default values.

### Example

```ts
const pagination = usePagination(fetchData)

function fetchData() {
    const {pageNo, pageSize} = pagination
    // ...
}
```

---

## 5. useWindowSize

Listens to window size changes and provides the updated width and height.

### Signature

```ts
type SizeObjType = {
    isMobile: boolean
    width: number
    height: number
}

export function useWindowSize(
    mobileWidth: number,
    delay: number
): SizeObjType
```

### Parameters

* `mobileWidth`: Maximum width for mobile devices. When `width` is smaller than this value, `isMobile` will be `true`.
  Default is `756`.
* `delay`: Delay time in milliseconds. When the window size changes, the new value will be returned after this delay.
  Default is `500`.

### Example

```ts
const {isMobile, width, height} = useWindowSize()
```

---

## 6. useObserverSize

Calculates the remaining height inside the content area.

### Signature

```ts
export function useObserverSize<T extends VueComponentCtor>(ct: T): {
    wrapRef,
    cardRef,
    restRef,
    tableHeight
}
```

### Parameters

* `ct`: Component constructor. Internally, it only checks
  `ct.name === 'ElCard' ? 'el' : 'n'`
  to calculate the remaining content height.

### Example

> Using **ElCard** as an example

```vue

<script setup lang="ts">
  import {useObserverSize} from "dynamicformdjx";
  import {ElCard} from "element-plus";

  const {wrapRef, cardRef, restRef, tableHeight} = useObserverSize(ElCard);
</script>

<template>
  <div class="container" ref="wrapRef">
    <el-card ref="cardRef">
      <template #header>
        useObserverSize Test
      </template>
      <div
          class="content"
          :style="{
          height: tableHeight + 'px'
        }"
      >
        <p>tableHeight {{ tableHeight }}</p>
      </div>
    </el-card>
    <div class="rest" ref="restRef"></div>
  </div>
</template>

<style scoped>
  .container {
    height: calc(100vh - 40px);
  }
</style>
```

---
