---
outline: deep
---

# 历史版本

**当前版本 0.5.0**

只展示历代版本更新内容，从0.4.1开始

## 0.5.0

1. `naive ui`,`elementPlus`新增`popupModal`模态框,通用布局`zealCard`界面
2. 新增`ZealTablePaginationControl`和`ZealTableSearch`组件
3. 新增`usePagination` hooks
4. `elementPlus`新增`EleZealTable`表格封装，类似naive ui的data-table
5. 提供通用curd模版
6. 部分类型调整

## 0.4.4

1. 装饰表单类型同步`renderCheckbox`,`renderDynamicTags`,`renderSlider`,`renderInputNumber`
2. 原`utils/tools`方法导出至`index.ts`,新增`OmitValue`方法
3. 通用`hooks`中`getValue`方法调整,`getValues`获取值为原始值,新增`getItem`方法
4. `elementPlus` 版本`renderForm`中`renderPopSelect`类型支持

## 0.4.3

1. 级联录入`DyConfig`中同步新增`hideArrayBtn`,`hideNumberBtn`,同步新增`newBtn`,`resetBtn`,`addChild`等文本插槽
2. `Naive Ui` 版本`renderForm`,rf不传报错调整
3. 动态表单新增`renderCheckbox`,`renderDynamicTags`,`renderSlider`,`renderInputNumber`渲染函数
4. 通用`hooks`新增`setItem`,`setItems`,`setItem`,`updateKeys`修改数组值函数

## 0.4.2

1. `BaseDyFormItem`中label改为非必传
2. `elementPlus` 版本`renderForm`中类型调整
3. 动态录入`DyConfig`中新增`hideArrayBtn`,`hideNumberBtn`,新增`newBtn`,`resetBtn`等文本插槽
