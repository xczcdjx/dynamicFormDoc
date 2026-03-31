---
outline: deep
---

# Zeal 组件

提供便于列表操作的组件

## 1. PopupModal

弹出模态框

### Props

| 属性名         | 说明                                                 | 类型                                                  | 默认值                    | 必填 |
|-------------|----------------------------------------------------|-----------------------------------------------------|------------------------|----|
| title       | 弹窗标题；也可传渲染函数                                       | `ReactNode \| (() => ReactNode)`                    | `-`                    | 否  |
| modalProps  | 透传 / 覆盖 Antd 的参数（会与默认值合并）                          | `ModalProps`                                        | `-`                    | 否  |
| to          | 挂载容器（传给 `Modal` 的 `getContainer`）                  | `string \| HTMLElement`                             | `-`                    | 否  |
| showClose   | 是否显示右上角关闭按钮（`closable`）                            | `boolean`                                           | `true`                 | 否  |
| draggable   | 是否可拖拽(依赖于`react-draggable`,导入依赖`peerDependencies`) | `boolean`                                           | `false`                | 否  |
| closeOnMask | 点击遮罩是否关闭（`maskClosable`）                           | `boolean`                                           | `true`                 | 否  |
| width       | 弹窗宽度（通过 `style.width` 设置）                          | `string`                                            | `'min(1080px,90%)'`    | 否  |
| onCancel    | 点击取消按钮回调；返回promise 为 `false` 时保持打开，否则关闭            | `() => boolean \| void \| Promise<boolean \| void>` | `() => undefined`      | 否  |
| onSubmit    | 点击提交按钮回调；返回promise 为 `false` 时保持打开，否则关闭            | `() => boolean \| void \| Promise<boolean \| void>` | `() => undefined`      | 否  |
| footerTxt   | 页脚按钮文案 `[取消, 提交]`                                  | `string[]`                                          | `['Cancel', 'Submit']` | 否  |
| modalRender | 自定义渲染对话框                                           | `((node: ReactNode) => ReactNode) \| undefined`     | `-`                    | 否  |
| children    | 对话框主体内容（content 区域）                                | `ReactNode`                                         | `-`                    | 否  |

### Ref (Function)

| 方法名    | 说明                                     | 签名                      |
|--------|----------------------------------------|-------------------------|
| toggle | 切换显示/隐藏；不传参则取反，传 `true/false` 则强制打开/关闭 | `(f?: boolean) => void` |

### 示例

<BlockOther pathUrl="/testPackage-react/#/zeal/componentsZeal?zType=modal" isOpen>
<template #default="{dl}">
<PreviewBlock v-bind="dl" mh="180px" hideMenu/>
</template>
<template #code>

```tsx
import {useRef} from "react";
import {AdPopupModal, adPopupModalRef} from "dynamicformdjx-react/antd";
import {Button} from "antd";

function PopupModal() {
    const modalRef = useRef<adPopupModalRef>(null);

    return (
        <div>
            <Button onClick={() => modalRef.current?.toggle(true)}>打开弹窗</Button>

            <AdPopupModal
                ref={modalRef}
                title="测试弹窗"
                draggable
                onCancel={() => {
                    return true;
                }}
                onSubmit={async () => {
                    return await new Promise(resolve => setTimeout(() => resolve(true), 2000));
                }}
            >
                <div>这里是弹窗内容</div>
            </AdPopupModal>
        </div>
    );
}

export default PopupModal
```

</template>
</BlockOther>

## 2. AntZealCard

卡片布局容器，通常用于“查询区 + 操作区 + 内容区”的页面包裹；会根据容器与窗口尺寸计算内容可用高度，并将其透传给 `children`
渲染函数。

### Props

