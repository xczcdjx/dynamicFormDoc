---
outline: deep
---

# DynamicInput

Dynamic Input

## Basic Usage

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

## API

> Prop definitions and exposed methods are consistent with the Vue 3 version

> Only value and onChange are required. Other parameters remain the same.

### Props

| Name  | Description                                                                                    | Type     | Default | Required |
|-------|------------------------------------------------------------------------------------------------|----------|---------|----------|
| value | The form model value passed from the parent component and kept in sync (replaces `modelValue`) | `object` | -       | ✅        |

[Go to v3 Props](/en/v3/single-input#props)

### Function

| Name       | Description                                                                                           | Callback Params   | Required |
|------------|-------------------------------------------------------------------------------------------------------|-------------------|----------|
| `onChange` | Triggered when the form value changes, returns the updated model value (replaces `update:modelValue`) | `(value: object)` | ✅        |

[Go to v3 Emits](/en/v3/single-input.html#emits)

### Ref

[Go to v3 Expose](/en/v3/single-input.html#expose)

[//]: # (## Extra Use)

### Slots (Function)

- Callback method, similar to Vue slots.

#### Types

[Go to v3 Slots types](../v3/single-input.html#types)

#### Slot lists

[Go v3 Slots lists](../v3/single-input.html#slot-list)
