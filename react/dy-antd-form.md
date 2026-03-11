# AdDynamicForm

动态表单

1. 请确保已经安装antd,下方所有表单是在原有基础做的一个简化封装
2. antd版本需要大于或等于5

## 1.简单使用

<BlockOther linkUrl="https://5trqc7-4173.csb.app/form?hideMenu=true">
<template #default="{dl}">
<PreviewBlock v-bind="dl"/>
</template>
<template #code>

::: code-group

```tsx
import {useRef, useState} from "react";
import {Button, Input, Radio} from "antd";
import {AdDynamicForm, type adDynamicFormRef, renderInput} from "dynamicformdjx-react/antd";
import {omitFormCommonKey, OmitValue, useDyForm, useReactiveForm} from "dynamicformdjx-react";
import type {PresetType} from "dynamicformdjx-react/types";
import type {Rule} from "antd/es/form";

type RowProps = {
    username: string
    password: string
    desc: string
    preset: string
}
const SimpleForm = () => {
    const [presetType, setPresetType] = useState<PresetType>('fullRow')
    const [formItems, setFormItems] = useReactiveForm<RowProps, Rule | Rule[]>([
        {
            key: "username",
            label: "用户名",
            value: "",
            allowClear: true,
            rule: [{required: true, message: 'Please input your username!', validateTrigger: 'onBlur'}],
            render2: f => renderInput({}, f),
            span: 12
        },
        {
            key: "password",
            label: "密码",
            required: true,
            value: "",
            render2: (f) => <Input.Password placeholder="请输入密码" {...OmitValue(f, omitFormCommonKey)}/>,
            span: 8,
            offset: 2,
            sort: 0
        },
        {
            key: "preset",
            label: "表格预设",
            value: "fullRow",
            render2: (f) => <Radio.Group
                value={f.value}
                options={[
                    {value: 'fullRow', label: 'row'},
                    {value: 'grid', label: 'grid'},
                ]}
                onChange={(v) => {
                    setPresetType(v.target.value)
                }}
            />,
        }
    ])
    const useForm = useDyForm([formItems, setFormItems])
    const antdFormRef = useRef<adDynamicFormRef>(null)
    const rules: Partial<Record<keyof RowProps, Rule | Rule[]>> = {
        desc: [{required: true, message: '请输入详情'}]
    }
    return (
        <div className='dynamicFormTest'>
            <AdDynamicForm ref={antdFormRef} rules={rules} validateTrigger={null} items={formItems}
                           preset={presetType}/>
            <div className="footer" style={{
                display: 'flex',
                gap: '5px'
            }}>
                <Button color={'green'} variant={'outlined'} onClick={() => {
                    // const res=antdFormRef.current?.getResult?.()
                    const res = useForm.getValues()
                    console.log(res)
                }}>getData</Button>
                <Button color={'orange'} variant={'outlined'} onClick={() => {
                    useForm.setValues({
                        username: 'antd',
                        password: 'I love you'
                    })
                }}>setData</Button>
                <Button color={'blue'} variant={'outlined'} onClick={() => {
                    antdFormRef.current?.validator().then(v => {
                        console.log(v)
                    }).catch(r => {
                        console.log(r)
                    })
                }}>validator</Button>
                <Button color={'red'} variant={'outlined'} onClick={() => {
                    useForm.onReset()
                }}>reset</Button>
                <Button variant={'outlined'} onClick={() => {
                    useForm.setDisabled(true)
                }}>setDisabled</Button>
            </div>
        </div>
    );
};

export default SimpleForm;

```