| 属性名             | 说明                                                       | 类型                                                        | 默认值                   | 必填 |
|-----------------|----------------------------------------------------------|-----------------------------------------------------------|-----------------------|----|
| title           | 卡片标题                                                     | `ReactNode`                                               | `-`                   | 否  |
| zealHeight      | 外层容器高度，最终会用于 `calc(${zealHeight} - ${outPadding * 2}px)` | `string`                                                  | `'100vh'`             | 否  |
| outPadding      | 外层预留上下边距，会从整体高度中扣除 `2 * outPadding`                      | `number`                                                  | `0`                   | 否  |
| searchBtnTxt    | 默认查询按钮文案，顺序为 `[重置, 查询]`                                  | `string[]`                                                | `['Reset', 'Search']` | 否  |
| checkWindowSize | 窗口尺寸监听配置，顺序为 `[移动端阈值, 防抖延迟]`                             | `number[]`                                                | `[756, 500]`          | 否  |
| header          | 自定义头部渲染；传入窗口相关参数。传入后会替换默认头部区域                            | `(args: ZealCardSlotArgs) => ReactNode`                   | `-`                   | 否  |
| footer          | 自定义底部渲染；会作为 `Card.actions` 内容                            | `(args: ZealCardSlotArgs) => ReactNode`                   | `-`                   | 否  |
| searchForm      | 查询表单区域渲染                                                 | `() => ReactNode`                                         | `-`                   | 否  |
| searchBtn       | 自定义查询按钮区域；不传时若存在 `searchForm`，则显示默认的重置/查询按钮              | `() => ReactNode`                                         | `-`                   | 否  |
| controlBtn      | 头部右侧控制区渲染                                                | `() => ReactNode`                                         | `-`                   | 否  |
| toolBtn         | 头部右侧工具区渲染                                                | `() => ReactNode`                                         | `-`                   | 否  |
| rest            | 额外内容渲染，挂载在卡片外部底部，并参与剩余高度计算                               | `() => ReactNode`                                         | `-`                   | 否  |
| children        | 卡片主体内容；可直接传节点，也可传渲染函数获取动态高度与窗口信息                         | `ReactNode \| ((args: ZealCardDefaultArgs) => ReactNode)` | `-`                   | 否  |

---

### `header / footer` 参数说明

#### ZealCardSlotArgs

| 参数名      | 说明       | 类型        |
|----------|----------|-----------|
| width    | 当前窗口宽度   | `number`  |
| height   | 当前窗口高度   | `number`  |
| isMobile | 是否为移动端宽度 | `boolean` |

---

### `children` 为函数时的参数说明

#### ZealCardDefaultArgs

在 `ZealCardSlotArgs` 基础上，额外透出内容区高度信息。

| 参数名         | 说明             | 类型               |
|-------------|----------------|------------------|
| tableHeight | 当前主体内容区可用高度    | `number`         |
| ctxHeight   | 观察计算得到的上下文高度信息 | `CtxHeightState` |
| width       | 当前窗口宽度         | `number`         |
| height      | 当前窗口高度         | `number`         |
| isMobile    | 是否为移动端宽度       | `boolean`        |

---

### 说明

1. 当传入 `header` 时，默认的 `title / searchForm / searchBtn` 头部布局将不再生效。
2. 当未传入 `searchBtn` 且传入了 `searchForm` 时，会自动渲染默认的重置、查询按钮，按钮文案由 `searchBtnTxt` 控制。
3. `rest` 渲染内容位于卡片外层底部，适合放额外说明、分页栏等，并会影响主体可用高度计算。
4. 当 `children` 为函数时，适合表格、自适应高度区域等需要动态拿到 `tableHeight` 的场景。

### 示例

<BlockOther pathUrl="/testPackage-react/#/zeal/componentsZeal" isOpen>
<template #default="{dl}">
<PreviewBlock v-bind="dl" mh="420px" hideMenu/>
</template>
<template #code>

```tsx
import {AdZealCard} from "dynamicformdjx-react/antd";
import {Button} from "antd";

function ZealCard({pad}: { pad: number }) {
    return <AdZealCard
        outPadding={pad}
        title="Zeal Card"
        footer={({width}) => <div>windows width: {width}</div>}
        searchForm={() => <></>}
        controlBtn={() => <Button size='small' color={'green'} variant={'dashed'}>New</Button>}
    >
        {({tableHeight, isMobile}) => (<div>
            tableHeight:{tableHeight},isMobile:{`${isMobile}`}
        </div>)}
    </AdZealCard>
}

export default ZealCard
```

</template>
</BlockOther>


---

## 2. AdZealTableSearch

