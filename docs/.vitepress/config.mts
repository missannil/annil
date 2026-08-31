import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Annil',
  description: '微信小程序原生TypeScript框架',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/what-is-annil' },
      { text: 'API', link: '/api/overview' },
      { text: '示例', link: '/examples/overview' },
      { text: '更新日志', link: 'https://github.com/missannil/annil/blob/main/CHANGELOG.md' },
      { text: 'GitHub', link: 'https://github.com/missannil/annil' }
    ],
    sidebar: {
      guide: [
        {
          text: '指南',
          'collapsed': false,
          items: [
            { text: '什么是 Annil', link: '/guide/what-is-annil' },
            { text: '安装与配置', link: '/guide/getting-started' },
            // { text: '设计理念', link: '/guide/design-idea' }
          ]
        }
      ],
      api: [
        {
          text: '组件构建',
          'collapsed': false,
          items: [
            { text: 'DefineComponent', link: '/api/define-component' },
            { text: 'RootComponent', link: '/api/root-component' },
            { text: 'CustomComponent', link: '/api/custom-component' },
            { text: 'ChunkComponent', link: '/api/chunk-component' },
          ]
        },
        {
          text: '组件注入',
          'collapsed': false,
          items: [
            { text: 'IInjectInfo', link: '/api/instance-api' },
            { text: 'instanceConfig', link: '/api/instance-config' },
          ]
        },

        {
          text: '包装函数',
          'collapsed': false,
          items: [
            { text: 'navigateTo', link: '/api/navigation' },
            { text: 'navigateBack', link: '/api/navigation' },
            { text: 'redirectTo', link: '/api/navigation' }
          ]
        },
        {
          text: '工具函数',
          'collapsed': false,
          items: [
            { text: 'debounce', link: '/api/navigation' },
            { text: 'deepClone', link: '/api/navigation' },
            { text: 'throttle', link: '/api/navigation' },
            { text: 'deepEqual', link: '/api/navigation' },
            { text: 'isEmptyObject', link: '/api/navigation' },
            { text: 'nonNullable', link: '/api/navigation' },
            { text: 'typeEqual', link: '/api/navigation' }
          ]
        }
      ],
      examples: [
        {
          text: '示例',
          items: [
            { text: '总览', link: '/examples/overview' },
            { text: 'computed', link: '/examples/computed' },
            { text: 'watch', link: '/examples/watch' },
            { text: 'store', link: '/examples/store' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/missannil/annil' }
    ],
    search: {
      provider: 'local'
    }
  }
})
