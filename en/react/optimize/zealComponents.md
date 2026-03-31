---
outline: deep
---

# Zeal Components

Components designed to simplify list-related operations.

## 1. PopupModal

A popup modal component.

### Props

| Prop Name   | Description                                                                                                             | Type                                                | Default                | Required |
|-------------|-------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|------------------------|----------|
| title       | Modal title; can also be a render function                                                                              | `ReactNode \| (() => ReactNode)`                    | `-`                    | No       |
| modalProps  | Pass-through / override props for Antd `Modal` (merged with internal defaults)                                          | `ModalProps`                                        | `-`                    | No       |
| to          | Mount container (passed to `Modal.getContainer`)                                                                        | `string \| HTMLElement`                             | `-`                    | No       |
| showClose   | Whether to show the close button in the top-right corner (`closable`)                                                   | `boolean`                                           | `true`                 | No       |
| draggable   | Whether the modal is draggable (depends on `react-draggable`; install from `peerDependencies`)                          | `boolean`                                           | `false`                | No       |
| closeOnMask | Whether clicking the mask closes the modal (`maskClosable`)                                                             | `boolean`                                           | `true`                 | No       |
| width       | Modal width (applied via `style.width`)                                                                                 | `string`                                            | `'min(1080px,90%)'`    | No       |
| onCancel    | Callback when clicking the cancel button; if it returns `false` in a promise, the modal stays open, otherwise it closes | `() => boolean \| void \| Promise<boolean \| void>` | `() => undefined`      | No       |
| onSubmit    | Callback when clicking the submit button; if it returns `false` in a promise, the modal stays open, otherwise it closes | `() => boolean \| void \| Promise<boolean \| void>` | `() => undefined`      | No       |
| footerTxt   | Footer button text in the form of `[Cancel, Submit]`                                                                    | `string[]`                                          | `['Cancel', 'Submit']` | No       |
| modalRender | Custom modal renderer                                                                                                   | `((node: ReactNode) => ReactNode) \| undefined`     | `-`                    | No       |
| children    | Modal body content (content area)                                                                                       | `ReactNode`                                         | `-`                    | No       |

### Ref (Function)

| Method | Description                                                                                    | Signature               |
|--------|------------------------------------------------------------------------------------------------|-------------------------|
| toggle | Toggle visibility; if omitted, it toggles automatically; pass `true/false` to force open/close | `(f?: boolean) => void` |

### Example

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
````

</template>
</BlockOther>

## 2. AntZealCard

A card layout container, commonly used to wrap pages with a “search area + action area + content area” structure. It
calculates the available content height based on the container and window size, and passes it to the `children` render
function.

### Props

| Prop Name       | Description                                                                                                      | Type                                                      | Default               | Required |
|-----------------|------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|-----------------------|----------|
| title           | Card title                                                                                                       | `ReactNode`                                               | `-`                   | No       |
| zealHeight      | Outer container height, ultimately used in `calc(${zealHeight} - ${outPadding * 2}px)`                           | `string`                                                  | `'100vh'`             | No       |
| outPadding      | Outer top and bottom padding reserved from the total height; `2 * outPadding` will be subtracted                 | `number`                                                  | `0`                   | No       |
| searchBtnTxt    | Default search button text, in the order of `[Reset, Search]`                                                    | `string[]`                                                | `['Reset', 'Search']` | No       |
| checkWindowSize | Window size listener config, in the order of `[mobile threshold, debounce delay]`                                | `number[]`                                                | `[756, 500]`          | No       |
| header          | Custom header renderer; receives window-related args. If provided, it replaces the default header area           | `(args: ZealCardSlotArgs) => ReactNode`                   | `-`                   | No       |
| footer          | Custom footer renderer; rendered as `Card.actions` content                                                       | `(args: ZealCardSlotArgs) => ReactNode`                   | `-`                   | No       |
| searchForm      | Search form area renderer                                                                                        | `() => ReactNode`                                         | `-`                   | No       |
| searchBtn       | Custom search button area; if omitted and `searchForm` exists, the default reset/search buttons will be rendered | `() => ReactNode`                                         | `-`                   | No       |
| controlBtn      | Renderer for the right-side control area in the header                                                           | `() => ReactNode`                                         | `-`                   | No       |
| toolBtn         | Renderer for the right-side tool area in the header                                                              | `() => ReactNode`                                         | `-`                   | No       |
| rest            | Extra content rendered below the card and included in the remaining height calculation                           | `() => ReactNode`                                         | `-`                   | No       |
| children        | Card body content; can be a node directly, or a render function that receives dynamic height and window info     | `ReactNode \| ((args: ZealCardDefaultArgs) => ReactNode)` | `-`                   | No       |

---

### `header / footer` Argument Details

#### ZealCardSlotArgs

| Param    | Description                                    | Type      |
|----------|------------------------------------------------|-----------|
| width    | Current window width                           | `number`  |
| height   | Current window height                          | `number`  |
| isMobile | Whether the current width is considered mobile | `boolean` |

---

### Arguments When `children` Is a Function

#### ZealCardDefaultArgs

In addition to `ZealCardSlotArgs`, it also exposes content area height information.

| Param       | Description                                          | Type             |
|-------------|------------------------------------------------------|------------------|
| tableHeight | Available height of the main content area            | `number`         |
| ctxHeight   | Context height information calculated by observation | `CtxHeightState` |
| width       | Current window width                                 | `number`         |
| height      | Current window height                                | `number`         |
| isMobile    | Whether the current width is considered mobile       | `boolean`        |

---

### Notes

1. If `header` is provided, the default header layout using `title / searchForm / searchBtn` will no longer take effect.
2. If `searchBtn` is not provided but `searchForm` is, the default Reset and Search buttons will be rendered
   automatically, and their labels are controlled by `searchBtnTxt`.