表格查询区域组件，支持桌面端内联查询与移动端抽屉查询两种模式。

### Props

| 属性名                 | 说明                                            | 类型                       | 默认值                   | 必填 |
|---------------------|-----------------------------------------------|--------------------------|-----------------------|----|
| title               | 查询区域标题                                        | `string`                 | `-`                   | 否  |
| drawerTitle         | 抽屉标题；不传时使用 `title`                            | `string`                 | `-`                   | 否  |
| searchItemsState    | 查询表单项状态，传给内部 `useDyForm` / `AdDynamicForm` 使用 | `ItemsState<Row, RuleT>` | `-`                   | 是  |
| searchFormMaxHeight | 桌面端查询表单区域最大高度                                 | `string`                 | `'200px'`             | 否  |
| drawerMaxHeight     | 移动端抽屉高度                                       | `number`                 | `420`                 | 否  |
| drawerOpenTxt       | 移动端打开抽屉按钮文案                                   | `string`                 | `'Search Drawer'`     | 否  |
| searchBtnTxt        | 查询按钮文案，顺序为 `[重置, 查询]`                         | `string[]`               | `['Reset', 'Search']` | 否  |
| mobileDrawer        | 是否在移动端使用抽屉模式                                  | `boolean`                | `true`                | 否  |
| closeDrawerAuto     | 当从移动端切回非移动端时，是否自动关闭抽屉                         | `boolean`                | `true`                | 否  |
| drawerConfig        | 透传 / 覆盖 Antd `Drawer` 配置                      | `DrawerProps`            | `-`                   | 否  |
| copyDefault         | 是否缓存初始默认值；重置时恢复为初始值，而不是清空                     | `boolean`                | `false`               | 否  |
| isMobile            | 是否为移动端，由外部控制                                  | `boolean`                | `false`               | 否  |
| onReset             | 点击重置按钮回调                                      | `() => void`             | `-`                   | 否  |
| onSearch            | 点击查询按钮回调，返回当前表单值                              | `(data: Row) => void`    | `-`                   | 否  |
| slots               | 自定义插槽渲染                                       | `ZealTableSearchSlots`   | `-`                   | 否  |

---

### Ref (Function)

| 方法名          | 说明                                       | 签名                      |
|--------------|------------------------------------------|-------------------------|
| onReset      | 执行重置逻辑                                   | `() => void`            |
| onSearch     | 执行查询逻辑                                   | `() => void`            |
| toggleDrawer | 切换抽屉显示/隐藏；不传参则取反，传 `true/false` 则强制打开/关闭 | `(f?: boolean) => void` |
| getParams    | 获取当前表单参数                                 | `() => Row`             |

---

### ZealTableSearchSlots (slots)

| 插槽名       | 说明           | 签名                                                                   |
|-----------|--------------|----------------------------------------------------------------------|
| title     | 自定义标题区域      | `() => ReactNode`                                                    |
| drawerBtn | 自定义移动端打开抽屉按钮 | `(args: { openDrawer: () => void }) => ReactNode`                    |
| searchBtn | 自定义查询按钮区域    | `(args: { onSearch: () => void; onReset: () => void }) => ReactNode` |

---

### 说明

1. 当 `mobileDrawer = true` 且 `isMobile = true` 时，组件会切换为抽屉查询模式。
2. 当 `copyDefault = true` 时，点击重置会恢复到初始表单值；否则执行表单清空逻辑。
3. `closeDrawerAuto = true` 时，若当前为抽屉模式，切换到非移动端后会自动关闭抽屉。
4. 如果传入 `slots.searchBtn`，则会完全替换默认的重置/查询按钮区域。
5. `drawerConfig` 会覆盖内部 `Drawer` 的同名配置。

### 示例

<BlockOther pathUrl="/testPackage-react/#/zeal/componentsZeal?zType=search" isOpen>
<template #default="{dl}">
<PreviewBlock v-bind="dl" mh="320px" hideMenu/>
</template>
<template #code>

