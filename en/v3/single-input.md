---
outline: deep
---

# DynamicInput

Dynamic input

## Basic Use

<DemoBlock>
<template #code>

::: code-group

```vue [TypeScript]

<script setup lang="ts">
  import {ref} from 'vue'
  import {DynamicInput, type dynamicInputRef} from 'dynamicformdjx'

  const test = ref<{ a: string; b: number; c: number[] }>({
    a: 'Hello world',
    b: 1314,
    c: [5, 2, 0]
  })

  const dyRef = ref<dynamicInputRef | null>(null)

  const setData = () => {
    dyRef.value?.onSet({test: 'helloWorld'})
  }
</script>

<template>
  <p>Base</p>
  <DynamicInput v-model="test" ref="dyRef"/>
  <pre>{{ test }}</pre>
  <div>
    <button @click="setData">setData</button>
  </div>
</template>
```

```vue [JavaScript]

<script setup>
  import {ref} from 'vue'
  import {DynamicInput} from 'dynamicformdjx'

  const test = ref({
    a: 'Hello world',
    b: 1314,
    c: [5, 2, 0]
  })

  const dyRef = ref(null)

  const setData = () => {
    dyRef.value?.onSet({test: 'helloWorld'})
  }
</script>

<template>
  <p>Base</p>
  <DynamicInput v-model="test" ref="dyRef"/>
  <pre>{{ test }}</pre>
  <div>
    <button @click="setData">setData</button>
  </div>
</template>
```

:::

</template>
<SimpleInput/>
</DemoBlock>

## With Slots Use

<DemoBlock>
<template #code>

```vue

<script setup>
  import {ref} from 'vue'
  import {DynamicInput} from 'dynamicformdjx'

  const test = ref({
    a: 'Hello world',
    b: 1314,
    c: [5, 2, 0]
  })
</script>

<template>
  <DynamicInput v-model="test" ref="dyRef" is-controller>
    <template #newBtn="{newItem}">
      <button @click="newItem">新</button>
    </template>
    <template #resetBtn="{reset}">
      <button @click="reset">重置</button>
    </template>
    <template #mergeBtn="{merge}">
      <button @click="merge">合并</button>
    </template>
    <template #typeTools="{row,toggleArray,toggleNumber}">
      <button @click="toggleArray" :class="row.isArray?'act':''">Array</button>&nbsp;
      <button @click="toggleNumber" :class="row.isNumber?'act':''">Number</button>
    </template>
    <template #rowActions="{isLast,addItem,removeItem}">
      <button @click="addItem" :disabled="!isLast">+</button>
      <button @click="removeItem">-</button>
    </template>
  </DynamicInput>
</template>
<style scoped>
  .act {
    background: skyblue;
  }
</style>
```

</template>
<SimpleSlotInput/>
</DemoBlock>

## API

### Props

| Name          | Description                                                     | Type       | Default                                                                         | Required |
|---------------|-----------------------------------------------------------------|------------|---------------------------------------------------------------------------------|----------|
| size          | Defines the form and button size (`small`, `large`, `default`)  | `string`   | `"default"`                                                                     | No       |
| isController  | Controlled mode. When enabled, component manages its own state. | `boolean`  | —                                                                               | No       |
| dyCls         | Custom CSS class name for the form container                    | `string`   | —                                                                               | No       |
| randomFun     | Function used to generate a unique ID for each form item        | `Function` | `(i?: number) => \`${Date.now()}_${i ?? 0}``                                    | No       |
| btnConfigs    | Text configuration for reset / add item / merge                 | `object`   | `{ resetTxt: "Reset", newTxt: "Add Item", mergeTxt: "Merge" }`                  | No       |
| configs       | Additional behavior configuration (scrolling, filters, etc.)    | `object`   | `{ hideReset: false, maxHeight: "300px", autoScroll: true, allowFilter: true }` | No       |
| dyListConfigs | Dynamic list configuration such as separator                    | `object`   | `{ arraySplitSymbol: "," }`                                                     | No       |
| modelValue    | Bound model value (`v-model`)                                   | `object`   | —                                                                               | ✅ Yes    |

### Emits

| Event Name          | Description                     | Payload                              |
|---------------------|---------------------------------|--------------------------------------|
| `update:modelValue` | Emitted when form value changes | `(value: object)`                    |
| `onReset`           | Emitted when the form is reset  | —                                    |
| `onMerge`           | Emitted when data is merged     | `(merged: object, origin: object[])` |

### Expose

| Method                 | Arguments                                                             | Returns            | Description                 |
|------------------------|-----------------------------------------------------------------------|--------------------|-----------------------------|
| `onSet(o?: object)`    | `o = object` → set new form data<br>`o = undefined` → reset form      | `void`             | Set or reset form data      |
| `getResult(t = 'res')` | `t = 'res'` → get rendered result<br>`t = 'ori'` → get original array | `object` / `array` | Get current form data state |

### Slots

- All slots are named slots. In TSX, pass them via v-slots.
- Each slot function returns VNode[].

#### Types

```ts
type ScopeType = {
    row: {
        rId: string
        key: string
        value: string
        isArray?: boolean
        isNumber?: boolean
    }
    index: number
    isLast: boolean
    addItem: () => void
    removeItem: () => void
    toggleArray: () => boolean
    toggleNumber: () => boolean
}
```

#### Slot List

| Slot Name    | Params        | Param Type                | Description                                                                                                                                            |
|--------------|---------------|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `newBtn`     | `{ newItem }` | `{ newItem: () => void }` | Customize the **“New” button** area. Call `newItem()` to append a new row.                                                                             |
| `resetBtn`   | `{ reset }`   | `{ reset: () => void }`   | Customize the **“Reset” button** area. Call `reset()` to reset data.                                                                                   |
| `mergeBtn`   | `{ merge }`   | `{ merge: () => void }`   | Customize the **“Merge” button** area. Call `merge()` to run merge logic.                                                                              |
| `typeTools`  | `scope`       | `ScopeType`               | Customize the per-row **type tools** section (e.g. Array/Number toggles). You can use `toggleArray()` / `toggleNumber()` etc.                          |
| `rowActions` | `scope`       | `ScopeType`               | Customize the per-row **actions** section (e.g. + / -). You can use `addItem()` / `removeItem()`, and use `isLast` to restrict adding to the last row. |

## Extra Use

If your project is using either Naive UI or Element Plus , you can import the corresponding integration components as
shown below:

```vue

<script setup lang="ts">
  // 依赖于naive-ui
  import {NaiDynamicInput} from "dynamicformdjx/naiveUi";
  // 依赖于element-plus
  import {EleDynamicInput} from "dynamicformdjx/elementPlus";

  const test2 = ref<{ d: number[] }>({
    d: [6, 6, 6]
  })
  const test3 = ref<{ e: string }>({
    e: "victory"
  })
</script>

<template>
  <div>
    <p>Base on NaiveUi</p>
    <nai-dynamic-input v-model="test2"
                       is-controller
    />
    <pre>{{ test2 }}</pre>
    <p>Base on element plus</p>
    <ele-dynamic-input v-model="test3"
                       :dy-list-configs="{arraySplitSymbol:'-'}"
    />
    <pre>{{ test3 }}</pre>
  </div>
</template>

```