```jsx
import {useRef, useState} from "react";
import {Button, Input, Radio} from "antd";
import {AdDynamicForm, renderInput} from "dynamicformdjx-react/antd";
import {omitFormCommonKey, OmitValue, useDyForm, useReactiveForm} from "dynamicformdjx-react";

const SimpleForm = () => {
    const [presetType, setPresetType] = useState("fullRow");

    const [formItems, setFormItems] = useReactiveForm([
        {
            key: "username",
            label: "用户名",
            value: "",
            allowClear: true,
            rule: [
                {
                    required: true,
                    message: "Please input your username!",
                    validateTrigger: "onBlur",
                },
            ],
            render2: (f) => renderInput({}, f),
            span: 12,
        },
        {
            key: "password",
            label: "密码",
            required: true,
            value: "",
            render2: (f) => (
                <Input.Password
                    placeholder="请输入密码"
                    {...OmitValue(f, omitFormCommonKey)}
                />
            ),
            span: 8,
            offset: 2,
            sort: 0,
        },
        {
            key: "preset",
            label: "表格预设",
            value: "fullRow",
            render2: (f) => (
                <Radio.Group
                    value={f.value}
                    options={[
                        {value: "fullRow", label: "row"},
                        {value: "grid", label: "grid"},
                    ]}
                    onChange={(v) => {
                        setPresetType(v.target.value);
                    }}
                />
            ),
        },
    ]);

    const useForm = useDyForm([formItems, setFormItems]);
    const antdFormRef = useRef(null);

    const rules = {
        desc: [{required: true, message: "请输入详情"}],
    };

    return (
        <div className="dynamicFormTest">
            <AdDynamicForm
                ref={antdFormRef}
                rules={rules}
                validateTrigger={null}
                items={formItems}
                preset={presetType}
            />
            <div
                className="footer"
                style={{
                    display: "flex",
                    gap: "5px",
                }}
            >
                <Button
                    color={"green"}
                    variant={"outlined"}
                    onClick={() => {
                        const res = useForm.getValues();
                        console.log(res);
                    }}
                >
                    getData
                </Button>

                <Button
                    color={"orange"}
                    variant={"outlined"}
                    onClick={() => {
                        useForm.setValues({
                            username: "antd",
                            password: "I love you",
                        });
                    }}
                >
                    setData
                </Button>

                <Button
                    color={"blue"}
                    variant={"outlined"}
                    onClick={() => {
                        antdFormRef.current
                            ?.validator()
                            .then((v) => {
                                console.log(v);
                            })
                            .catch((r) => {
                                console.log(r);
                            });
                    }}
                >
                    validator
                </Button>

                <Button
                    color={"red"}
                    variant={"outlined"}
                    onClick={() => {
                        useForm.onReset();
                    }}
                >
                    reset
                </Button>

                <Button
                    variant={"outlined"}
                    onClick={() => {
                        useForm.setDisabled(true);
                    }}
                >
                    setDisabled
                </Button>
            </div>
        </div>
    );
};

export default SimpleForm;
```

:::

</template>
</BlockOther>

## 2.自定义使用

> (所有render2函数使用自定义)

<BlockOther linkUrl="https://5trqc7-4173.csb.app/form/customForm?hideMenu=true">
<template #default="{dl}">
<PreviewBlock v-bind="dl"/>
</template>
<template #code>

::: code-group