```tsx
import {useWindowSize} from "dynamicformdjx-react";
import {useRef} from "react";
import {AdZealTableSearch, adZealTableSearchRef, useDecorateForm} from "dynamicformdjx-react/antd";
import {Button} from "antd";

function ZealTableSearch() {
    type RowProps = {
        name: string
        age: string
        address: string
    }
    const {isMobile} = useWindowSize(630)
    const searchRef = useRef<adZealTableSearchRef<RowProps>>(null)
    const searchFormItems = useDecorateForm<RowProps>([
        {
            key: "name",
            label: "Name",
        },
        {
            key: "age",
            label: "Age",
        },
        {
            key: "address",
            label: "Address",
        },
    ].map(it => ({
        value: null,
        allowClear: true,
        renderType: 'renderInput',
        span: 8,
        ...it,
    })) as any[])
    const onSearch = (params: any) => {
        console.log('search params:', params)
    }

    const onReset = () => {
        console.log('reset')
    }
    return <div>
        <AdZealTableSearch<RowProps>
            ref={searchRef}
            title={'Search Params'}
            isMobile={isMobile}
            searchItemsState={searchFormItems}
            onSearch={onSearch}
            onReset={onReset}
        />
        <Button size='small' onClick={() => {
            console.log(searchRef.current?.getParams())
        }}>Search (Ref Func)</Button>
    </div>
}

export default ZealTableSearch
```

</template>
</BlockOther>

---

## 3. AdZealTablePaginationControl

表格分页控制组件，对 Antd `Pagination` 做了一层封装，适配 `ZealPagination` 分页对象。

### Props

| 属性名        | 说明                           | 类型                                           | 默认值     | 必填 |
|------------|------------------------------|----------------------------------------------|---------|----|
| pagination | 分页状态对象                       | `ZealPagination`                             | `-`     | 是  |
| onChange   | 页码或每页条数变化时触发                 | `(pageNo: number, pageSize: number) => void` | `-`     | 是  |
| pageConfig | 透传 / 覆盖 Antd `Pagination` 配置 | `PaginationProps`                            | `-`     | 否  |
| isMobile   | 是否为移动端；移动端下分页会使用更紧凑模式        | `boolean`                                    | `false` | 否  |
| prefix     | 分页前置内容渲染                     | `(pageModal: ZealPagination) => ReactNode`   | `-`     | 否  |

---

### 说明

1. 当前页取值来自 `pagination.pageNo`。
2. 每页条数取值来自 `pagination.pageSize`。
3. 总数取值来自 `pagination.total`。
4. 分页器可选条数来自 `pagination.pageSizes`。
5. 切换页码时会依次触发：

    * `pagination.onChange(page, size)`
    * `onChange(page, size)`
6. 切换每页条数时会触发：

    * `pagination.onPageSizeChange?.(size)`
    * `onChange(1, size)`
7. 移动端下：

    * `Pagination.size = 'small'`
    * `showLessItems = true`
8. 当同时存在 `prefix` 且为移动端时，会隐藏 `showSizeChanger`。

### 示例

<BlockOther pathUrl="/testPackage-react/#/zeal/componentsZeal?zType=page" isOpen>
<template #default="{dl}">
<PreviewBlock v-bind="dl" mh="120px" hideMenu/>
</template>
<template #code>

```tsx
import {message} from "antd";
import {usePagination, useWindowSize} from "dynamicformdjx-react";
import {useEffect} from "react";
import {AdZealTablePaginationControl} from "dynamicformdjx-react/antd";

function ZealTablePaginationControl() {
    const [messageApi, contextHolder] = message.useMessage();
    const {isMobile} = useWindowSize(630)
    const paginationModal = usePagination(fetchData)

    function fetchData() {
        const {pagination} = paginationModal
        console.log(pagination.pageNo, pagination.pageSize)
    }

    useEffect(() => {
        paginationModal.setTotal(52)
    }, [])
    return (<div>
        {contextHolder}
        <AdZealTablePaginationControl
            prefix={({total}) => isMobile ? null : <span>Total {total}</span>}
            isMobile={isMobile}
            pagination={paginationModal.pagination}
            onChange={(pn, ps) => {
                messageApi.info(JSON.stringify({
                    pageNo: pn,
                    pageSize: ps,
                }, null, 2))
            }}
        />
    </div>)
}

export default ZealTablePaginationControl
```

</template>
</BlockOther>