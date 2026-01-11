# Function

> 全局导出函数

````md
## 工具函数说明（中文）

本模块提供一组通用工具方法：用于把对象转换成可编辑的行数据、将行数据还原为对象、解析/格式化数字输入（支持数组形式）、根据层级深度生成稳定颜色、确保值为
Vue `Ref`、以及从 `DyFormItem` 中剔除 `value`（并可额外剔除指定字段）。

---

### `tranArr(obj, arrayFun, splitSymbol)`

将普通对象转换为 `DyCFormItem[]`（适合渲染为“可编辑键值对列表”）。

- 对象的每个 key 会变成一行数据。
- 自动识别原始值是否为数组（`isArray`）。
- 自动识别是否为数字或数字数组（`isNumber`）。
- 若原始值为数组，会用 `splitSymbol` 拼接成字符串，便于输入框编辑。

**函数签名**

- `tranArr(obj: ValueType, arrayFun: DyRandomFun, splitSymbol: string): DyCFormItem[]`

**参数**

- `obj`：要转换的源对象。
- `arrayFun`：生成行 `rId` 的方法（通常根据 index 生成稳定 id）。
- `splitSymbol`：数组转字符串时的分隔符。

**返回值**

- `DyCFormItem[]` 行数组。

**示例**

```ts
const obj = { a: 1, b: [1, 2, 3], c: ["x", "y"] }
const rows = tranArr(obj, (i) => `id-${i}`, ",")
````

---

## `resetObj(arr, splitSymbol)`

将 `DyCFormItem[]` 还原回普通对象。

* 会跳过 `key` 为空或全是空格的行。
* 根据 `isArray` / `isNumber` 调用 `parseValue` 还原为正确类型。

**函数签名**

* `resetObj(arr: DyCFormItem[], splitSymbol: string): ValueType`

**参数**

* `arr`：行数组数据。
* `splitSymbol`：数组字符串还原时使用的分隔符。

**返回值**

* 还原后的 `ValueType` 对象。

**示例**

```ts
const obj = resetObj(rows, ",")
```

---

## `parseValue(value, isArray?, isNumber?, splitSym?)`

将输入值（通常是字符串）解析为目标类型。

解析规则：

* 当 `isArray === true`：

    * 先按 `splitSym` 拆分成数组
    * 若 `isNumber === true`，则转成数字数组，并过滤掉 `NaN`
* 当 `isArray === false`：

    * 若 `isNumber === true`，使用 `parseFloat` 转为数字
    * 否则返回字符串

**函数签名**

* `parseValue(value: string, isArray?: boolean, isNumber?: boolean, splitSym: string = ','): any`

**参数**

* `value`：原始输入字符串。
* `isArray`：是否要解析为数组。
* `isNumber`：是否要解析为数字（或数字数组）。
* `splitSym`：数组拆分符号，默认 `","`。

**返回值**

* 解析后的值（可能是 string / number / string[] / number[]）。

**示例**

```ts
parseValue("1,2,3", true, true, ",") // [1,2,3]
parseValue("a,b", true, false, ",")  // ["a","b"]
parseValue("3.14", false, true)      // 3.14
parseValue("hello", false, false)    // "hello"
```

---

## `formatNumberInput(val, isArray?, splitSymbol?)`

对数字输入进行“安全过滤”，仅允许：

* 数字 `0-9`
* 小数点 `.`
* 负号 `-`（只允许一个，并且必须在最前面）

同时支持数组输入（用 `splitSymbol` 分隔），会对每个片段分别过滤。

**函数签名**

* `formatNumberInput(val: string, isArray?: boolean, splitSymbol: string = ','): string`

**参数**

* `val`：原始输入字符串。
* `isArray`：是否为数组形式的输入。
* `splitSymbol`：数组分隔符，默认 `","`。

**返回值**

* 过滤后的字符串。

**行为说明**

* 多个 `-` 会被清理，只保留一个“开头的负号”。
* 多个 `.` 只保留第一个小数点。

**示例**

```ts
formatNumberInput("--1..2a3") // "-1.23"
formatNumberInput("1a, -2..3, 4--", true, ",") // "1,-2.3,4"
```

---

## `getDepthColor(depth)`

根据层级深度生成一个稳定的 HSL 颜色。

* hue：`(depth * 35) % 360`
* saturation：`60%`
* lightness：`65%`

**函数签名**

* `getDepthColor(depth: number): string`

**参数**

* `depth`：层级深度（例如树形结构的 level）。

**返回值**

* HSL 颜色字符串，如 `"hsl(70, 60%, 65%)"`。

**示例**

```ts
getDepthColor(1) // "hsl(35, 60%, 65%)"
```

---

## `saferRepairColor(colors, i)`

更安全地从颜色数组中取值，取不到时自动回退生成。

* 优先返回 `colors[i - 1]`
* 若不存在则返回 `getDepthColor(i)`

> 注意：这里 `i` 是 **从 1 开始** 的索引（因为取的是 `i - 1`）。

**函数签名**

* `saferRepairColor(colors: string[], i: number): string`

**参数**

* `colors`：颜色数组。
* `i`：1-based 索引。

**返回值**

* 颜色字符串。

**示例**

```ts
saferRepairColor(["red", "blue"], 2) // "blue"
saferRepairColor(["red", "blue"], 3) // getDepthColor(3)
```

---

## `ensureRef(v)`

确保传入值是 Vue `Ref`。

* 若 `v` 本身就是 `Ref`，直接返回。
* 否则返回 `ref(v ?? null)`（空值会变成 `null`）。

**函数签名**

* `ensureRef(v: any): Ref<any>`

**参数**

* `v`：任意值或 `Ref`。

**返回值**

* Vue `Ref`。

**示例**

```ts
ensureRef(1).value      // 1
ensureRef(null).value   // null

const a = ref("x")
ensureRef(a) === a      // true
```

---

## `OmitValue(f, extraKeys?)`

从 `DyFormItem` 浅拷贝一个新对象，并移除 `value` 字段；可额外移除指定字段。

* 一定会删除 `value`
* 如果传了 `extraKeys`，也会删除这些 key（`"value"` 会被忽略，因为已经删过）
* 常用于“只更新表单项配置，不动 value”的场景

**函数签名**

* `OmitValue<T extends DyFormItem, K extends readonly (keyof T)[]>(
  f: T,
  extraKeys?: K
  ): Omit<T, "value" | K[number]>`

**参数**

* `f`：需要处理的 `DyFormItem`。
* `extraKeys`：额外需要剔除的字段列表（建议 `as const`）。

**返回值**

* 不包含 `value` 以及 `extraKeys` 的新对象。

**示例**

```ts
const item = {key: "age", value: 18, label: "年龄", required: true} as DyFormItem

const a = OmitValue(item)
// { key:"age", label:"年龄", required:true }

const b = OmitValue(item, ["required"] as const)
// { key:"age", label:"年龄" }
```

---

## 导出列表

* `tranArr`
* `resetObj`
* `parseValue`
* `formatNumberInput`
* `getDepthColor`
* `saferRepairColor`
* `ensureRef`
* `OmitValue`
