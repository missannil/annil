import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Annil',
  description: '微信小程序原生开发插件',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/what-is-annil' },
      { text: 'API', link: '/api/overview' },
      { text: '示例', link: '/demo/overview' },
      { text: '更新日志', link: 'https://github.com/missannil/annil/blob/main/CHANGELOG.md' },
      { text: 'GitHub', link: 'https://github.com/missannil/annil' }
    ],

    sidebar: [
      {
        text: '快速开始',
        items: [
          { text: '什么是 Annil', link: '/guide/what-is-annil' },
          { text: '安装与配置', link: '/guide/getting-started' },
          { text: '设计理念', link: '/guide/design-idea' },
          { text: '文档部署', link: '/guide/docs-deploy' }
        ]
      },
      {
        text: 'API 文档',
        items: [
          { text: '总览', link: '/api/overview' },
          { text: 'DefineComponent', link: '/api/define-component' },
          { text: 'RootComponent', link: '/api/root-component' },
          { text: 'CustomComponent', link: '/api/custom-component' },
          { text: 'ChunkComponent', link: '/api/chunk-component' },
          { text: 'instanceConfig', link: '/api/instance-config' },
          { text: 'SubComponent（旧）', link: '/api/sub-component' },
          { text: 'wxSugar', link: '/api/wx-sugar' }
        ]
      },
      {
        text: '示例',
        items: [
          { text: '总览', link: '/demo/overview' },
          { text: 'computed', link: '/demo/computed' },
          { text: 'watch', link: '/demo/watch' },
          { text: 'store', link: '/demo/store' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/missannil/annil' }
    ],
    search: {
      provider: 'local'
    }
  }
})
