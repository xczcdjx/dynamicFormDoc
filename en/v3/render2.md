# Render2

A render function. You can either write your own `h()` render function, or use the helper functions provided in `renderForm.ts`.

### Signature

```ts
function render2(formItem: DyFormItem): VNode
```

## Custom `h()`

```ts
const r = [
    {
        key: "username",
        label: "Name",
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

## Using `renderXxx` provided by `renderForm`
> Currently available: "renderInput"| "renderSelect"| "renderPopSelect"| "renderTreeSelect"| "
renderRadioGroup"| "renderRadioButtonGroup"| "renderCheckboxGroup"| "renderSwitch"| "renderDatePicker"| "
renderTimePicker"
```ts
const r = [
    {
        key: "username",
        label: "Name",
        value: ref<string | null>(null),
        render2: f => renderInput(f.value, {}, f),
    },
    {
        key: "job",
        label: "Role",
        value: ref<number | null>(null),
        options: ['Frontend', 'Backend'].map((label, value) => ({label, value})),
        render2: f => renderSelect(f.value, [], {}, f),
    }
]
```
> The last argument of renderXxx is the current item f. The helper will merge simplified item props such as placeholder, filterable, clearable, disabled, etc.
### Related to select / radio / checkbox
> `renderSelect`,`renderPopSelect`,`renderTreeSelect`,`renderRadioGroup`,`renderRadioButtonGroup`,`renderCheckboxGroup`,all take `options` as the second argument.

```ts
const opts = Array.from({length: 5}).map((_, i) => `job_${i + 1}`)
const r = [
    {
        key: "job",
        label: "Role",
        value: ref<number | null>(null),
        // All three ways below can provide options:
        /*options: opts,
        render2: f => renderSelect(f.value, [], {}, f),*/
        // render2: f => renderSelect(f.value, opts, {}, f),
        render2: f => renderSelect(f.value, [], {options: opts}, f)
    }
]
```
> 1.You can provide options via the item’s options, via the second parameter of renderXxx, or via the third parameter optionProps.

> 2.Priority: function arguments < item.options < optionProps

**More simplified render helpers will be added in future updates.**