---
outline: deep
---

# Function

> Globally exported functions

This module provides a set of general utility methods for converting objects into editable row data, restoring row data back into objects, parsing/formatting numeric input (including array forms), generating stable colors based on hierarchy depth, and removing `value` from `DyFormItem` (with optional removal of additional fields).

> Among them,
> `tranArr`, `resetObj`, `parseValue`, `formatNumberInput`, `getDepthColor`, `saferRepairColor`, `ensureRef`, `OmitValue`, `Debounce`, and `getPadY`
> are defined and used consistently with the functions exported in v3.
> [Go to v3 Function](../v3/function)

---

## `updateArrayAtPath`

Recursively updates data.

This function is used internally by `CascadeInput`.

**Signature**

* `updateArrayAtPath(
    items: DyCasFormItem[],
    path: number[],
    updater: (arr: DyCasFormItem[], index: number) => DyCasFormItem[]
): DyCasFormItem[]`

```ts
type DyCasFormItem = {
    rId: string;
    key: string;
    value: string | DyCasFormItem[];
    isArray?: boolean
    isNumber?: boolean
}
```

**Parameters**

* `items`: `DyCasFormItem[]`
* `path`: `number[]` // points to the depth of a specific item
* `updater`: `(arr: DyCasFormItem[], index: number) => DyCasFormItem[]`

**Returns**

* `DyCasFormItem[]`

## `clsx`

Merges class names.

**Signature**

* `clsx(clsArr:(string|undefined)[]): string`

**Parameters**

* `clsArr`: An array of class names.

**Returns**

* A space-separated string.

**Example**

```ts
const cls = clsx(['content', undefined])
```

## Export List

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
* `clsx`
* `updateArrayAtPath`

