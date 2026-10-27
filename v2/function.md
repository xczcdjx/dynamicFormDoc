---
outline: deep
---

# Function

以下工具从 `dynamicformdjx-vue2` 主入口导出，主要用于动态输入的数据转换。

## 对象与输入行转换

```js
import { tranArr, resetObj, tranMulObj, resetMulObj } from 'dynamicformdjx-vue2'
const makeId = index => 'row-' + index
const rows = tranArr({ name: '张三', age: 20 }, makeId, ',')
const values = resetObj(rows, ',')
const cascadeRows = tranMulObj({ user: { name: '张三' } }, makeId, ',')
const cascadeValues = resetMulObj(cascadeRows, ',')
```

| 方法 | 说明 |
| --- | --- |
| tranArr(obj, arrayFun, splitSymbol) | 对象转单层输入行，记录数组与数字标记 |
| resetObj(rows, splitSymbol) | 输入行转对象，忽略空白键 |
| tranMulObj(obj, arrayFun, splitSymbol = ',') | 嵌套对象转级联输入行 |
| resetMulObj(rows, splitSymbol = ',') | 级联行转对象；当前嵌套层递归使用默认逗号，嵌套数组建议使用逗号分隔 |

## 数值与输入辅助

| 方法 | 说明 |
| --- | --- |
| allowType(typeName) | 仅 string、number 类型名返回 true |
| parseValue(value, isArray?, isNumber?, splitSymbol = ',') | 将文本转换成字符串、数字或数组；数字数组过滤 NaN |
| formatNumberInput(value, isArray?, splitSymbol = ',') | 保留数字、小数点与首位负号 |
| allowFormat(event, config) | 数字模式下判断键盘输入是否允许；config 含 isNumber、isArray、arraySplitSymbol |
| getDepthColor(depth) | 根据深度生成 HSL 色值 |
| saferRepairColor(colors, index) | 优先使用 colors[index - 1]，否则生成深度色 |

这些工具针对输入组件支持的数据类型，不是任意 JSON 的无损序列化器。普通表单读写使用 [useDyForm](./hooks)。