```tsx
import {useRef} from "react";
import {Button, Input, Select} from "antd";
import {
    DynamicInput,
    type dynamicInputRef,
    omitFormCommonKey,
    OmitValue,
    useDyForm,
    useReactiveForm
} from "dynamicformdjx-react";
import {AdDynamicForm, type adDynamicFormRef} from "dynamicformdjx-react/antd";
import type {Rule} from "antd/es/form";

type RowProps = {
    username: string
    job: string
    json: object
}
const CustomForm = () => {
    const [formItems, setFormItems] = useReactiveForm<RowProps, Rule | Rule[]>([
        {
            key: "username",
            label: "用户名",
            value: "",
            allowClear: true,
            render2: (f) => <Input placeholder="请输入姓名" {...OmitValue(f, omitFormCommonKey)}/>,
            rule: [
                {
                    required: true,
                    message: 'Please confirm your username!',
                },
                {
                    validator: async (_, value) => {
                        if (!value) return; // 交给 required 处理
                        if (value.length < 3) {
                            throw new Error('至少 3 个字符');
                        }
                    },
                }
            ],
        },
        {
            key: "job",
            label: "职位",
            value: "",
            required: true,
            render2: (f) => <Select
                style={{
                    width: '100%'
                }}
                options={[
                    {value: 'jack', label: 'Jack'},
                    {value: 'lucy', label: 'Lucy'},
                    {value: 'Yiminghe', label: 'yiminghe'},
                    {value: 'disabled', label: 'Disabled', disabled: true},
                ]}
            />,
        },
        {
            key: "json",
            label: "Json",
            value: {},
            isCustom: true,
            rule: [
                {
                    required: true,
                    message: 'json 不能为空'
                },
                {
                    validator: async (_, value) => {
                        if (!value || Object.keys(value).length === 0) {
                            throw new Error('json 不能为空');
                        }
                    },
                }
            ],
            render2: f => {
                return <DynamicInput ref={dynamicInputRef} value={f.value} onChange={(v: object) => {
                    f.value = v
                }} isController/>
            },
        },
    ])
    const useForm = useDyForm([formItems, setFormItems])
    const antdFormRef = useRef<adDynamicFormRef>(null)
    const dynamicInputRef = useRef<dynamicInputRef>(null)
    return (
        <div className='dynamicFormTest'>
            <AdDynamicForm ref={antdFormRef} items={formItems}/>
            <div className="footer" style={{
                display: 'flex',
                gap: '5px'
            }}>
                <Button color={'green'} variant={'outlined'} onClick={() => {
                    // const res=antdFormRef.current?.getResult?.()
                    const res = useForm.getValues()
                    console.log(res)
                }}>getData</Button>
                <Button color={'orange'} variant={'outlined'} onClick={() => {
                    useForm.setValues({
                        username: 'antd',
                        job: 'jack'
                    })
                    dynamicInputRef.current?.onSet?.({
                        a: 'Hello world',
                        b: 1314,
                        c: [5, 2, 0]
                    })
                }}>setData</Button>
                <Button color={'blue'} variant={'outlined'} onClick={() => {
                    antdFormRef.current?.validator().then(v => {
                        console.log(v)
                    }).catch(r => {
                        console.error(r)
                    })
                }}>validator</Button>
                <Button color={'red'} variant={'outlined'} onClick={() => {
                    useForm.onReset()
                    dynamicInputRef.current?.onSet?.({})
                }}>reset</Button>
            </div>
        </div>
    );
};

export default CustomForm;

```

```jsx
import {useRef} from "react";
import {Button, Input, Select} from "antd";
import {
    DynamicInput,
    omitFormCommonKey,
    OmitValue,
    useDyForm,
    useReactiveForm,
} from "dynamicformdjx-react";
import {AdDynamicForm} from "dynamicformdjx-react/antd";

const CustomForm = () => {
    const dynamicInputRef = useRef(null);
    const antdFormRef = useRef(null);

    const [formItems, setFormItems] = useReactiveForm([
        {
            key: "username",
            label: "用户名",
            value: "",
            allowClear: true,
            render2: (f) => (
                <Input placeholder="请输入姓名" {...OmitValue(f, omitFormCommonKey)} />
            ),
            rule: [
                {
                    required: true,
                    message: "Please confirm your username!",
                },
                {
                    validator: async (_, value) => {
                        if (!value) return;
                        if (value.length < 3) {
                            throw new Error("至少 3 个字符");
                        }
                    },
                },
            ],
        },
        {
            key: "job",
            label: "职位",
            value: "",
            required: true,
            render2: () => (
                <Select
                    style={{
                        width: "100%",
                    }}
                    options={[
                        {value: "jack", label: "Jack"},
                        {value: "lucy", label: "Lucy"},
                        {value: "Yiminghe", label: "yiminghe"},
                        {value: "disabled", label: "Disabled", disabled: true},
                    ]}
                />
            ),
        },
        {
            key: "json",
            label: "Json",
            value: {},
            isCustom: true,
            rule: [
                {
                    required: true,
                    message: "json 不能为空",
                },
                {
                    validator: async (_, value) => {
                        if (!value || Object.keys(value).length === 0) {
                            throw new Error("json 不能为空");
                        }
                    },
                },
            ],
            render2: (f) => {
                return (
                    <DynamicInput
                        ref={dynamicInputRef}
                        value={f.value}
                        onChange={(v) => {
                            f.value = v;
                        }}
                        isController
                    />
                );
            },
        },
    ]);

    const useForm = useDyForm([formItems, setFormItems]);

    return (
        <div className="dynamicFormTest">
            <AdDynamicForm ref={antdFormRef} items={formItems}/>
            <div
                className="footer"
                style={{
                    display: "flex",
                    gap: "5px",
                }}
            >
                <Button
                    color={"green"}
                    variant={"outlined"}
                    onClick={() => {
                        const res = useForm.getValues();
                        console.log(res);
                    }}
                >
                    getData
                </Button>

                <Button
                    color={"orange"}
                    variant={"outlined"}
                    onClick={() => {
                        useForm.setValues({
                            username: "antd",
                            job: "jack",
                        });
                        dynamicInputRef.current?.onSet?.({
                            a: "Hello world",
                            b: 1314,
                            c: [5, 2, 0],
                        });
                    }}
                >
                    setData
                </Button>

                <Button
                    color={"blue"}
                    variant={"outlined"}
                    onClick={() => {
                        antdFormRef.current
                            ?.validator()
                            .then((v) => {
                                console.log(v);
                            })
                            .catch((r) => {
                                console.error(r);
                            });
                    }}
                >
                    validator
                </Button>

                <Button
                    color={"red"}
                    variant={"outlined"}
                    onClick={() => {
                        useForm.onReset();
                        dynamicInputRef.current?.onSet?.({});
                    }}
                >
                    reset
                </Button>
            </div>
        </div>
    );
};

export default CustomForm;
```

