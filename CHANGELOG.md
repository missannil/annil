# Changelog

## [0.4.0](https://github.com/missannil/ts-wmp/compare/v0.3.0...v0.4.0) (2023-11-21)


### Features

* add APi navigateTo ([#28](https://github.com/missannil/ts-wmp/issues/28)) ([c4a4344](https://github.com/missannil/ts-wmp/commit/c4a43445ed5289a6eaa0fe56aab172cb1c29bf99))


### Bug Fixes

* 11 ([#11](https://github.com/missannil/ts-wmp/issues/11)) ([415e71f](https://github.com/missannil/ts-wmp/commit/415e71f23ad2b944437fc5533feb2794c0510ed8))
* 11 ([#13](https://github.com/missannil/ts-wmp/issues/13)) ([81c8a88](https://github.com/missannil/ts-wmp/commit/81c8a886a8feab1fa89e61f07c6e31db2c06a161))
* subComputed finished ([#24](https://github.com/missannil/ts-wmp/issues/24)) ([b6803ed](https://github.com/missannil/ts-wmp/commit/b6803ed7c39f5d8f2aea1e1c3118870c41df46d0))

## [0.3.0](https://github.com/missannil/ts-wmp/compare/v0.2.0...v0.3.0) (2023-07-11)


### Features

* : "MainCompoents加入computed字段" ([9f29bb8](https://github.com/missannil/ts-wmp/commit/9f29bb87be60f875b6ff0ee83fe8f18d6995cda2))
* add dataFields ([e97d508](https://github.com/missannil/ts-wmp/commit/e97d508f16bbd3c21b44797cdf66bc07a0697277))
* **api:** add MainComponent and InstanceInject ([13e5b99](https://github.com/missannil/ts-wmp/commit/13e5b99f0770b958eb7b86d0dd141bbf3ed07ab9))
* **DefineComponent:** 1.0 ([ed516b4](https://github.com/missannil/ts-wmp/commit/ed516b49b6c3b3f24a598602450714bda5745c3c))
* finished MainComponent ([e4e0526](https://github.com/missannil/ts-wmp/commit/e4e0526a14afc459b2921150d5d1a1e1a584e8ad))
* **SubComonent:** properties fields ([ca0148f](https://github.com/missannil/ts-wmp/commit/ca0148fc470e4f8885a8ef13337b1a6f9597caca))
* 加入customEvents字段和返回类型MainComponentDoc ([f8e3e1a](https://github.com/missannil/ts-wmp/commit/f8e3e1a007b937650594f6c015780dbdaf74321c))
* 加入events和methods字段 ([94224ef](https://github.com/missannil/ts-wmp/commit/94224ef8aaa943fab0b2fd30acb7b0fd5da2f6d6))
* 加入isPage和customEvents字段 ([abe671b](https://github.com/missannil/ts-wmp/commit/abe671b1d3041b39f6d872233e20ab3b84c83d02))


### Bug Fixes

* "DefineComponent"无字段时返回never,之前是{}} ([65271eb](https://github.com/missannil/ts-wmp/commit/65271ebfe1fb422a96e623a800a28f69ec23bd8c))
* computed中使用this.data时可选字段去除undefined类型 ([6cc4e77](https://github.com/missannil/ts-wmp/commit/6cc4e771df4aa7833cfeefe280b4e6dc82bfc4a3))
* **DefineComponent:** 修定义事件自字段联合变交叉 ([df289a9](https://github.com/missannil/ts-wmp/commit/df289a92a4fb89d1ff0ce6f7c3d81c0cf6dd296f))
* deps hry-types 0.10.1 ([e8120d6](https://github.com/missannil/ts-wmp/commit/e8120d611fbc044ca1d22d6d35050752300f4379))
* properites字段验证(引入hry-types)类型处理 ([de96f63](https://github.com/missannil/ts-wmp/commit/de96f637a4cd639a057627993e78b09429a93670))
* properties字段value类型只可以为type类型.若类型为必传纯对象类型则实际类型加入null。 ([43fa157](https://github.com/missannil/ts-wmp/commit/43fa157bc08aab741b9e05ea2c5c060f2e1dec94))
* properties字段加入value类型校验 ([a69a1eb](https://github.com/missannil/ts-wmp/commit/a69a1ebc148367343246a6b94cc59c9cc50270f6))
* properties必传字段为对象时,type字段若为纯对象则加入null ([40094eb](https://github.com/missannil/ts-wmp/commit/40094eb1317983fce989878beb5625d9e852bf60))
* watch filed ([12c402a](https://github.com/missannil/ts-wmp/commit/12c402a2b281cf462ab44aa86d1acd76399b8d32))


### Performance Improvements

* **api:** "InstanceInject" 加入watcch字段 ([eb8c735](https://github.com/missannil/ts-wmp/commit/eb8c73592f051e8a56007d7f38f1c985649a9128))
* data ([63a0450](https://github.com/missannil/ts-wmp/commit/63a0450774c882304a9b7500cf50a3f063220ed0))
* this.data ([35576f6](https://github.com/missannil/ts-wmp/commit/35576f6a0455ca502b4e5813fd897e1477ee503a))

## [0.2.0](https://github.com/missannil/ts-wmp/compare/v0.1.2...v0.2.0) (2023-06-10)


### Features

* mainprogram ([8951927](https://github.com/missannil/ts-wmp/commit/8951927d97bf9b672d34ae36970e2de4a180f34f))

## [0.1.2](https://github.com/missannil/ts-wmp/compare/v0.1.1...v0.1.2) (2023-06-09)


### Bug Fixes

* test ([67d91a6](https://github.com/missannil/ts-wmp/commit/67d91a681feca26271572bb2ad7492ebf05178ba))

## [0.1.1](https://github.com/missannil/ts-wmp/compare/v0.1.0...v0.1.1) (2023-06-09)


### Bug Fixes

* release ([3527e92](https://github.com/missannil/ts-wmp/commit/3527e920979ef02d0052d1014494c3687b175003))

## [0.1.0](https://github.com/missannil/ts-wmp/compare/v0.0.1...v0.1.0) (2023-06-09)


### Miscellaneous Chores

* release 0.1 ([01e65fc](https://github.com/missannil/ts-wmp/commit/01e65fc97a58c31b711d57adbcbb7ccfb2b34521))

## 0.0.1 (2023-06-09)


### Bug Fixes

* type-fest -&gt; hry-types ([19926da](https://github.com/missannil/ts-wmp/commit/19926daf9937a7c2111c226d4423fef35700c0f7))


### Continuous Integration

* release test ([3f39ff0](https://github.com/missannil/ts-wmp/commit/3f39ff0eef6ed45512d433f4e80049215da03129))


### Miscellaneous Chores

* release test ([a4c1457](https://github.com/missannil/ts-wmp/commit/a4c14577e07dbd2faa2e939a065bdfeb8b729e78))
* release test ([b41cc19](https://github.com/missannil/ts-wmp/commit/b41cc19e38b28616a14a968eceaddb8f90059700))
