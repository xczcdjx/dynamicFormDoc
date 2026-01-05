---
outline: deep
---

# DynamicCascadeInput
级联动态录入


## 基本使用

```vue [JavaScript]
<script>
  import {DynamicCascadeInput} from "dynamicformdjx-vue2";

  export default {
    name: "App",
    components: {DynamicCascadeInput},
    data(){
      return {
        dyRef:null,
        obj: {
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
        },
      }
    },
    methods: {
      setData(){
        this.$refs.dyRef.onSet({test: "helloWorld"})
      }
    }
  }
</script>

<template>
  <div>
    <DynamicCascadeInput v-model="obj" ref="dyRef" is-controller/>
    <pre>{{JSON.stringify(obj,null,2)}}</pre>
    <button @click="setData">setData helloWorld</button>
  </div>
</template>
```

## 运行 Demo
<ClientOnly>
<PreviewBlock url="https://5trqc7-6004.csb.app/#/input-cascade"/>
</ClientOnly>

## API
>  (属性及方法参数与vue3版本一致)
### Props
[跳到 v3 Props](../v3/cascade-input#props)

### Emits
[跳到 v3 Emits](../v3/cascade-input.html#emits)

### Expose
[跳到 v3 Expose](../v3/cascade-input.html#expose)

[//]: # (## Extra Use)