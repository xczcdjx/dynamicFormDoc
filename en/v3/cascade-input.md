---
outline: deep
---

# DynamicCascadeInput

Cascade Dynamic Input

## Use

<DemoBlock>
  <template #code>

::: code-group

```vue [TypeScript]

<script setup lang="ts">
  import {ref} from 'vue'
  import {DynamicCascadeInput, type dynamicCascadeInputRef} from 'dynamicformdjx'

  const test = ref({
    a: {
      b: {
        c: {
          d: {
            e: "hello world"
          }
        }
      }
    },
    aa: [5, 2, 0],
    aaa: 1314
  })

  const dyRef = ref<dynamicCascadeInputRef | null>(null)

  const setData = () => {
    dyRef.value?.onSet({test: 'helloWorld'})
  }
</script>

<template>
  <p>Base</p>
  <DynamicCascadeInput v-model="test" ref="dyRef" is-controller/>
  <pre>{{ test }}</pre>
  <div>
    <button @click="setData">setData</button>
  </div>
</template>
```

```vue [JavaScript]

<script setup>
  import {ref} from 'vue'
  import {DynamicCascadeInput} from 'dynamicformdjx'

  const test = ref({
    a: {
      b: {
        c: {
          d: {
            e: "hello world"
          }
        }
      }
    },
    aa: [5, 2, 0],
    aaa: 1314
  })

  const dyRef = ref(null)

  const setData = () => {
    dyRef.value?.onSet({test: 'helloWorld'})
  }
</script>

<template>
  <p>Base</p>
  <DynamicCascadeInput v-model="test" ref="dyRef" is-controller/>
  <pre>{{ test }}</pre>
  <div>
    <button @click="setData">setData</button>
  </div>
</template>
```

:::

  </template>

<CascadeInput/>
</DemoBlock>

## Slots Use

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
    <template #newChild="{addChild,row}">
      <button @click="addChild">+{{ row.key }}+</button>
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
<CascadeSlotInput/>
</DemoBlock>

## API

### Props

| Name          | Description                                                                      | Type       | Default                                                                                                                         | Required |
|---------------|----------------------------------------------------------------------------------|------------|---------------------------------------------------------------------------------------------------------------------------------|----------|
| depth         | Maximum allowed nested depth for children                                        | `number`   | `3`                                                                                                                             | No       |
| isController  | Controlled mode flag                                                             | `boolean`  | —                                                                                                                               | No       |
| dyCls         | Custom CSS class name for the form container                                     | `string`   | —                                                                                                                               | No       |
| randomFun     | Function to generate a unique ID for each dynamic form item                      | `Function` | `(i?: number) => \`${Date.now()}_${i ?? 0}``                                                                                    | No       |
| newChildTxt   | Function used to generate the text for "add child" button                        | `Function` | `(it: DyCasFormItem) => \`Add child to '${it.key}'``                                                                            | No       |
| btnConfigs    | Button text configuration (reset / add item / merge)                             | `object`   | `{ resetTxt: "Reset", newTxt: "Add Item", mergeTxt: "Merge" }`                                                                  | No       |
| configs       | Behavior configuration for the form, including border color, UI appearance, etc. | `object`   | `{ hideReset: false, maxHeight: "600px", allowFilter: true, showBorder: true, showPad: true, retractLen: 0, borderColors: [] }` | No       |
| dyListConfigs | Dynamic list configuration (e.g., array join symbol)                             | `object`   | `{ arraySplitSymbol: "," }`                                                                                                     | No       |
| modelValue    | The bound value of the form (`v-model` / `model-value`)                          | `object`   | —                                                                                                                               | ✅ Yes    |

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
type CasScopeType = {
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
| `typeTools`  | `scope`       | `CasScopeType`            | Customize the per-row **type tools** section (e.g. Array/Number toggles). You can use `toggleArray()` / `toggleNumber()` etc.                          |
| `rowActions` | `scope`       | `CasScopeType`            | Customize the per-row **actions** section (e.g. + / -). You can use `addItem()` / `removeItem()`, and use `isLast` to restrict adding to the last row. |
| `newChild`   | `scope`       | `CasScopeType`            | Custom “add new child” area for each row’s child level. You can call `addChild()`. This slot takes priority over the `newChildTxt` prop.               |

## Extra Usage

If your project is using either Naive UI or Element Plus , you can import the corresponding integration components as
shown below:

```vue

<script setup lang="ts">
  // For Naive UI integration
  import {NaiDynamicCascadeInput} from "dynamicformdjx/naiveUi";
  // For Element Plus integration
  import {EleDynamicCascadeInput} from "dynamicformdjx/elementPlus";

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
    <nai-dynamic-cascade-input v-model="test2"
                               is-controller
    />
    <pre>{{ test2 }}</pre>
    <p>Base on element plus</p>
    <ele-dynamic-cascade-input v-model="test3"
                               :dy-list-configs="{arraySplitSymbol:'-'}"
    />
    <pre>{{ test3 }}</pre>
  </div>
</template>

```