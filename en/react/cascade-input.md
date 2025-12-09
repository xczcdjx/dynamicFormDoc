---
outline: deep
---

# DynamicCascadeInput
hello world


## Basic Usage
```tsx
import {useState} from "react";
import {DynamicCascadeInput,dynamicCascadeInputRef} from "dynamicformdjx-react";
const App=()=>{
    const [obj,setObj]=useState<Record<string, any>>({
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
    });
    const dynamicInputRef=useRef<dynamicCascadeInputRef>(null)
    return (<div>
        <DynamicCascadeInput ref={dynamicInputRef} isController value={obj} onChange={(e) => setObj(e)}/>
        <pre>
            {JSON.stringify(obj,null, 2)}
        </pre>
        <div>
            <button onClick={() => {
                dynamicInputRef.current?.onSet?.({
                    test:'hello world'
                })
            }}>setData
            </button>
        </div>
    </div>)
}
export default App;
```

## API

> Prop definitions and exposed methods are consistent with the Vue 3 version

> Only value and onChange are required. Other parameters remain the same.

### Props

| Name  | Description                                                                                    | Type     | Default | Required |
| ----- | ---------------------------------------------------------------------------------------------- | -------- | ------- | -------- |
| value | The form model value passed from the parent component and kept in sync (replaces `modelValue`) | `object` | -       | ✅        |

[Go to v3 Props](/v3/single-input#props)

### Function
| Name       | Description                                                                                           | Callback Params   | Required |
| ---------- | ----------------------------------------------------------------------------------------------------- | ----------------- | -------- |
| `onChange` | Triggered when the form value changes, returns the updated model value (replaces `update:modelValue`) | `(value: object)` | ✅        |

[Go to v3 Emits](/v3/single-input.html#emits)

### Ref

[Go to v3 Expose](/v3/single-input.html#expose)


[//]: # (## Extra Use)