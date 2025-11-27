---
outline: deep
---

# CascadeDynamicForm
hello world

## Use

<script setup lang="ts">
import { ref } from 'vue'
import { DynamicCascadeForm, type dynamicCascadeFormRef } from 'dynamicformdjx'

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

const dyRef = ref<dynamicCascadeFormRef | null>(null)

const setData = () => {
  dyRef.value?.onSet({ test: 'helloWorld' })
}
</script>

<DemoBlock>
  <template #code>

::: code-group

```vue [TypeScript]
<script setup lang="ts">
import { ref } from 'vue'
import { DynamicCascadeForm, type dynamicCascadeFormRef } from 'dynamicformdjx'

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

const dyRef = ref<dynamicCascadeFormRef | null>(null)

const setData = () => {
    dyRef.value?.onSet({ test: 'helloWorld' })
  }
</script>

<template>
  <p>Base</p>
  <DynamicCascadeForm v-model="test" ref="dyRef" is-controller/>
  <pre>{{ test }}</pre>
  <div>
    <button @click="setData">setData</button>
  </div>
</template>
```

```vue [JavaScript]
<script setup>
import { ref } from 'vue'
import { DynamicCascadeForm } from 'dynamicformdjx'

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
  dyRef.value?.onSet({ test: 'helloWorld' })
}
</script>

<template>
  <p>Base</p>
  <DynamicCascadeForm v-model="test" ref="dyRef" is-controller/>
  <pre>{{ test }}</pre>
  <div>
    <button @click="setData">setData</button>
  </div>
</template>
```

:::

  </template>

  <!-- 下面是实际效果 -->
  <p>Effect</p>
  <DynamicCascadeForm v-model="test" ref="dyRef" is-controller/>
  <p>Result</p>
  <pre>{{ test }}</pre>
  <div>
    <button class="rBt" @click="setData">setData {test:"helloWorld"}</button>
  </div>

</DemoBlock>

<style scope>
.rBt{
  border-radius: 3px;
  border: 1px solid var(--vp-c-divider);
  padding: 5px 20px;
}
</style>

## API
### Props

| Name          | Description                                                                      | Type       | Default                                                                                                                         | Required |
| ------------- |----------------------------------------------------------------------------------| ---------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- |
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
| ------------------- | ------------------------------- | ------------------------------------ |
| `update:modelValue` | Emitted when form value changes | `(value: object)`                    |
| `onReset`           | Emitted when the form is reset  | —                                    |
| `onMerge`           | Emitted when data is merged     | `(merged: object, origin: object[])` |


### Expose
| Method                 | Arguments                                                             | Returns            | Description                 |
| ---------------------- | --------------------------------------------------------------------- | ------------------ | --------------------------- |
| `onSet(o?: object)`    | `o = object` → set new form data<br>`o = undefined` → reset form      | `void`             | Set or reset form data      |
| `getResult(t = 'res')` | `t = 'res'` → get rendered result<br>`t = 'ori'` → get original array | `object` / `array` | Get current form data state |


## Extra Use

If your project is using either Naive UI or Element Plus , you can import the corresponding integration components as shown below:
```vue
<script setup lang="ts">
// For Naive UI integration
import {NaiveUiDynamicCascadeForm} from "dynamicformdjx/naiveUi";
// For Element Plus integration
import {ElementPlusDynamicCascadeForm} from "dynamicformdjx/elementPlus";
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
    <naive-ui-dynamic-cascade-form v-model="test2"
                           is-controller
    />
    <pre>{{ test2 }}</pre>
    <p>Base on element plus</p>
    <element-plus-dynamic-cascade-form v-model="test3"
                               :dy-list-configs="{arraySplitSymbol:'-'}"
    />
    <pre>{{ test3 }}</pre>
  </div>
</template>

```