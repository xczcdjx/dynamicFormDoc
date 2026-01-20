---
outline: deep
---

# Version History

**Current version: 0.5.0**

Only the changelog of all released versions is listed here, starting from 0.4.1.

## 0.5.0

1. Added a `popupModal` modal (dialog) component to both `naive-ui` and `Element Plus`, plus a common layout `zealCard`
   view.
2. Added `ZealTablePaginationControl` and `ZealTableSearch` components.
3. Added the `usePagination` hook.
4. Added `EleZealTable`, an `Element Plus` table wrapper similar to `naive-ui`’s `data-table`.
5. Provided a reusable CRUD template.
6. Adjusted (refined) some TypeScript types.

## 0.4.4

1. Sync `decorated form` types for `renderCheckbox`, `renderDynamicTags`, `renderSlider`, and `renderInputNumber`.
2. Re-export the original `utils/tools` methods from `index.ts`, and add a new `OmitValue` utility type.
3. Update the `getValue` method in shared hooks; make `getValues` return raw/original values; add `getItem` function.
4. Add type support for `renderPopSelect` in the Element Plus version of renderForm.

## 0.4.3

1. In `DyConfig`, added `hideArrayBtn` and `hideNumberBtn` for cascaded input syncing; also added text slots such as
   `newBtn`, `resetBtn`, `addChild`, etc.
2. `Naive UI` version: adjusted error handling when `renderForm` / `rf` is not provided.
3. Dynamic form: added render functions `renderCheckbox`, `renderDynamicTags`, `renderSlider`, and `renderInputNumber`
4. Add shared hooks helpers for updating array values: `setItem`, `setItems`, `setItem`, and `updateKeys`.

## 0.4.2

1. In `BaseDyFormItem`, `label` is no longer required.
2. Adjusted type definitions in `renderForm` for the `elementPlus` version.
3. For dynamic input, `DyConfig` adds `hideArrayBtn` and `hideNumberBtn`, and introduces text slots such as `newBtn`,
   `resetBtn`, etc.
