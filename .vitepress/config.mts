import {defineConfig} from 'vitepress'

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
                    {text: '主页', link: '/'},
                    {text: '案例', link: '/base-examples'}
                ],
                // 侧边栏
                sidebar: [
                    {
                        text: '案例',
                        items: [
                            // {text: 'Markdown Examples', link: '/markdown-examples'},
                            {text: '单组件', link: '/base-examples'},
                            {text: '级联组件', link: '/cascade-examples'}
                        ]
                    }
                ],
            }
        },
        en: {
            label: 'English',
            lang: 'en-US',
            // 对应 /en/ 下的内容
            themeConfig: {
                nav: [
                    {text: 'Home', link: '/en/'},
                    {text: 'Example', link: '/en/base-examples'}
                    // {text: 'Runtime API Examples', link: '/en/base-examples'}
                ],
                sidebar: [
                    {
                        text: 'Examples',
                        items: [
                            {text: 'Single Component', link: '/en/base-examples'},
                            {text: 'Cascade Component', link: '/en/cascade-examples'}
                        ]
                    }
                ],
            }
        }
    },
    vite: {
        ssr: {
            // 这里写你的库名
            noExternal: ['dynamicformdjx']
        }
    },
    base: '/dynamicFormDoc/', // 仓库名
    /*build: {
        outDir: 'docs/.vitepress/dist'   //构建产物输出目录
    },*/
})
