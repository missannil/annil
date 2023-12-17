# Changelog

### Bug Fixes

* 解决DetailedType不接收接口类型的错误 ([ae8acbf](https://github.com/missannil/annil/commit/ae8acbfc2e62f99db565c448ad9253aa549e78bb))

## [1.3.1](https://github.com/missannil/annil/compare/v1.3.0...v1.3.1) (2023-12-17)


### Bug Fixes

* computed函数中this.data子字段改为只读。 ([20f3244](https://github.com/missannil/annil/commit/20f3244a6c1c22dd5b347b24be6f24265bebca8d))

## [1.3.0](https://github.com/missannil/annil/compare/v1.3.0-dev.202312100...v1.3.0) (2023-12-14)


### Features

* watch支持配置单个字段监控多个数据,但没有类型提示  计算属性初始化改为beforeCreated ([cbf50e8](https://github.com/missannil/annil/commit/cbf50e8234d65abb420e76057229fbe738b2ad93))

## [1.3.0-dev.202312100](https://github.com/missannil/annil/compare/v1.2.2-dev.202312100...v1.3.0-dev.202312100) (2023-12-11)


### Features

* watch支持配置单个字段监控多个数据,但没有类型提示 ([37db28a](https://github.com/missannil/annil/commit/37db28a87a7f3af145a7c141e05d2a3b35e6bcb7))

## [1.2.2-dev.202312100](https://github.com/missannil/annil/compare/v1.2.1...v1.2.2-dev.202312100) (2023-12-10)


### type

* 修改了customEvents字段的类型,允许undefined类型 ([2c1c35a](https://github.com/missannil/annil/commit/2c1c35a8581016c2e0eb9cfeb01f2ed6e4f8d53c))

## [1.2.1](https://github.com/missannil/annil/compare/v1.2.0...v1.2.1) (2023-12-09)


### Bug Fixes

* 修复计算属性中使用this的问题 ([d9d1635](https://github.com/missannil/annil/commit/d9d1635489a8a4fb4db9c387c2b3e182ea415445))

## [1.2.0](https://github.com/missannil/annil/compare/v1.2.0-beta.4...v1.2.0) (2023-12-07)


### Miscellaneous Chores

* release-please.yml 增加dev和rc发版配置 ([02c0215](https://github.com/missannil/annil/commit/02c0215fee0664d65b74a25ecb3ad571f6ddaad6))

## [1.2.0-beta.4](https://github.com/missannil/annil/compare/v1.2.0-beta.3...v1.2.0-beta.4) (2023-12-07)


### Miscellaneous Chores

* verison test ([d1f34b0](https://github.com/missannil/annil/commit/d1f34b06c26eb186378261809da9e4eeab5a2553))

## [1.2.0-beta.3](https://github.com/missannil/annil/compare/v1.2.0-beta.1...v1.2.0-beta.3) (2023-12-07)


### Miscellaneous Chores

* test beta ([a87e793](https://github.com/missannil/annil/commit/a87e793601986aca1544506f2bf659420879e741))

## [1.2.0-beta.1](https://github.com/missannil/annil/compare/v1.2.0-beta.0...v1.2.0-beta.1) (2023-12-07)


### Bug Fixes

* 组件/页面接受load和onLoad是参数解析的问题 ([d4b13f9](https://github.com/missannil/annil/commit/d4b13f95679dd5ea81f872991403fe4bb3cfd448))

## [1.2.0-beta.0](https://github.com/missannil/annil/compare/v1.1.2...v1.2.0-beta.0) (2023-12-07)


### Features

* 页面onLoad和组件pageLifetimes.load周期参数使用encodeURI加密和解析 ([8b5cc6e](https://github.com/missannil/annil/commit/8b5cc6ee65abb0def005126c9382a07b8affc0ca))

## [1.1.2](https://github.com/missannil/annil/compare/v1.1.1...v1.1.2) (2023-12-06)


### Bug Fixes

* 测试load功能 ([bb3f0fd](https://github.com/missannil/annil/commit/bb3f0fd2315f2429488478047109b07d16686741))

## [1.1.1](https://github.com/missannil/annil/compare/v1.1.0...v1.1.1) (2023-12-04)


### Bug Fixes

* 修复1.1版本功能,原因为1.1发布时,功能代码没有提交 ([6aca053](https://github.com/missannil/annil/commit/6aca053a5914c5e6ccacfab8712c9c036e770177))

## [1.1.0](https://github.com/missannil/annil/compare/v1.0.8...v1.1.0) (2023-12-04)


### Features

* 计算属性支持this任意字段,之前只支持data字段 ([5ea92cb](https://github.com/missannil/annil/commit/5ea92cbf32f4892056474973c0a55be780f68894))

## [1.0.8](https://github.com/missannil/annil/compare/v1.0.7...v1.0.8) (2023-12-03)


### Bug Fixes

* 组件类型中别名被解析的问题 ([67e4886](https://github.com/missannil/annil/commit/67e48868b55853c41f5ad4c713dab12e31380f64))

## [1.0.7](https://github.com/missannil/annil/compare/v1.0.6...v1.0.7) (2023-12-02)


### Bug Fixes

* 修复DefinedComponent的subComonsnts字段为[never]类型时,生成page类型错误的情况 ([a8aec74](https://github.com/missannil/annil/commit/a8aec74bbe964585f71d96bebdc85a32241271aa))

## [1.0.6](https://github.com/missannil/annil/compare/v1.0.5...v1.0.6) (2023-12-02)


### Bug Fixes

* 修复 properties对象字段为字面量类型时value类型不匹配的问题 ([faa5c96](https://github.com/missannil/annil/commit/faa5c96c0c0af8112b7828911cc0d40f56903669))

## [1.0.5](https://github.com/missannil/annil/compare/v1.0.4...v1.0.5) (2023-12-02)


### Miscellaneous Chores

* 更改SpecificType为DetailedType ([b56a920](https://github.com/missannil/annil/commit/b56a920780f7dee1cb49ee166c624b609cfd8431))

## [1.0.4](https://github.com/missannil/annil/compare/v1.0.3...v1.0.4) (2023-11-30)


### Bug Fixes

* release.yml ([c8b68b6](https://github.com/missannil/annil/commit/c8b68b66a50f5834756ab9f0d926bc7f1be2f90e))
* yml ([e51c002](https://github.com/missannil/annil/commit/e51c00290d24d9372766e66e9c807e0c3d65429f))

## [1.0.1](https://github.com/missannil/annil/compare/v1.0.0...v1.0.1) (2023-11-27)


### Bug Fixes

* coverage ([e96ec6f](https://github.com/missannil/annil/commit/e96ec6f759640516f0084350ea726c47a4268362))
* yml ([ff6cff3](https://github.com/missannil/annil/commit/ff6cff375db10c396ea8707c12aa94b571762ddd))

## 1.0.0 (2023-11-25)


### Features

* 1.0.0 ([14c418f](https://github.com/missannil/annil/commit/14c418fa0341869f398fe68007155926222cb858))
