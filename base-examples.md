---
outline: deep
---

# DynamicForm
hello

## 基本使用

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
  <p>效果</p>
  <DynamicForm v-model="test" ref="dyRef" is-controller/>
  <p>结果</p>
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

| 属性名        | 说明                                                  | 类型        | 默认值                                                                                             | 必填 |
| ------------ |-----------------------------------------------------| ----------- | -------------------------------------------------------------------------------------------------- | ---- |
| size         | 定义表单和按钮大小，可选值：`small` / `large` / `default`         | `string`    | `"default"`                                                                                        | 否   |
| isController | 受控属性                                                | `boolean`   | —                                                                                                  | 否   |
| dyCls        | 动态表单容器的自定义 CSS 类名                                   | `string`    | —                                                                                                  | 否   |
| randomFun    | 生成每个动态表单项唯一 ID 的函数                                  | `Function`  | `(i?: number) => \`\${Date.now()}_\${i ?? 0}\``                                                    | 否   |
| btnConfigs   | 按钮文案配置（重置 / 新增 / 合并）                                | `object`    | `{ resetTxt: "重置", newTxt: "添加项", mergeTxt: "合并" }`                                         | 否   |
| configs      | 表单行为配置，如最大高度、滚动行为、是否允许筛选等                           | `object`    | `{ hideReset: false, maxHeight: "300px", autoScroll: true, allowFilter: true }`                   | 否   |
| dyListConfigs| 动态列表项配置，例如数组分隔符等                                    | `object`    | `{ arraySplitSymbol: "," }`                                                                       | 否   |
| modelValue   | 绑定到表单的模型值，父组件传入并与表单同步（支持 `v-model` / `model-value`） | `object`    | —                                                                                                  | ✅   |


### Emits

| 事件名                 | 说明                       | 回调参数                                 |
| ------------------- | ------------------------ | ------------------------------------ |
| `update:modelValue` | 当表单值变化时触发，返回新的模型值        | `(value: object)`                    |
| `onReset`           | 当用户点击重置时触发               | —                                    |
| `onMerge`           | 当表单数据合并时触发，返回合并后的数据和原始数据 | `(merged: object, origin: object[])` |


### Expose
| 方法名                    | 参数说明                                             | 返回值                | 描述         |
| ---------------------- | ------------------------------------------------ | ------------------ | ---------- |
| `onSet(o?: object)`    | `o = object` → 设置新表单数据<br>`o = undefined` → 重置表单 | `void`             | 设置或重置表单数据  |
| `getResult(t = 'res')` | `t = 'res'` → 获取当前最终结果<br>`t = 'ori'` → 获取渲染时数组  | `object` / `array` | 获取表单内部数据结构 |

