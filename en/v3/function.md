---
outline: deep
---

# Function
> global export function


This module provides a set of helpers for transforming form-like objects into editable row data, restoring them back to
plain objects, parsing/formatting numeric input (including array values), generating safe colors for nested depth UI,
normalizing values into Vue refs, and omitting `value` (and additional keys) from a `DyFormItem`.

---

## `tranArr(obj, arrayFun, splitSymbol)`

Transform a plain object into an array of `DyCFormItem` rows.

- Each object key becomes a row item.
- Detects whether the original value is an array (`isArray`) and whether it represents numbers (`isNumber`).
- If the original value is an array, it will be stringified by joining with `splitSymbol`.

**Signature**

- `tranArr(obj: ValueType, arrayFun: DyRandomFun, splitSymbol: string): DyCFormItem[]`

**Parameters**

- `obj`: Source object to transform.
- `arrayFun`: Random/id generator function used to produce `rId` (usually stable per index).
- `splitSymbol`: Separator used when converting arrays to string.

**Returns**

- An array of `DyCFormItem`.

**Example**

```ts
const obj = {a: 1, b: [1, 2, 3], c: ["x", "y"]}
const rows = tranArr(obj, (i) => `id-${i}`, ",")
// rows: [
//   { rId:'id-0', key:'a', value:1, isNumber:true },
//   { rId:'id-1', key:'b', value:'1,2,3', isArray:true, isNumber:true },
//   { rId:'id-2', key:'c', value:'x,y', isArray:true }
// ]
```

---

## `resetObj(arr, splitSymbol)`

Restore an array of `DyCFormItem` rows back into a plain object.

* Skips rows whose `key` is empty/whitespace.
* Uses `parseValue` to restore types based on `isArray` and `isNumber`.

**Signature**

* `resetObj(arr: DyCFormItem[], splitSymbol: string): ValueType`

**Parameters**

* `arr`: Array of form row items.
* `splitSymbol`: Separator used to parse array strings back into arrays.

**Returns**

* Restored object of type `ValueType`.

**Example**

```ts
const obj = resetObj(rows, ",")
```

---

## `parseValue(value, isArray?, isNumber?, splitSym?)`

Parse a string input into the desired output type.

Rules:

* If `isArray` is `true`:

    * Split the string by `splitSym`.
    * If `isNumber` is also `true`, convert each item to number and drop `NaN`.
* If `isArray` is `false`:

    * If `isNumber` is `true`, parse via `parseFloat`.
    * Otherwise return a string.

**Signature**

* `parseValue(value: string, isArray?: boolean, isNumber?: boolean, splitSym: string = ','): any`

**Parameters**

* `value`: Raw input string.
* `isArray`: Whether the expected output is an array.
* `isNumber`: Whether the expected output should be number(s).
* `splitSym`: Array split separator (default: `","`).

**Returns**

* Parsed value (string | number | string[] | number[]).

**Example**

```ts
parseValue("1,2,3", true, true, ",")   // [1, 2, 3]
parseValue("a,b", true, false, ",")    // ["a", "b"]
parseValue("3.14", false, true)        // 3.14
parseValue("hello", false, false)      // "hello"
```

---

## `formatNumberInput(val, isArray?, splitSymbol?)`

Sanitize numeric input to only allow:

* digits `0-9`
* decimal point `.`
* minus sign `-` (only one, and only at the beginning)

Supports array-style input by splitting and sanitizing each segment using `splitSymbol`.

**Signature**

* `formatNumberInput(val: string, isArray?: boolean, splitSymbol: string = ','): string`

**Parameters**

* `val`: Raw input string.
* `isArray`: Whether the input represents an array (split by `splitSymbol`).
* `splitSymbol`: Separator used for array-like input (default: `","`).

**Returns**

* Sanitized string.

**Behavior Notes**

* Multiple `-` will be collapsed into a single leading `-` if the original starts with `-`.
* Multiple `.` will keep only the first.

**Example**

```ts
formatNumberInput("--1..2a3")          // "-1.23"
formatNumberInput("1a, -2..3, 4--", true, ",") // "1,-2.3,4"
```

---

## `getDepthColor(depth)`

Generate a consistent HSL color string based on a nesting `depth`.

* Hue cycles by `35` degrees per depth.
* Saturation: `60%`
* Lightness: `65%`

**Signature**

* `getDepthColor(depth: number): string`

**Parameters**

* `depth`: Nesting depth (e.g., tree level).

**Returns**

* HSL color string (e.g., `"hsl(70, 60%, 65%)"`).

**Example**

```ts
getDepthColor(1) // "hsl(35, 60%, 65%)"
```

---

## `saferRepairColor(colors, i)`

Safely pick a color from a color list by index, with a fallback.

* Returns `colors[i - 1]` when available.
* Otherwise falls back to `getDepthColor(i)`.

**Signature**

* `saferRepairColor(colors: string[], i: number): string`

**Parameters**