3. The content rendered by `rest` is placed below the card container, making it suitable for extra notes, pagination
   bars, and similar elements. It also affects the content height calculation.
4. When `children` is a function, it is suitable for tables, self-adaptive height regions, and other cases where
   `tableHeight` is needed dynamically.

### Example

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

A table search area component that supports both desktop inline search mode and mobile drawer search mode.

### Props

| Prop Name           | Description                                                                                                         | Type                     | Default               | Required |
|---------------------|---------------------------------------------------------------------------------------------------------------------|--------------------------|-----------------------|----------|
| title               | Title of the search area                                                                                            | `string`                 | `-`                   | No       |
| drawerTitle         | Drawer title; uses `title` if not provided                                                                          | `string`                 | `-`                   | No       |
| searchItemsState    | Search form item state, used internally by `useDyForm` / `AdDynamicForm`                                            | `ItemsState<Row, RuleT>` | `-`                   | Yes      |
| searchFormMaxHeight | Maximum height of the search form area on desktop                                                                   | `string`                 | `'200px'`             | No       |
| drawerMaxHeight     | Height of the drawer on mobile                                                                                      | `number`                 | `420`                 | No       |
| drawerOpenTxt       | Button text for opening the drawer on mobile                                                                        | `string`                 | `'Search Drawer'`     | No       |
| searchBtnTxt        | Search button text, in the order of `[Reset, Search]`                                                               | `string[]`               | `['Reset', 'Search']` | No       |
| mobileDrawer        | Whether to use drawer mode on mobile                                                                                | `boolean`                | `true`                | No       |
| closeDrawerAuto     | Whether to automatically close the drawer when switching from mobile to non-mobile mode                             | `boolean`                | `true`                | No       |
| drawerConfig        | Pass-through / override config for Antd `Drawer`                                                                    | `DrawerProps`            | `-`                   | No       |
| copyDefault         | Whether to cache the initial default values; if enabled, reset restores the initial values instead of clearing them | `boolean`                | `false`               | No       |
| isMobile            | Whether the current mode is mobile, controlled externally                                                           | `boolean`                | `false`               | No       |
| onReset             | Callback when clicking the reset button                                                                             | `() => void`             | `-`                   | No       |
| onSearch            | Callback when clicking the search button; returns the current form values                                           | `(data: Row) => void`    | `-`                   | No       |
| slots               | Custom slot renderers                                                                                               | `ZealTableSearchSlots`   | `-`                   | No       |

---

### Ref (Function)

| Method       | Description                                                                                           | Signature               |
|--------------|-------------------------------------------------------------------------------------------------------|-------------------------|
| onReset      | Execute the reset logic                                                                               | `() => void`            |
| onSearch     | Execute the search logic                                                                              | `() => void`            |
| toggleDrawer | Toggle drawer visibility; if omitted, it toggles automatically; pass `true/false` to force open/close | `(f?: boolean) => void` |
| getParams    | Get the current form parameters                                                                       | `() => Row`             |

---

### ZealTableSearchSlots (slots)

| Slot Name | Description                                    | Signature                                                            |
|-----------|------------------------------------------------|----------------------------------------------------------------------|
| title     | Custom title area                              | `() => ReactNode`                                                    |
| drawerBtn | Custom button for opening the drawer on mobile | `(args: { openDrawer: () => void }) => ReactNode`                    |
| searchBtn | Custom search button area                      | `(args: { onSearch: () => void; onReset: () => void }) => ReactNode` |

---

### Notes

1. When `mobileDrawer = true` and `isMobile = true`, the component switches to drawer search mode.
2. When `copyDefault = true`, clicking Reset restores the initial form values; otherwise, it clears the form.
3. When `closeDrawerAuto = true`, if the component is currently in drawer mode, switching to non-mobile mode will
   automatically close the drawer.
4. If `slots.searchBtn` is provided, it completely replaces the default Reset/Search button area.
5. `drawerConfig` overrides internal `Drawer` props with the same names.

### Example

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

A table pagination control component that wraps Antd `Pagination` and adapts it to the `ZealPagination` pagination
object.

### Props

| Prop Name  | Description                                                                                 | Type                                         | Default | Required |
|------------|---------------------------------------------------------------------------------------------|----------------------------------------------|---------|----------|
| pagination | Pagination state object                                                                     | `ZealPagination`                             | `-`     | Yes      |
| onChange   | Triggered when the page number or page size changes                                         | `(pageNo: number, pageSize: number) => void` | `-`     | Yes      |
| pageConfig | Pass-through / override config for Antd `Pagination`                                        | `PaginationProps`                            | `-`     | No       |
| isMobile   | Whether the current mode is mobile; in mobile mode the pagination uses a more compact style | `boolean`                                    | `false` | No       |
| prefix     | Renderer for content placed before the pagination                                           | `(pageModal: ZealPagination) => ReactNode`   | `-`     | No       |

---

### Notes

1. The current page comes from `pagination.pageNo`.

2. The page size comes from `pagination.pageSize`.

3. The total count comes from `pagination.total`.

4. The selectable page size options come from `pagination.pageSizes`.

5. When changing the page number, the following are triggered in order:

    * `pagination.onChange(page, size)`
    * `onChange(page, size)`

6. When changing the page size, the following are triggered:

    * `pagination.onPageSizeChange?.(size)`
    * `onChange(1, size)`

7. In mobile mode:

    * `Pagination.size = 'small'`
    * `showLessItems = true`

8. When `prefix` exists and the component is in mobile mode, `showSizeChanger` will be hidden.

### Example

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
