import {defineConfig} from 'vitepress'

const concatPath = (type: string, name: string, lang: string) => {
    const path = `/${type}/${name}`
    return lang ? `/${lang}${path}` : path
}
// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: "dynamicformdjx",
    description: "dynamicformdjx document",
    themeConfig: {
        socialLinks: [
            {icon: 'github', link: 'https://github.com/xczcdjx/dynamicForm'}
        ]
    },
    // 多语言路由
    locales: {
        root: {
            label: '简体中文',
            lang: 'zh-CN',
            themeConfig: {
                // 导航标题栏
                nav: [
                    {text: 'Vue3', link: '/v3/install'},
                    {text: 'Vue2', link: '/v2/install'},
                    {text: 'React', link: '/react/install'}
                ],
                sidebar: {
                    '/v3/': [
                        {
                            text: '安装 - Vue3',
                            link: concatPath('v3', 'install'),
                        },
                        {
                            text: '输入组件',
                            items: [
                                {text: '单输入', link: concatPath('v3', 'single-input')},
                                {text: '级联输入', link: concatPath('v3', 'cascade-input')},
                            ]
                        },
                        {
                            text: '表单组件',
                            items: [
                                {text: '与naive ui配合使用', link: concatPath('v3', 'dy-naiveUi-form')},
                                {text: '与element plus配合使用', link: concatPath('v3', 'dy-elementPlus-form')},
                                {text: 'Props', link: concatPath('v3', 'form-props')},
                            ]
                        },
                        {
                            text: '通用',
                            items: [
                                {text: 'Types', link: concatPath('v3', 'types')},
                                {text: 'Render2', link: concatPath('v3', 'render2')},
                                {text: 'Hooks', link: concatPath('v3', 'hooks')},
                            ]
                        }
                    ],

                    '/v2/': [
                        {
                            text: '安装 - Vue2',
                            link: concatPath('v2', 'install'),
                        },
                        {
                            text: '输入组件',
                            items: [
                                {text: '单输入', link: concatPath('v2', 'single-input')},
                                {text: '级联输入', link: concatPath('v2', 'cascade-input')},
                            ]
                        },
                    ],

                    '/react/': [
                        {
                            text: '安装 - React',
                            link: concatPath('react', 'install'),
                        },
                        {
                            text: '输入组件',
                            items: [
                                {text: '单输入', link: concatPath('react', 'single-input')},
                                {text: '级联输入', link: concatPath('react', 'cascade-input')},
                            ]
                        },
                    ],
                },
            }
        },
        en: {
            label: 'English',
            lang: 'en-US',
            // 对应 /en/ 下的内容
            themeConfig: {
                nav: [
                    {text: 'Vue3', link: '/en/v3/install'},
                    {text: 'Vue2', link: '/en/v2/install'},
                    {text: 'React', link: '/en/react/install'}
                ],
                sidebar: {
                    '/en/v3/': [
                        {
                            text: 'Install - Vue3',
                            link: concatPath('v3', 'install', 'en'),
                        },
                        {
                            text: 'Input Component',
                            items: [
                                {text: 'Single Component', link: concatPath('v3', 'single-input', 'en')},
                                {text: 'Cascade Component', link: concatPath('v3', 'cascade-input', 'en')},
                            ]
                        },
                        {
                            text: 'Form Component',
                            items: [
                                {text: 'With naive ui', link: concatPath('v3', 'dy-naiveUi-form', 'en')},
                                {text: 'With element plus', link: concatPath('v3', 'dy-elementPlus-form', 'en')},
                                {text: 'Props', link: concatPath('v3', 'form-props', 'en')},
                            ]
                        },
                        {
                            text: 'Common',
                            items: [
                                {text: 'Types', link: concatPath('v3', 'types', 'en')},
                                {text: 'Render2', link: concatPath('v3', 'render2', 'en')},
                                {text: 'Hooks', link: concatPath('v3', 'hooks', 'en')},
                            ]
                        }
                    ],

                    '/en/v2/': [
                        {
                            text: 'Install - Vue2',
                            link: concatPath('v2', 'install', 'en'),
                        },
                        {
                            text: 'Input Component (Vue2)',
                            items: [
                                {text: 'Single Component', link: concatPath('v2', 'single-input', 'en')},
                                {text: 'Cascade Component', link: concatPath('v2', 'cascade-input', 'en')},
                            ]
                        },
                    ],

                    '/en/react/': [
                        {
                            text: 'Install - React',
                            link: concatPath('react', 'install', 'en'),
                        },
                        {
                            text: 'Input Component (React)',
                            items: [
                                {text: 'Single Component', link: concatPath('react', 'single-input', 'en')},
                                {text: 'Cascade Component', link: concatPath('react', 'cascade-input', 'en')},
                            ]
                        },
                    ],
                },
            }
        }
    },
    vite: {
        ssr: {
            // 这里写你的库名
            noExternal: ['dynamicformdjx', 'naive-ui', 'element-plus', 'vueuc','vue-i18n']
        }
    },
    base: '/dynamicFormDoc/', // 仓库名
    /*build: {
        outDir: 'docs/.vitepress/dist'   //构建产物输出目录
    },*/
})
