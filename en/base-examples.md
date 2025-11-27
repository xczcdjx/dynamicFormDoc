---
outline: deep
---

# DynamicForm
hello

## Use

<script setup lang="ts">
import { ref } from 'vue'
import { DynamicForm, type dynamicFormRef } from 'dynamicformdjx'

const test = ref<{ a: string; b: number; c: number[] }>({
  a: 'Hello world',
  b: 1314,
  c: [5, 2, 0]
})

const dyRef = ref<dynamicFormRef | null>(null)

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
import { DynamicForm, type dynamicFormRef } from 'dynamicformdjx'

const test = ref<{ a: string; b: number; c: number[] }>({
  a: 'Hello world',
  b: 1314,
  c: [5, 2, 0]
})

const dyRef = ref<dynamicFormRef | null>(null)

const setData = () => {
  dyRef.value?.onSet({ test: 'helloWorld' })
}
</script>

<template>
  <p>Base</p>
  <DynamicForm v-model="test" ref="dyRef" />
  <pre>{{ test }}</pre>
  <div>
    <button @click="setData">setData</button>
  </div>
</template>
```

```vue [JavaScript]
<script setup>
import { ref } from 'vue'
import { DynamicForm } from 'dynamicformdjx'

const test = ref({
  a: 'Hello world',
  b: 1314,
  c: [5, 2, 0]
})

const dyRef = ref(null)

const setData = () => {
  dyRef.value?.onSet({ test: 'helloWorld' })
}
</script>

<template>
  <p>Base</p>
  <DynamicForm v-model="test" ref="dyRef" />
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
  <DynamicForm v-model="test" ref="dyRef" is-controller/>
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

| Name          | Description                                                     | Type       | Default                                                                         | Required |
| ------------- | --------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------- | -------- |
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
| ------------------- | ------------------------------- | ------------------------------------ |
| `update:modelValue` | Emitted when form value changes | `(value: object)`                    |
| `onReset`           | Emitted when the form is reset  | —                                    |
| `onMerge`           | Emitted when data is merged     | `(merged: object, origin: object[])` |


### Expose
| Method                 | Arguments                                                             | Returns            | Description                 |
| ---------------------- | --------------------------------------------------------------------- | ------------------ | --------------------------- |
| `onSet(o?: object)`    | `o = object` → set new form data<br>`o = undefined` → reset form      | `void`             | Set or reset form data      |
| `getResult(t = 'res')` | `t = 'res'` → get rendered result<br>`t = 'ori'` → get original array | `object` / `array` | Get current form data state |

## Extra Usage
If your project is using either Naive UI or Element Plus , you can import the corresponding integration components as shown below:
```vue
<script setup lang="ts">
import { ref } from "vue";

// For Naive UI integration
import { NaiveUiDynamicForm } from "dynamicformdjx/naiveUi";

// For Element Plus integration
import { ElementPlusDynamicForm } from "dynamicformdjx/elementPlus";

const test2 = ref<{ d: number[] }>({
  d: [6, 6, 6]
});

const test3 = ref<{ e: string }>({
  e: "victory"
});
</script>

<template>
  <div>
    <p>Based on Naive UI</p>
    <naive-ui-dynamic-form
      v-model="test2"
      is-controller
    />
    <pre>{{ test2 }}</pre>

    <p>Based on Element Plus</p>
    <element-plus-dynamic-form
      v-model="test3"
      :dy-list-configs="{ arraySplitSymbol: '-' }"
    />
    <pre>{{ test3 }}</pre>
  </div>
</template>

```