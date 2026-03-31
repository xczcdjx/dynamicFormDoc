---
outline: deep
---

# Function

> 全局导出函数


本模块提供一组通用工具方法：用于把对象转换成可编辑的行数据、将行数据还原为对象、解析/格式化数字输入（支持数组形式）、根据层级深度生成稳定颜色、以及从
`DyFormItem` 中剔除 `value`（并可额外剔除指定字段）。

> 其中
> `tranArr`、`resetObj`、`parseValue`、`formatNumberInput`、`getDepthColor`、`saferRepairColor`、`ensureRef`、`OmitValue`、`Debounce`、`getPadY`定义使用与v3版本导出函数一致
> [跳到 v3 Function](../v3/function)
---

## `updateArrayAtPath`

数据递归更新

该函数为CascadeInput内部使用
**函数签名**

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

**参数**

* items: DyCasFormItem[],
* path: number[], // 指向某个 item 深度
* updater: (arr: DyCasFormItem[], index: number) => DyCasFormItem[]

**返回值**

* DyCasFormItem[]

## `clsx`

合并类名

**函数签名**

* `clsx(clsArr:(string|undefined)[]): string`

**参数**

* `clsArr`：类名数据。

**返回值**

* 以空格分离的字符串。

**示例**

```ts
const cls = clsx(['content', undefined])
```

## 导出列表

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