* `colors`: Existing color array.
* `i`: 1-based index (expects to read `colors[i - 1]`).

**Returns**

* A valid color string.

**Example**

```ts
saferRepairColor(["red", "blue"], 2) // "blue"
saferRepairColor(["red", "blue"], 3) // getDepthColor(3)
```

---

## `ensureRef(v)`

Ensure a value is wrapped as a Vue `Ref`.

* If `v` is already a `Ref`, it is returned as-is.
* Otherwise it returns `ref(v ?? null)`.

**Signature**

* `ensureRef(v: any): Ref<any>`

**Parameters**

* `v`: Any value or ref.

**Returns**

* A Vue `Ref`.

**Example**

```ts
ensureRef(1).value        // 1
ensureRef(null).value     // null

const a = ref("x")
ensureRef(a) === a        // true
```

---

## `OmitValue(f, extraKeys?)`

Create a shallow-cloned object from a `DyFormItem` with `value` removed, and optionally remove additional keys.

* Always removes `value`.
* Removes each key in `extraKeys` (except `"value"` which is already removed).
* Useful when updating form item metadata without touching its value.

**Signature**

* `OmitValue<T extends DyFormItem, K extends readonly (keyof T)[]>(
  f: T,
  extraKeys?: K
  ): Omit<T, "value" | K[number]>`

**Parameters**

* `f`: The `DyFormItem` to clone and omit keys from.
* `extraKeys`: Extra keys to omit in addition to `value` (readonly tuple recommended).

**Returns**

* A new object without `value` and without keys in `extraKeys`.

**Example**

```ts
const item = {key: "age", value: 18, label: "Age", required: true} as DyFormItem

const a = OmitValue(item)
// { key:"age", label:"Age", required:true }

const b = OmitValue(item, ["required"] as const)
// { key:"age", label:"Age" }
```

## Debounce(func, delay?)

Creates a debounced function: when called repeatedly, it keeps resetting a timer and only runs `func` after no calls
occur for `delay` milliseconds (**trailing edge**).

* Each call clears the previous timer and starts a new one.
* `delay` defaults to `500ms`.
* Only the arguments from the last call are used.
* Note: this implementation does **not** preserve `this` context (it calls `func(...args)` directly).

### Signature

* `Debounce<T extends (...args: any[]) => void>(func: T, delay: number = 500): (...args: Parameters<T>) => void`

### Parameters

* `func`: The function to debounce.
* `delay`: Delay in milliseconds, default `500`.

### Returns

* A new function. Calling it triggers the debounce logic and eventually executes `func`.

### Examples

```ts
const onResize = Debounce(() => {
    console.log("resize done");
}, 300);

window.addEventListener("resize", onResize);
```

```ts
const save = (id: string) => console.log("save", id);
const saveDebounced = Debounce(save); // default 500ms

saveDebounced("a");
saveDebounced("b"); // eventually prints: save b
```

---

## getPadY(el)

Gets the element’s **vertical padding total** (`padding-top + padding-bottom`) as a number (in px).

* Returns `0` if `el` is `null`.
* Uses `getComputedStyle` and `parseFloat` to convert to numbers.

### Signature

* `getPadY(el: HTMLElement | null): number`

### Parameters

* `el`: Target element (can be `null`).

### Returns

* `number`: `paddingTop + paddingBottom` (px).

### Examples

```ts
const el = document.querySelector<HTMLElement>(".panel");
const padY = getPadY(el);
console.log(padY); // e.g. 24
```

```ts
console.log(getPadY(null)); // 0
```

---

## unwrapObj(obj)

Runs `unref` on each property value of an object, converting Vue `ref/computed` (and other “unwrap-able” values) into
their inner values, and returns a new plain object (**shallow unwrap**).

* Only unwraps the first level; it does not recurse deeply.
* Uses `Object.entries`, so it processes enumerable string keys and returns a plain object (prototype/methods are not
  preserved).

### Signature

* `unwrapObj<T extends Record<string, any>>(obj: T): { [K in keyof T]: T[K] extends { value: infer V } ? V : T[K] }`

### Parameters

* `obj`: Any object; values can be plain values or Vue `ref/computed`, etc.

### Returns

* A new object with the same keys and values after `unref`.

### Examples

```ts
import {ref, computed} from "vue";

const state = {
    a: ref(1),
    b: "x",
    c: computed(() => 42),
};

const plain = unwrapObj(state);
// plain: { a: 1, b: "x", c: 42 }
```

```ts
import {ref} from "vue";

const nested = {x: ref({y: ref(2)})};
const plain = unwrapObj(nested);
// plain.x is { y: Ref<number> } (only shallow unwrapping; y remains a Ref)
```

---

## Exports

* `tranArr`
* `resetObj`
* `parseValue`
* `formatNumberInput`
* `getDepthColor`
* `saferRepairColor`
* `ensureRef`
* `OmitValue`
* `Debounce`
* `getPadY`
* `unwrapObj`
