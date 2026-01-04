# Render2

渲染函数，可自定义写`h`函数或使用提供`renderForm.ts`的函数

### 签名

```ts
function render2(formItem: DyFormItem): VNode
```

## 自定义`h()`

```ts
const r = [
    {
        key: "username",
        label: "姓名",
        value: ref<string | null>(null),
        render2: f => h(NInput, {
            ...f,
            value: f.value.value, "onUpdate:value"(v) {
                f.value.value = v
            }
        })
    }
]
```

## 使用renderForm提供的`renderXxx`
> 目前提供有 "renderInput"| "renderSelect"| "renderPopSelect"| "renderTreeSelect"| "
renderRadioGroup"| "renderRadioButtonGroup"| "renderCheckboxGroup"| "renderSwitch"| "renderDatePicker"| "
renderTimePicker"
```ts
const r = [
    {
        key: "username",
        label: "姓名",
        value: ref<string | null>(null),
        render2: f => renderInput(f.value, {}, f),
    },
    {
        key: "job",
        label: "职位",
        value: ref<number | null>(null),
        options: ['前端', '后端'].map((label, value) => ({label, value})),
        render2: f => renderSelect(f.value, [], {}, f),
    }
]
```
> 其中renderXxx最后一个参数传入当前渲染项f,会组合渲染项的简化内容，例如placeholder,filterable,clearable,disabled等
### 与下拉框，单选，复选框相关
> 其中有 `renderSelect`,`renderPopSelect`,`renderTreeSelect`,`renderRadioGroup`,`renderRadioButtonGroup`,`renderCheckboxGroup`,都包含options,皆为renderXxx第二个参数传递

```ts
const opts = Array.from({length: 5}).map((_, i) => `job_${i + 1}`)
const r = [
    {
        key: "job",
        label: "职位",
        value: ref<number | null>(null),
        // 下面三种用法提供options均可
        /*options: opts,
        render2: f => renderSelect(f.value, [], {}, f),*/
        // render2: f => renderSelect(f.value, opts, {}, f),
        render2: f => renderSelect(f.value, [], {options: opts}, f)
    }
]
```
> 1.其中options 你在 item项含options的可传入，renderXxx第二个参数也可传入，第三个optionProps也可传入

> 2.优先级，函数传参 < item的options < optionProps

**更多简化render函数等待后续更新**