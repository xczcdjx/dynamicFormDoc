---
outline: deep
---

# DynamicInput

动态录入

## 基本使用
<BlockOther pathUrl="/testPackage-react" isOpen>
<template #default="{dl}">
<PreviewBlock v-bind="dl" mh="420px"/>
</template>
<template #code>

::: code-group

```tsx
import {useState, useRef} from "react";
import {DynamicInput, dynamicFormRef} from "dynamicformdjx-react";

function App() {
    const [obj, setObj] = useState<Record<string, any>>({
        a: 'Hello world',
        b: 1314,
        c: [5, 2, 0]
    });
    const dynamicInputRef = useRef<dynamicFormRef>(null)
    return (<div>
        <DynamicInput ref={dynamicInputRef} isController value={obj} onChange={(e) => setObj(e)}/>
        <pre>
            {JSON.stringify(obj, null, 2)}
        </pre>
        <div>
            <button onClick={() => {
                dynamicInputRef.current?.onSet?.({
                    test: 'hello World'
                })
            }}>setData
            </button>
        </div>
    </div>)
}

export default App
```

```jsx
import {useState, useRef} from "react";
import {DynamicInput} from "dynamicformdjx-react";

function App() {
    const [obj, setObj] = useState({
        a: "Hello world",
        b: 1314,
        c: [5, 2, 0],
    });
    const dynamicInputRef = useRef(null)
    return (<div>
        <DynamicInput ref={dynamicInputRef} isController value={obj} onChange={(e) => setObj(e)}/>
        <pre>
            {JSON.stringify(obj, null, 2)}
        </pre>
        <div>
            <button onClick={() => {
                dynamicInputRef.current?.onSet?.({
                    test: 'hello World'
                })
            }}>setData
            </button>
        </div>
    </div>)
}

export default App;
```

:::

</template>
</BlockOther>


## 插槽使用

::: code-group

```tsx
import {DynamicInput} from "dynamicformdjx-react";
import type {dynamicInputRef} from "dynamicformdjx-react";
import {useRef, useState, type CSSProperties} from "react";

const ActBtnCls: Record<string, CSSProperties> = {
    array: {
        color: 'red'
    },
    number: {
        color: 'blue'
    }
}

function App() {
    const [obj, setObj] = useState<Record<string, any>>({
        a: 'Hello world',
        b: 1314,
        c: [5, 2, 0]
    });
    const dynamicInputRef = useRef<dynamicInputRef>(null)
    return (<div>
        <DynamicInput ref={dynamicInputRef} value={obj} onChange={(e) => setObj(e)}
                      isController
                      newBtn={({newItem}) => <button onClick={newItem}>新</button>}
                      resetBtn={({reset}) => <button onClick={reset}>重</button>}
                      mergeBtn={({merge}) => <button onClick={merge}>合</button>}
                      typeTools={({toggleArray, toggleNumber, row}) => <>
                          <button onClick={toggleArray} style={row.isArray ? ActBtnCls.array : undefined}>array</button>
                          <button onClick={toggleNumber}
                                  style={row.isNumber ? ActBtnCls.number : undefined}>number
                          </button>
                      </>}
                      rowActions={({isLast, addItem, removeItem}) => <>
                          <button onClick={addItem} disabled={!isLast}>+</button>
                          <button onClick={removeItem} disabled={!isLast}>-</button>
                      </>}
        />
        <pre>
            {JSON.stringify(obj, null, 2)}
        </pre>
        <div>
            <button onClick={() => {
                dynamicInputRef.current?.onSet?.({
                    test: 'hello World'
                })
            }}>setData
            </button>
        </div>
    </div>)
}

export default App
```

```jsx
import {DynamicInput} from "dynamicformdjx-react";
import {useRef, useState} from "react";

const ActBtnCls = {
    array: {
        color: 'red'
    },
    number: {
        color: 'blue'
    }
}

function App() {
    const [obj, setObj] = useState({
        a: 'Hello world',
        b: 1314,
        c: [5, 2, 0]
    });
    const dynamicInputRef = useRef(null)
    return (<div>
        <DynamicInput ref={dynamicInputRef} value={obj} onChange={(e) => setObj(e)}
                      isController
                      newBtn={({newItem}) => <button onClick={newItem}>新</button>}
                      resetBtn={({reset}) => <button onClick={reset}>重</button>}
                      mergeBtn={({merge}) => <button onClick={merge}>合</button>}
                      typeTools={({toggleArray, toggleNumber, row}) => <>
                          <button onClick={toggleArray} style={row.isArray ? ActBtnCls.array : undefined}>array</button>
                          <button onClick={toggleNumber}
                                  style={row.isNumber ? ActBtnCls.number : undefined}>number
                          </button>
                      </>}
                      rowActions={({isLast, addItem, removeItem}) => <>
                          <button onClick={addItem} disabled={!isLast}>+</button>
                          <button onClick={removeItem} disabled={!isLast}>-</button>
                      </>}
        />
        <pre>
            {JSON.stringify(obj, null, 2)}
        </pre>
        <div>
            <button onClick={() => {
                dynamicInputRef.current?.onSet?.({
                    test: 'hello World'
                })
            }}>setData
            </button>
        </div>
    </div>)
}

export default App
```

:::

## API

> 属性及方法参数与vue3版本一致

> 除value属性及onChange方法为必传，其他参数一致

### Props

| 属性名   | 说明                                   | 类型       | 默认值 | 必填 |
|-------|--------------------------------------|----------|-----|----|
| value | 绑定到表单的模型值，父组件传入并与表单同步 (代替modelValue) | `object` | -   | ✅  |

[跳到 v3 Props](../v3/single-input#props)

### Function

| 事件名        | 说明                                      | 回调参数              | 必填 |
|------------|-----------------------------------------|-------------------|----|
| `onChange` | 当表单值变化时触发，返回新的模型值 (代替update:modelValue) | `(value: object)` | ✅  |

[跳到 v3 Emits](../v3/single-input.html#emits)

### Ref

[跳到 v3 Expose](../v3/single-input.html#expose)

[//]: # (## Extra Use)

### Slots (Function)

- 回调方法，类似vue插槽。

#### 类型

[跳到 v3 Slots 类型](../v3/single-input.html#类型)

#### 插槽列表

[跳到 v3 Slots 插槽列表](../v3/single-input.html#插槽列表)