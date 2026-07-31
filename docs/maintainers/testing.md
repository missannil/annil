# Testing

本文说明 Annil 的测试层次、验证入口和模拟环境边界。

## 1. 测试层次

### 类型测试

`src/**/*.test.ts` 由 TypeScript 编译器执行，不在 Jest `testMatch` 中。它们验证泛型推导、非法配置、实例类型、事件参数、`setData` 和组件文档。

### 运行时测试

`jest/**/*.test.ts` 使用 `miniprogram-simulate` 和配套 TypeScript、JSON、WXML fixture，验证实例数据、事件、生命周期、computed、watch、store、注入及内部保护。

### 构建验证

构建从 `src/index.ts` 的依赖图生成 JavaScript、声明文件和 source map。源码类型检查通过不代表发布声明入口正确，因此公共出口、构建配置或依赖变化必须执行构建。

## 2. 最低验证

| 变化                        | 验证                             |
| --------------------------- | -------------------------------- |
| 纯文档                      | dprint check                     |
| 纯类型约束                  | `pnpm check`                     |
| 运行时行为                  | `pnpm check` + 目标 Jest         |
| 跨阶段运行时管线            | 上述验证 + 相关完整 Jest 范围    |
| 公共出口或声明              | `pnpm check` + build             |
| TypeScript、peer 或构建依赖 | `pnpm check` + 完整 Jest + build |

先运行目标测试定位问题；发布候选的完整门禁见 Release 文档。

## 3. 覆盖率

Jest 当前要求全局 branches、functions、lines、statements 均达到 90%。发布流程使用独立配置生成 lcov 并上传 Codecov。

导航、第三方组件类型、注入示例和汇总入口等文件被排除，因此覆盖率数值不代表整个公共 API 获得等比例保障。

## 4. 模拟边界

`miniprogram-simulate` 和 jsdom 不等于真实微信环境：

- 页面生命周期、路由和系统返回不能被完整覆盖；
- 微信基础库版本差异不在 Jest 矩阵中；
- 第三方组件类型测试不验证第三方运行时；
- MobX 的微信 npm 构建问题不由普通 Jest 完整覆盖。

涉及这些区域时，应明确记录未覆盖边界，不能把模拟器通过表述为真机已验证。

## 5. Pull Request CI

面向 `main` 的代码 PR 当前执行依赖安装、ESLint、dprint check、TypeScript `--noEmit` 和 Jest coverage。纯文档变化由代码测试 workflow 忽略，文档使用独立部署 workflow。

仓库声明 pnpm package manager，但现有 Actions 与 ship 脚本主要使用 npm；这是当前基础设施事实，不在无关任务中顺便统一。
