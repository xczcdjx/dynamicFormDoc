---
outline: deep
---

# Version History

**Current version: 0.4.4**

Only the changelog of all released versions is listed here, starting from 0.4.1.

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