:::

</template>
</BlockOther>

## 3.装饰表单

> (可省略render2函数)

<BlockOther linkUrl="https://5trqc7-4173.csb.app/form/decorateForm?hideMenu=true">
<template #default="{dl}">
<PreviewBlock v-bind="dl" mh="360px"/>
</template>
<template #code>

::: code-group

```tsx
import {DATETIME_FORMAT, TIME_FORMAT, useDyForm} from "dynamicformdjx-react";
import type {Rule} from "antd/es/form";
import {
    AdDynamicForm,
    type adDynamicFormRef, useDecorateForm,
    datePickerFormat, renderDatePicker
} from "dynamicformdjx-react/antd";
import {useRef} from "react";
import {Button} from "antd";

type FormRow = {
    password: string
    job: number
    birthday: string
    time: string
}
const DecorateForm = () => {
    const [formItems, setFormItems] = useDecorateForm<FormRow, Rule | Rule[]>([
        {
            key: "password",
            label: "密码",
            value: null,
            allowClear: true,
            placeholder: '请输入密码',
            required: true,
            type: 'password',
            renderType: 'renderInput'
        },
        {
            key: "job",
            label: "职位",
            value: null,
            allowClear: true,
            options: ['前端', '后端'].map((label, value) => ({label, value})),
            renderType: 'renderSelect',
        },
        {
            key: "birthday",
            label: "生日",
            value: null,
            // render2: f => renderDatePicker({type: 'datetime', showTime: true}, f),
            renderType: 'renderDatePicker',
            renderProps: {
                type: 'datetime', showTime: true, isRange: true
            },
            formItemProps: {
                ...datePickerFormat({formatStr: DATETIME_FORMAT})
            }
        },
        {
            key: "time",
            label: "时间",
            value: ['00:00:00', '23:59:00'],
            renderType: 'renderDatePicker',
            renderProps: {
                isRange: true,
            },
            formItemProps: {
                ...datePickerFormat({formatStr: TIME_FORMAT})
            }
        }
    ])
    const useForm = useDyForm([formItems, setFormItems])
    const antdFormRef = useRef<adDynamicFormRef>(null)
    return (
        <div className='dynamicFormTest'>
            <AdDynamicForm ref={antdFormRef} items={formItems}/>
            <div className="footer" style={{
                display: 'flex',
                gap: '5px'
            }}>
                <Button color={'green'} variant={'outlined'} onClick={() => {
                    // const res=antdFormRef.current?.getResult?.()
                    const res = useForm.getValues()
                    console.log(res)
                }}>getData</Button>
                <Button color={'orange'} variant={'outlined'} onClick={() => {
                    useForm.setValues({
                        password: 'Antd',
                        job: 0,
                        birthday: '2026-02-11'
                    })
                }}>setData</Button>
                <Button color={'blue'} variant={'outlined'} onClick={() => {
                    antdFormRef.current?.validator().then(v => {
                        console.log(v)
                    }).catch(r => {
                        console.log(r)
                    })
                }}>validator</Button>
                <Button color={'red'} variant={'outlined'} onClick={() => {
                    useForm.onReset()
                }}>reset</Button>
                <Button variant={'outlined'} onClick={() => {
                    useForm.setDisabled(true)
                }}>setDisabled</Button>
            </div>
        </div>
    );
}
export default DecorateForm;
```

