---
outline: deep
---

# DynamicCascadeInput

级联动态录入

## 基本使用

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

## 插槽使用

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

| 属性名           | 说明                                                  | 类型         | 默认值                                                                                                                          | 必填 |
|---------------|-----------------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------------------|----|
| depth         | 子层深度                                                | `number`   | 3                                                                                                                            | 否  |
| isController  | 受控属性                                                | `boolean`  | —                                                                                                                            | 否  |
| dyCls         | 动态表单容器的自定义 CSS 类名                                   | `string`   | —                                                                                                                            | 否  |
| randomFun     | 生成每个动态表单项唯一 ID 的函数                                  | `Function` | `(i?: number) => \`\${Date.now()}_\${i ?? 0}\``                                                                              | 否  |
| newChildTxt   | 新增child函数                                           | `Function` | `(it: DyCasFormItem) => \`\`添加 '${it.key}' 子项`\``                                                                            | 否  |
| btnConfigs    | 按钮文案配置（重置 / 新增 / 合并）                                | `object`   | `{ resetTxt: "重置", newTxt: "添加项", mergeTxt: "合并" }`                                                                          | 否  |
| configs       | 表单行为配置，如最大高度、是否允许筛选等                                | `object`   | `{ hideReset: false, maxHeight: "600px", allowFilter: true,showBorder: true,showPad: true,retractLen: 0,borderColors: [], }` | 否  |
| dyListConfigs | 动态列表项配置，例如数组分隔符等                                    | `object`   | `{ arraySplitSymbol: "," }`                                                                                                  | 否  |
| modelValue    | 绑定到表单的模型值，父组件传入并与表单同步（支持 `v-model` / `model-value`） | `object`   | —                                                                                                                            | ✅  |

### Emits

| 事件名                 | 说明                       | 回调参数                                 |
|---------------------|--------------------------|--------------------------------------|
| `update:modelValue` | 当表单值变化时触发，返回新的模型值        | `(value: object)`                    |
| `onReset`           | 当用户点击重置时触发               | —                                    |
| `onMerge`           | 当表单数据合并时触发，返回合并后的数据和原始数据 | `(merged: object, origin: object[])` |

### Expose

| 方法名                    | 参数说明                                             | 返回值                | 描述         |
|------------------------|--------------------------------------------------|--------------------|------------|
| `onSet(o?: object)`    | `o = object` → 设置新表单数据<br>`o = undefined` → 重置表单 | `void`             | 设置或重置表单数据  |
| `getResult(t = 'res')` | `t = 'res'` → 获取当前最终结果<br>`t = 'ori'` → 获取渲染时数组  | `object` / `array` | 获取表单内部数据结构 |

### Slots

- 所有插槽均为 具名插槽，在 TSX 中通过 `v-slots` 传入。
- 插槽函数返回 `VNode[]`。

#### 类型

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
    addChild: () => void
}
```

#### 插槽列表

| 插槽名          | 参数            | 参数类型                      | 描述                                                                             |
|--------------|---------------|---------------------------|--------------------------------------------------------------------------------|
| `newBtn`     | `{ newItem }` | `{ newItem: () => void }` | 自定义「新增按钮」区域。调用 `newItem()` 触发新增一行。                                             |
| `resetBtn`   | `{ reset }`   | `{ reset: () => void }`   | 自定义「重置按钮」区域。调用 `reset()` 重置数据。                                                 |
| `mergeBtn`   | `{ merge }`   | `{ merge: () => void }`   | 自定义「合并按钮」区域。调用 `merge()` 执行合并逻辑。                                               |
| `typeTools`  | `scope`       | `CasScopeType`            | 自定义每一行的类型工具区（如 Array/Number 切换）。可使用 `toggleArray()` / `toggleNumber()` 等。      |
| `rowActions` | `scope`       | `CasScopeType`            | 自定义每一行的操作区（如 + / -）。可使用 `addItem()` / `removeItem()`，并通过 `isLast` 控制最后一行才能新增等。 |
| `newChild`   | `scope`       | `CasScopeType`            | 自定义每一行子层的新增区。可使用 `addChild()`，次插槽优先级高于`props`的`newChildTxt`                    |

## Extra Use

如果你项目使用了[Naive Ui](https://www.naiveui.com)或 [Element Plus](https://element-plus.org/),可使用下方导入

```vue

<script setup lang="ts">
  // 依赖于naive-ui
  import {NaiDynamicCascadeInput} from "dynamicformdjx/naiveUi";
  // 依赖于element-plus
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