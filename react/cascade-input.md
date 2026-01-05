---
outline: deep
---

# DynamicCascadeInput

级联动态录入

## 基本使用

```tsx
import {useState} from "react";
import {DynamicCascadeInput, dynamicCascadeInputRef} from "dynamicformdjx-react";

const App = () => {
    const [obj, setObj] = useState<Record<string, any>>({
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
    const dynamicInputRef = useRef<dynamicCascadeInputRef>(null)
    return (<div>
        <DynamicCascadeInput ref={dynamicInputRef} isController value={obj} onChange={(e) => setObj(e)}/>
        <pre>
            {JSON.stringify(obj, null, 2)}
        </pre>
        <div>
            <button onClick={() => {
                dynamicInputRef.current?.onSet?.({
                    test: 'hello world'
                })
            }}>setData
            </button>
        </div>
    </div>)
}
export default App;
```

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