# Render2

A render function that allows you to write a custom `tsx` function or use the functions provided in `renderForm.ts`.

### Signature

```ts
function render2(formItem: DyFormItem): ReactNode
```

## Custom tsx

```tsx
const r = [
  {
    key: "username",
    label: "Username",
    value: null,
    render2: (f) => <Input placeholder="Please enter your name" {...OmitValue(f, omitFormCommonKey)} />,
  }
]
```

## Using `renderXxx` provided by renderForm

> Currently available:
> `"renderInput" | "renderSelect" | "renderPopSelect" | "renderTreeSelect" | "renderRadioGroup" | "renderRadioButtonGroup" | "renderCheckboxGroup" | "renderSwitch" | "renderDatePicker" | "renderTimePicker" | "renderCheckbox" | "renderDynamicTags" | "renderSlider" | "renderInputNumber"`

```ts
const r = [
  {
    key: "username",
    label: "Name",
    value: null,
    render2: f => renderInput({}, f),
  },
  {
    key: "job",
    label: "Position",
    value: null,
    options: ['Frontend', 'Backend'].map((label, value) => ({ label, value })),
    render2: f => renderSelect([], {}, f),
  }
]
```

> In `renderXxx`, the last parameter is the current rendered item `f`. It will merge simplified properties from the item, such as `placeholder`, `showSearch`, `allowClear`, `disabled`, and so on.

### Related to dropdowns, radio buttons, and checkboxes

> The following functions all support `options`, which are passed as the second parameter of `renderXxx`:
> `renderSelect`, `renderPopSelect`, `renderTreeSelect`, `renderRadioGroup`, `renderRadioButtonGroup`, `renderCheckboxGroup`

```ts
const opts = Array.from({ length: 5 }).map((_, i) => `job_${i + 1}`)
const r = [
  {
    key: "job",
    label: "Position",
    value: null,
    // All three usages below can provide options
    /*options: opts,
    render2: f => renderSelect([], {}, f),*/
    // render2: f => renderSelect(opts, {}, f),
    render2: f => renderSelect([], { options: opts }, f)
  }
]
```

> 1. For `options`, you can pass them in the item itself if the item supports `options`, or pass them as the second parameter of `renderXxx`, or pass them in the third `optionProps` parameter.

> 2. Priority: function arguments < item `options` < `optionProps`

**More simplified render functions will be added in future updates.**
