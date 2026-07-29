# 源码索引

| 领域            | 源码                       | 文档                           | 代表性测试                                                     |
| --------------- | -------------------------- | ------------------------------ | -------------------------------------------------------------- |
| 公共导出        | `src/index.ts`             | `docs/api/overview.md`         | 各 API 测试                                                    |
| RootComponent   | `src/api/RootComponent/`   | `docs/api/root-component.md`   | `jest/computed/`、`jest/events/`、`jest/store/`、`jest/watch/` |
| CustomComponent | `src/api/CustomComponent/` | `docs/api/custom-component.md` | `jest/onlySubComonent/` 及字段相关测试                         |
| ChunkComponent  | `src/api/ChunkComponent/`  | `docs/api/chunk-component.md`  | `jest/chunkComponents/`                                        |
| DefineComponent | `src/api/DefineComponent/` | `docs/api/define-component.md` | `jest/isPageCheck/`、`jest/pagePathCheck/`                     |
| 实例注入        | `src/api/InstanceInject/`  | `docs/api/instance-config.md`  | `jest/inject/`                                                 |
| 导航            | `src/api/wxSugar.ts`       | `docs/api/navigation.md`       | 导航相关测试或源码契约                                         |
| 类型工具        | `src/types/`、`src/utils/` | 各 API 文档                    | 同名 `*.test.ts` 与使用点                                      |

## 阅读规则

- 先读 `src/index.ts` 判断是否为公共 API。
- 再读目标入口和直接引用的约束/返回类型。
- 测试只读取与目标行为最近的目录，不扫描全部 Jest fixture。
- 文档有示例但源码无对应能力时，不据此实现；先核对版本和测试。