```jsx
import {DATETIME_FORMAT, TIME_FORMAT, useDyForm} from "dynamicformdjx-react";
import {
    AdDynamicForm,
    useDecorateForm,
    datePickerFormat,
} from "dynamicformdjx-react/antd";
import {useRef} from "react";
import {Button} from "antd";

const DecorateForm = () => {
    const [formItems, setFormItems] = useDecorateForm([
        {
            key: "password",
            label: "密码",
            value: null,
            allowClear: true,
            placeholder: "请输入密码",
            required: true,
            type: "password",
            renderType: "renderInput",
        },
        {
            key: "job",
            label: "职位",
            value: null,
            allowClear: true,
            options: ["前端", "后端"].map((label, value) => ({label, value})),
            renderType: "renderSelect",
        },
        {
            key: "birthday",
            label: "生日",
            value: null,
            renderType: "renderDatePicker",
            renderProps: {
                type: "datetime",
                showTime: true,
                isRange: true,
            },
            formItemProps: {
                ...datePickerFormat({formatStr: DATETIME_FORMAT}),
            },
        },
        {
            key: "time",
            label: "时间",
            value: ["00:00:00", "23:59:00"],
            renderType: "renderDatePicker",
            renderProps: {
                isRange: true,
            },
            formItemProps: {
                ...datePickerFormat({formatStr: TIME_FORMAT}),
            },
        },
    ]);

    const useForm = useDyForm([formItems, setFormItems]);
    const antdFormRef = useRef(null);

    return (
        <div className="dynamicFormTest">
            <AdDynamicForm ref={antdFormRef} items={formItems}/>
            <div
                className="footer"
                style={{
                    display: "flex",
                    gap: "5px",
                }}
            >
                <Button
                    color={"green"}
                    variant={"outlined"}
                    onClick={() => {
                        const res = useForm.getValues();
                        console.log(res);
                    }}
                >
                    getData
                </Button>

                <Button
                    color={"orange"}
                    variant={"outlined"}
                    onClick={() => {
                        useForm.setValues({
                            password: "Antd",
                            job: 0,
                            birthday: "2026-02-11",
                        });
                    }}
                >
                    setData
                </Button>

                <Button
                    color={"blue"}
                    variant={"outlined"}
                    onClick={() => {
                        antdFormRef.current
                            ?.validator()
                            .then((v) => {
                                console.log(v);
                            })
                            .catch((r) => {
                                console.log(r);
                            });
                    }}
                >
                    validator
                </Button>

                <Button
                    color={"red"}
                    variant={"outlined"}
                    onClick={() => {
                        useForm.onReset();
                    }}
                >
                    reset
                </Button>

                <Button
                    variant={"outlined"}
                    onClick={() => {
                        useForm.setDisabled(true);
                    }}
                >
                    setDisabled
                </Button>
            </div>
        </div>
    );
};

export default DecorateForm;
```

:::

</template>
</BlockOther>

## 4.总表单

> 所有render2函数从"dynamicformdjx/antd"中导入

<BlockOther linkUrl="https://5trqc7-4173.csb.app/form/allForm?hideMenu=true">
<template #default="{dl}">
<PreviewBlock v-bind="dl" mh="600px"/>
</template>
<template #code>

::: code-group

