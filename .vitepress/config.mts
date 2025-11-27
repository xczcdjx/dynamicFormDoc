import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    title: "dynamicformdjx",
    description: "A VitePress Site",
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
                    {text: '案例', link: '/markdown-examples'}
                ],
                // 侧边栏
                sidebar: [
                    {
                        text: 'Examples',
                        items: [
                            // {text: 'Markdown Examples', link: '/markdown-examples'},
                            {text: '组件', link: '/base-examples'}
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
                    {text: 'Example', link: '/en/markdown-examples'}
                    // {text: 'Runtime API Examples', link: '/en/base-examples'}
                ],
                sidebar: [
                    {
                        text: 'Examples',
                        items: [
                            // {text: 'Markdown Examples', link: '/markdown-examples'},
                            {text: 'Component', link: '/en/base-examples'}
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
    build: {
        outDir: 'docs/.vitepress/dist'   //构建产物输出目录
    },
})