```tsx
import {useRef, useState} from "react";
import {Button, Input, Radio} from "antd";
import {
    AdDynamicForm,
    type adDynamicFormRef, renderCheckbox, renderCheckboxGroup, renderDatePicker, renderDynamicTags,
    renderInput, renderInputNumber,
    renderPopSelect, renderRadioButtonGroup, renderRadioGroup,
    renderSelect, renderSlider, renderSwitch, renderTimePicker,
    renderTreeSelect
} from "dynamicformdjx-react/antd";
import {useDyForm, useReactiveForm} from "dynamicformdjx-react";
import type {Rule} from "antd/es/form";

type RowProps = {
    username: string
    password: string
    gender: number
    description: string
    email: string
    birthday: string
    desc: string
    sex: number
    birthdayT: number
    admin: number
    favorite: number[]
    job: number
    job2: number
    job3: number
    checkbox: boolean
    future: string[]
    slider: number
    inputNumber: number
}
const AllForm = () => {
    const [formItems, setFormItems] = useReactiveForm<RowProps, Rule | Rule[]>([
        {
            key: "username",
            label: "用户名",
            value: "",
            allowClear: true,
            render2: f => renderInput({}, f),
        },
        {
            key: "password",
            label: "密码",
            required: true,
            value: "",
            render2: (f) => renderInput({}, {...f, type: 'password'}),
        },
        {
            key: "gender",
            label: "性别",
            value: null,
            placeholder: '请选择性别',
            labelField: 'f',
            valueField: 'v',
            showSearch: true,
            allowClear: true,
            searchOnLabel: true,
            options: [
                {f: <b>男</b>, v: 0},
                {f: '女', v: 1}
            ],
            render2: (f) => renderSelect([], {}, f)
        },
        {
            key: "job",
            label: "职业",
            value: null,
            placeholder: '请选择职业',
            labelField: 'f',
            valueField: 'v',
            showSearch: true,
            allowClear: true,
            searchOnLabel: true,
            childField: 'childOptions',
            options: [
                {
                    f: '前端', v: '1', childOptions: [
                        {f: '网页开发', v: '1-1'},
                        {f: '小程序开发', v: '1-2'},
                    ]
                },
                {
                    f: '后端', v: '2', childOptions: [
                        {f: '后台开发', v: '2-1'},
                        {f: '运维', v: '2-2'},
                    ]
                }
            ],
            render2: (f) => renderTreeSelect([], {
                treeDefaultExpandAll: true
            }, f),
        },
        {
            key: "job2",
            label: "职位2",
            value: null,
            labelField: 'l',
            valueField: 'v',
            options: ['Drive My Car', 'Norwegian Wood'].map((label, index) => ({
                l: label,
                v: label,
                children: [
                    {l: 'aaa' + index, v: 'aaa' + index},
                    {l: 'bbb' + index, v: 'bbb' + index},
                ]
            })),
            // mode: 'multiple',
            render2: f => renderPopSelect([], {}, f),
        },
        {
            key: "sex",
            label: "性别",
            labelField: 'label1',
            valueField: 'value1',
            value: null,
            options: [
                {label1: '男', value1: 0}, {label1: '女', value1: 1},
            ],
            render2: f => renderRadioGroup([], {}, f),
        },
        {
            key: "favorite",
            label: "爱好",
            labelField: 'fl',
            valueField: 'fv',
            sort: 1,
            options: [
                {fl: '吃饭', fv: 0},
                {fl: '睡觉', fv: 1},
                {fl: '打豆豆', fv: 2},
            ],
            value: [],
            render2: f => renderCheckboxGroup([], {}, f),
        },
        {
            key: "admin",
            label: "管理员？",
            value: null,
            render2: f => renderSwitch({}, f),
        },
        {
            key: "birthday",
            label: "生日",
            value: null,
            render2: f => renderDatePicker({showTime: true}, f),
        },
        {
            key: "birthdayT",
            label: "时间",
            value: null,
            render2: f => renderTimePicker({}, f),
        },
        {
            key: "future",
            label: "未来",
            value: Array.from({length:4}).map((_,i)=>`hello world ${i+1}`),
            options: [
                {label: '你没见过不等于没有', value: 'hello world 1'},
                {
                    label: '不要给自己设限',
                    value: 'hello world 2'
                },
                {
                    label: '不要说连升两级',
                    value: 'hello world 3'
                },
                {
                    label: '直接升到 CEO 都是有可能的',
                    value: 'hello world 4'
                }
            ],
            render2: f => renderDynamicTags([], {}, f),
        },
        {
            key: "checkbox",
            label: "复选",
            value: true,
            render2: f => renderCheckbox({}, f),
            formItemProps: {
                valuePropName: 'checked',
            }
        },
        {
            key: "slider",
            label: "滑块",
            value: 0,
            render2: f => renderSlider({}, f),
        },
        {
            key: "inputNumber",
            label: "数字输入",
            value: 20,
            render2: f => renderInputNumber({}, f),
        },
    ])
    const useForm = useDyForm([formItems, setFormItems])
    const antdFormRef = useRef<adDynamicFormRef>(null)
    const rules: Partial<Record<keyof RowProps, Rule | Rule[]>> = {
        desc: [{required: true, message: '请输入详情'}]
    }
    return (
        <div className='dynamicFormTest'>
            <AdDynamicForm ref={antdFormRef} rules={rules} items={formItems}/>
            <div className="footer" style={{
                display: 'flex',
                gap: '5px'
            }}>
                <Button color={'green'} variant={'outlined'} onClick={() => {
                    // const res=antdFormRef.current?.getResult?.()
                    const res = useForm.getValues()
                    console.log(res)
                }}>getData</Button>
                <Button color={'orange'} variant={'outlined'} onClick={() => {
                    useForm.setValues({
                        username: 'antd',
                        password: 'I love you'
                    })
                }}>setData</Button>
                <Button color={'blue'} variant={'outlined'} onClick={() => {
                    antdFormRef.current?.validator().then(v => {
                        console.log(v)
                    }).catch(r => {
                        console.log(r)
                    })
                }}>validator</Button>
                <Button color={'red'} variant={'outlined'} onClick={() => {
                    useForm.onReset()
                }}>reset</Button>
                <Button variant={'outlined'} onClick={() => {
                    useForm.setDisabled(true)
                }}>setDisabled</Button>
            </div>
        </div>
    );
};

export default AllForm;

```
```jsx
import { useRef, useState } from "react";
import { Button, Input, Radio } from "antd";
import {
    AdDynamicForm,
    renderCheckbox, renderCheckboxGroup, renderDatePicker, renderDynamicTags,
    renderInput, renderInputNumber,
    renderPopSelect, renderRadioButtonGroup, renderRadioGroup,
    renderSelect, renderSlider, renderSwitch, renderTimePicker,
    renderTreeSelect
} from "dynamicformdjx-react/antd";
import { useDyForm, useReactiveForm } from "dynamicformdjx-react";

const AllForm = () => {
  const [formItems, setFormItems] = useReactiveForm([
    {
      key: "username",
      label: "用户名",
      value: "",
      allowClear: true,
      render2: (f) => renderInput({}, f),
    },
    {
      key: "password",
      label: "密码",
      required: true,
      value: "",
      render2: (f) => renderInput({}, { ...f, type: "password" }),
    },
    {
      key: "gender",
      label: "性别",
      value: null,
      placeholder: "请选择性别",
      labelField: "f",
      valueField: "v",
      showSearch: true,
      allowClear: true,
      searchOnLabel: true,
      options: [
        { f: <b>男</b>, v: 0 },
        { f: "女", v: 1 },
      ],
      render2: (f) => renderSelect([], {}, f),
    },
    {
      key: "job",
      label: "职业",
      value: null,
      placeholder: "请选择职业",
      labelField: "f",
      valueField: "v",
      showSearch: true,
      allowClear: true,
      searchOnLabel: true,
      childField: "childOptions",
      options: [
        {
          f: "前端",
          v: "1",
          childOptions: [
            { f: "网页开发", v: "1-1" },
            { f: "小程序开发", v: "1-2" },
          ],
        },
        {
          f: "后端",
          v: "2",
          childOptions: [
            { f: "后台开发", v: "2-1" },
            { f: "运维", v: "2-2" },
          ],
        },
      ],
      render2: (f) =>
        renderTreeSelect(
          [],
          {
            treeDefaultExpandAll: true,
          },
          f
        ),
    },
    {
      key: "job2",
      label: "职位2",
      value: null,
      labelField: "l",
      valueField: "v",
      options: ["Drive My Car", "Norwegian Wood"].map((label, index) => ({
        l: label,
        v: label,
        children: [
          { l: "aaa" + index, v: "aaa" + index },
          { l: "bbb" + index, v: "bbb" + index },
        ],
      })),
      render2: (f) => renderPopSelect([], {}, f),
    },
    {
      key: "sex",
      label: "性别",
      labelField: "label1",
      valueField: "value1",
      value: null,
      options: [
        { label1: "男", value1: 0 },
        { label1: "女", value1: 1 },
      ],
      render2: (f) => renderRadioGroup([], {}, f),
    },
    {
      key: "favorite",
      label: "爱好",
      labelField: "fl",
      valueField: "fv",
      sort: 1,
      options: [
        { fl: "吃饭", fv: 0 },
        { fl: "睡觉", fv: 1 },
        { fl: "打豆豆", fv: 2 },
      ],
      value: [],
      render2: (f) => renderCheckboxGroup([], {}, f),
    },
    {
      key: "admin",
      label: "管理员？",
      value: null,
      render2: (f) => renderSwitch({}, f),
    },
    {
      key: "birthday",
      label: "生日",
      value: null,
      render2: (f) => renderDatePicker({ showTime: true }, f),
    },
    {
      key: "birthdayT",
      label: "时间",
      value: null,
      render2: (f) => renderTimePicker({}, f),
    },
    {
      key: "future",
      label: "未来", 
      value: Array.from({length:4}).map((_,i)=>`hello world ${i+1}`),
      options: [
            {label: '你没见过不等于没有', value: 'hello world 1'},
            {
                label: '不要给自己设限',
                value: 'hello world 2'
            },
            {
                label: '不要说连升两级',
                value: 'hello world 3'
            },
            {
                label: '直接升到 CEO 都是有可能的',
                value: 'hello world 4'
            }
        ],
      render2: f => renderDynamicTags([], {}, f),
    },
    {
      key: "checkbox",
      label: "复选",
      value: true,
      render2: (f) => renderCheckbox({}, f),
      formItemProps: {
        valuePropName: "checked",
      },
    },
    {
      key: "slider",
      label: "滑块",
      value: 0,
      render2: (f) => renderSlider({}, f),
    },
    {
      key: "inputNumber",
      label: "数字输入",
      value: 20,
      render2: (f) => renderInputNumber({}, f),
    },
  ]);

  const useForm = useDyForm([formItems, setFormItems]);
  const antdFormRef = useRef(null);

  const rules = {
    desc: [{ required: true, message: "请输入详情" }],
  };

  return (
    <div className="dynamicFormTest">
      <AdDynamicForm ref={antdFormRef} rules={rules} items={formItems} />
      <div
        className="footer"
        style={{
          display: "flex",
          gap: "5px",
        }}
      >
        <Button
          color={"green"}
          variant={"outlined"}
          onClick={() => {
            const res = useForm.getValues();
            console.log(res);
          }}
        >
          getData
        </Button>
        <Button
          color={"orange"}
          variant={"outlined"}
          onClick={() => {
            useForm.setValues({
              username: "antd",
              password: "I love you",
            });
          }}
        >
          setData
        </Button>
        <Button
          color={"blue"}
          variant={"outlined"}
          onClick={() => {
            antdFormRef.current
              ?.validator()
              .then((v) => {
                console.log(v);
              })
              .catch((r) => {
                console.log(r);
              });
          }}
        >
          validator
        </Button>
        <Button
          color={"red"}
          variant={"outlined"}
          onClick={() => {
            useForm.onReset();
          }}
        >
          reset
        </Button>
        <Button
          variant={"outlined"}
          onClick={() => {
            useForm.setDisabled(true);
          }}
        >
          setDisabled
        </Button>
      </div>
    </div>
  );
};

export default AllForm;
```

:::

</template>
</BlockOther>