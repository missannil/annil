# Changelog

### Bug Fixes

* 解决DetailedType不接收接口类型的错误 ([ae8acbf](https://github.com/missannil/annil/commit/ae8acbfc2e62f99db565c448ad9253aa549e78bb))

## [1.12.0-alpha.8](https://github.com/missannil/annil/compare/v1.12.0-alpha.7...v1.12.0-alpha.8) (2025-05-22)


### Miscellaneous Chores

* release 1.12.0-alpha.8 ([#245](https://github.com/missannil/annil/issues/245)) ([7a5d842](https://github.com/missannil/annil/commit/7a5d8422ed871e1fcd794efdc2a0250cd62a086f))

## [1.12.0-alpha.7](https://github.com/missannil/annil/compare/v1.12.0-alpha.6...v1.12.0-alpha.7) (2025-04-12)


### Features

* 去除DefineComponent中针对对象类型加入null ([#241](https://github.com/missannil/annil/issues/241)) ([091485e](https://github.com/missannil/annil/commit/091485e7327c3c94600d61c679e056df845f6222))
* 在attached周期结束后,如果实例的data字段没有attached字段,则加入attached:true,用于表明组件启动完毕. ([091485e](https://github.com/missannil/annil/commit/091485e7327c3c94600d61c679e056df845f6222))
* 计算属性初始化在attached周期,之前可能在attach周期会引发计算属性传值时,出现null导致错误的问题 ([091485e](https://github.com/missannil/annil/commit/091485e7327c3c94600d61c679e056df845f6222))

## [1.12.0-alpha.6](https://github.com/missannil/annil/compare/v1.12.0-alpha.5...v1.12.0-alpha.6) (2025-04-09)


### Features

* 增加导出typeEqual函数用于类型校验 ([e6b9ffc](https://github.com/missannil/annil/commit/e6b9ffc67b13572b47f7457d2cf9308be70fb7cc))


### Bug Fixes

* chunkComponent events字段和methods字段类型前缀错误 ([#239](https://github.com/missannil/annil/issues/239)) ([e6b9ffc](https://github.com/missannil/annil/commit/e6b9ffc67b13572b47f7457d2cf9308be70fb7cc))

## [1.12.0-alpha.5](https://github.com/missannil/annil/compare/v1.12.0-alpha.4...v1.12.0-alpha.5) (2025-04-08)


### Code Refactoring

* 重构 watch store computed 加入ChunkComponent SubComponent改为CustomComponent ([#236](https://github.com/missannil/annil/issues/236)) ([188853e](https://github.com/missannil/annil/commit/188853e17242e27ba5e50d5cfd513607ac674287))

## [1.12.0-alpha.4](https://github.com/missannil/annil/compare/v1.11.1-alpha.4...v1.12.0-alpha.4) (2025-02-24)


### Features

* 新功能 ([0da1832](https://github.com/missannil/annil/commit/0da1832b549a3b5b4e316ec8cf4866496900fc70))

## [1.11.1-alpha.4](https://github.com/missannil/annil/compare/v1.11.0-alpha.4...v1.11.1-alpha.4) (2025-02-24)


### Bug Fixes

* 计算属性依赖为undefined时的错误 ([f1798c0](https://github.com/missannil/annil/commit/f1798c04526975ef5986707684bbc5f3b94f2169))

## [1.11.0-alpha.4](https://github.com/missannil/annil/compare/v1.11.0-alpha.3...v1.11.0-alpha.4) (2025-01-14)


### Bug Fixes

* 类型修改 ([278058c](https://github.com/missannil/annil/commit/278058ccc13cae016bfcc9678875ed8c79a35472))


### Miscellaneous Chores

* release alpha.4 ([433779f](https://github.com/missannil/annil/commit/433779f12e7a3549a77d87c2663d37405ea2692f))

## [1.11.0-alpha.3](https://github.com/missannil/annil/compare/v1.11.0-alpha.3...v1.11.0-alpha.3) (2025-01-14)


### Bug Fixes

* 类型修改 ([278058c](https://github.com/missannil/annil/commit/278058ccc13cae016bfcc9678875ed8c79a35472))

## [1.11.0-alpha.3](https://github.com/missannil/annil/compare/v1.11.0-alpha.2...v1.11.0-alpha.3) (2025-01-13)


### Miscellaneous Chores

* release ([87d63f6](https://github.com/missannil/annil/commit/87d63f690a5bafdecf77a8f5c53bd43e0c7b4d82))

## [1.11.0-alpha.2](https://github.com/missannil/annil/compare/v1.11.0-alpha.1...v1.11.0-alpha.2) (2025-01-13)


### Miscellaneous Chores

* publish ([52c4258](https://github.com/missannil/annil/commit/52c42589cd0e6c4a513f628b1caa79885b1f376a))


### Continuous Integration

* 修改test时长为默认 ([4fde68d](https://github.com/missannil/annil/commit/4fde68d332ab78fc784cb32c82b8c4c8682b956c))

## [1.11.0-alpha.1](https://github.com/missannil/annil/compare/v1.10.1...v1.11.0-alpha.1) (2025-01-13)


### Features

* computedUpdater函数去除默认参数,修正Wm.Textarea类型 ([e32f965](https://github.com/missannil/annil/commit/e32f965f7cd21c0545c9eb87a8f8bd9de8d39327))
* slotComponents ([273d4c6](https://github.com/missannil/annil/commit/273d4c60a26f5105fd336510fca603d704db917c))

## [1.10.1](https://github.com/missannil/annil/compare/v1.10.0...v1.10.1) (2024-11-11)


### Bug Fixes

* 上次覆盖率没通过 ([d5b4f23](https://github.com/missannil/annil/commit/d5b4f2398974878ae92d87c4155265554e08e5e7))

## [1.10.0](https://github.com/missannil/annil/compare/v1.9.0...v1.10.0) (2024-11-11)


### Features

* 增加原生组件类型  Wm.Map,增加API navigateBack ([a58fed1](https://github.com/missannil/annil/commit/a58fed110582a6f5edd0013f920a69769d08e1a8))


### Bug Fixes

* _SubComponentType 增加undefined类型,subComponent组件配置增加与root数据字段和彼此内部字段重复检测 ([eacc152](https://github.com/missannil/annil/commit/eacc152c7a8fe8953202fa53aff2742c0066dccc))

## [1.9.0](https://github.com/missannil/annil/compare/v1.8.3...v1.9.0) (2024-10-23)


### Features

* api/navigateTo 改为wxSugar 增加导出redirectTo ([f5a6141](https://github.com/missannil/annil/commit/f5a61411fa903545de8460052ca3512923905388))


### Bug Fixes

* 增加对DefinedComponent 的 path字段检测(与实例的is比较) ([8460e4e](https://github.com/missannil/annil/commit/8460e4eb29ad21a2df7adf53bffeb4c887a122e9))

## [1.8.3](https://github.com/missannil/annil/compare/v1.8.2...v1.8.3) (2024-09-08)


### Bug Fixes

* 为subComponents内部组件类型增加 prefix_isReady?:boolean 字段。 ([e78041d](https://github.com/missannil/annil/commit/e78041d5f151d71c1d45652b0508aa4c2430ecde))

## [1.8.2](https://github.com/missannil/annil/compare/v1.8.1...v1.8.2) (2024-09-07)


### Bug Fixes

* 优化_SubComponentType类型,避免接口或类的类型由于无签名照成的报错 ([ab97097](https://github.com/missannil/annil/commit/ab970972717b08138c8438825a1e19f7e3dd7c38))

## [1.8.1](https://github.com/missannil/annil/compare/v1.8.0...v1.8.1) (2024-09-07)


### Bug Fixes

* 1.8.0发布问题,加入throttleDebounce测试用例,优化computed,提高覆盖率,依赖优化 ([67cfc49](https://github.com/missannil/annil/commit/67cfc4909acce7f5d4fe2d58b2d3b1d54b81163e))

## [1.8.0](https://github.com/missannil/annil/compare/v1.7.8...v1.8.0) (2024-09-06)


### Features

* customEvents字段增加debounce和throttle字段,配置后自定义函数变为节流或防抖函数 ([1599797](https://github.com/missannil/annil/commit/15997975291ecbf484dd22e50974a213ea5c9f35))

## [1.7.8](https://github.com/missannil/annil/compare/v1.7.7...v1.7.8) (2024-08-22)


### Bug Fixes

* 当SubComponents组件有后缀时,阻止穿透(_catch)事件类型被返回的错误 ([deab409](https://github.com/missannil/annil/commit/deab409c1116d2e810cc018797b6c38061701f25))

## [1.7.7](https://github.com/missannil/annil/compare/v1.7.6...v1.7.7) (2024-08-13)


### Bug Fixes

* 修复SubComponent中计算属性无法获取data和store中数据的错误。 ([014a375](https://github.com/missannil/annil/commit/014a375de3ae657740b185b91f41e1215ef80ace))

## [1.7.6](https://github.com/missannil/annil/compare/v1.7.5...v1.7.6) (2024-08-10)


### Bug Fixes

* 1.7.6 ([e0e83c7](https://github.com/missannil/annil/commit/e0e83c7f44512abe9475d93b051a4e3364513b79))

## [1.7.5](https://github.com/missannil/annil/compare/v1.7.5-beta.4...v1.7.5) (2024-08-08)


### Miscellaneous Chores

* 更改README,SubComponentDoc-&gt;SubComponentType,RootComponentDoc->RootComponentType ([073d273](https://github.com/missannil/annil/commit/073d2733f5b15923d67f3a04a7a15902f73a9205))

## [1.7.5-beta.4](https://github.com/missannil/annil/compare/v1.7.5-beta-3...v1.7.5-beta.4) (2024-08-07)


### Miscellaneous Chores

* 小程序不支持2022打包 ([#187](https://github.com/missannil/annil/issues/187)) ([8e2bd2c](https://github.com/missannil/annil/commit/8e2bd2c074d0870b9c45631feb214e6e460565eb))

## [1.7.5-beta-3](https://github.com/missannil/annil/compare/v1.7.5-beta.0...v1.7.5-beta-3) (2024-08-06)


### Miscellaneous Chores

* 测试 ([#185](https://github.com/missannil/annil/issues/185)) ([7da9fc8](https://github.com/missannil/annil/commit/7da9fc8d0f84167554f95a856da71310207a77fa))
* 测试自定义3 ([b25df03](https://github.com/missannil/annil/commit/b25df0368785499537405415072e48ea842893c7))
* 自定义发布 ([8fd8020](https://github.com/missannil/annil/commit/8fd802092f4d2f8d784c1530d0cd6ffdd178790a))

## [1.7.5-beta.0](https://github.com/missannil/annil/compare/v1.7.5-beta.0...v1.7.5-beta.0) (2024-08-06)


### Miscellaneous Chores

* 测试自定义3 ([b25df03](https://github.com/missannil/annil/commit/b25df0368785499537405415072e48ea842893c7))

## [1.7.5-beta.0](https://github.com/missannil/annil/compare/v1.7.4...v1.7.5-beta.0) (2024-08-06)


### Miscellaneous Chores

* 测试自定义发布 ([d179ebd](https://github.com/missannil/annil/commit/d179ebd36219bec5c92864fd3e2989913ade33a2))

## [1.7.4](https://github.com/missannil/annil/compare/v1.7.3...v1.7.4) (2024-06-30)


### Bug Fixes

* jest.config.ts的transform项修复,update typescript version from 5.3.2 to 5.5.2 ([00e221c](https://github.com/missannil/annil/commit/00e221ca37b042f042715b26dd5d158c0671a30e))

## [1.7.3](https://github.com/missannil/annil/compare/v1.7.2...v1.7.3) (2024-05-03)


### Bug Fixes

* 优化计算属性依赖 ([017ad55](https://github.com/missannil/annil/commit/017ad55d0bc3edcc2cdeec68474adba766da57b7))

## [1.7.2](https://github.com/missannil/annil/compare/v1.7.1...v1.7.2) (2024-04-30)


### Bug Fixes

* 1. 计算属性依赖优化和返回值为代理的问题 ([6f28738](https://github.com/missannil/annil/commit/6f28738256c1884334b440271741ee1efb9e5519))

## [1.7.1](https://github.com/missannil/annil/compare/v1.7.0...v1.7.1) (2024-04-12)


### Bug Fixes

* 1.7.0action发布时npm密钥过期问题 ([0ad71b9](https://github.com/missannil/annil/commit/0ad71b96aaa02668a4052cd57ea2ff8c46598107))

## [1.7.0](https://github.com/missannil/annil/compare/v1.6.5...v1.7.0) (2024-04-11)


### Features

* subComponent的inherit字段加入数组类型,表示联合类型 ([a7930ff](https://github.com/missannil/annil/commit/a7930ff1abe18579bff6f1746911c2f30274325b))

## [1.6.5](https://github.com/missannil/annil/compare/v1.6.4...v1.6.5) (2024-02-13)


### Bug Fixes

* computed 依赖优化 ([cff7833](https://github.com/missannil/annil/commit/cff7833196fc2df52ae769211a3c5893f67aa2ab))

## [1.6.4](https://github.com/missannil/annil/compare/v1.6.3...v1.6.4) (2024-02-12)


### Bug Fixes

* comouted属性初始化依赖去重bug,并添加更新时去重 ([f228e55](https://github.com/missannil/annil/commit/f228e551dce65d97450b9a1aa3c7b3d3eb3e8199))

## [1.6.3](https://github.com/missannil/annil/compare/v1.6.2...v1.6.3) (2024-02-05)


### Bug Fixes

* 计算属性优化 ([2479d08](https://github.com/missannil/annil/commit/2479d08720b2e69782c063b5fde394f0fa35d28a))

## [1.6.2](https://github.com/missannil/annil/compare/v1.6.1...v1.6.2) (2024-02-03)


### Bug Fixes

* 去除this.data、observer参数,watch参数的readonlyDeep类型 ([4df6fd1](https://github.com/missannil/annil/commit/4df6fd117e573980293e609dc422c2d5f4a91c32))

## [1.6.1](https://github.com/missannil/annil/compare/v1.6.0...v1.6.1) (2024-02-02)


### Bug Fixes

* 修正自定义事件文档类型,去除readonlyDeep ([b4d329b](https://github.com/missannil/annil/commit/b4d329b8c1b90407fd714fa42784c2dcb0c705f8))
* 用deepClone代替unwarp以修复计算属性返回数据包含代理对象 ([38cc56a](https://github.com/missannil/annil/commit/38cc56a477a8adcaaf73f4cbef44cd8b701a175d))

## [1.6.0](https://github.com/missannil/annil/compare/v1.5.15...v1.6.0) (2024-02-01)


### Features

* 组件实例增加cloneData字段 ([a2bc52d](https://github.com/missannil/annil/commit/a2bc52de20649a735ec860cdaae2bb411028b5fe))

## [1.5.15](https://github.com/missannil/annil/compare/v1.5.14...v1.5.15) (2024-01-15)


### Bug Fixes

* subComputed约束 去除默认{} ([054cb48](https://github.com/missannil/annil/commit/054cb482cdc6c84e820d69d163b9cafe0c01de81))

## [1.5.14](https://github.com/missannil/annil/compare/v1.5.13...v1.5.14) (2024-01-15)


### Bug Fixes

* subComponents的data字段和store字段加入isReady字段和内部字段 ([06a22e0](https://github.com/missannil/annil/commit/06a22e0faff21dbc1e96862f190b2af11db55603))

## [1.5.13](https://github.com/missannil/annil/compare/v1.5.12...v1.5.13) (2024-01-12)


### Bug Fixes

* 修改自定义事件detail类型为ReadOnlyDeep,以便调用时可传入实例中的data类型(都是ReadOnlyDeep的) ([428710e](https://github.com/missannil/annil/commit/428710ea84717c45361d1e6c9c7db46c693026a9))

## [1.5.12](https://github.com/missannil/annil/compare/v1.5.11...v1.5.12) (2024-01-12)


### Bug Fixes

* setData时data中的数据类型不是组件类型的错误 ([871ac43](https://github.com/missannil/annil/commit/871ac439d1786cb74fb752e353a1f953d11de780))

## [1.5.11](https://github.com/missannil/annil/compare/v1.5.10...v1.5.11) (2024-01-08)


### Bug Fixes

* 去除__computedStatus__,修复observers中this.setData不触发 ([8296972](https://github.com/missannil/annil/commit/829697261f708089294a122a462dfc85ac9df911))

## [1.5.10](https://github.com/missannil/annil/compare/v1.5.9...v1.5.10) (2024-01-08)


### Bug Fixes

* 同一组件多次复用时 computed和watch的问题 ([e996f10](https://github.com/missannil/annil/commit/e996f10369dc5fc64225f573a9f28c3c542c7226))

## [1.5.9](https://github.com/missannil/annil/compare/v1.5.8...v1.5.9) (2024-01-06)


### Bug Fixes

* 无注入数据时 watch监控类型错误的问题和SubComponentdata数据为字面量类型造成实例类型错误的问题 ([3cb2b90](https://github.com/missannil/annil/commit/3cb2b9069a9aa0f95767a346f16634d4db3109f9))

## [1.5.8](https://github.com/missannil/annil/compare/v1.5.7...v1.5.8) (2024-01-05)


### Bug Fixes

* 1.5.7不设置inject引发的问题 ([ff04ae2](https://github.com/missannil/annil/commit/ff04ae213020c2c9e985a3c0fdbe33d323cd36e4))

## [1.5.7](https://github.com/missannil/annil/compare/v1.5.6...v1.5.7) (2024-01-05)


### Bug Fixes

* rename ComponentDocExtension to DocAssign ([d933e0b](https://github.com/missannil/annil/commit/d933e0bff67a52d5f6ed9c00c60f7d2a2232aca0))

## [1.5.6](https://github.com/missannil/annil/compare/v1.5.5...v1.5.6) (2024-01-03)


### Bug Fixes

* 修复RootCOmonent在properties的可选数组类型时,value验证错误的问题 ([b836e83](https://github.com/missannil/annil/commit/b836e83916a6649b004646893ad91350787c9421))

## [1.5.5](https://github.com/missannil/annil/compare/v1.5.4...v1.5.5) (2024-01-01)


### Bug Fixes

* 修复isPage错误 ([301366d](https://github.com/missannil/annil/commit/301366d9b30f909c59db727db53847bd789cb144))

## [1.5.4](https://github.com/missannil/annil/compare/v1.5.3...v1.5.4) (2023-12-25)


### Bug Fixes

* isPagecheck ([03f6452](https://github.com/missannil/annil/commit/03f64523dc5f7da32616ec5c0ecfc4f50d4d4b7d))

## [1.5.3](https://github.com/missannil/annil/compare/v1.5.2...v1.5.3) (2023-12-22)


### Bug Fixes

* verbatimModuleSyntax:true ([486cf8d](https://github.com/missannil/annil/commit/486cf8dff98320eb5534ec01994a467ec75f5ced))
* 去除verbatimModuleSyntax ([8687d3d](https://github.com/missannil/annil/commit/8687d3dab606593def0626eccd39830c806f5f1d))

## [1.5.2](https://github.com/missannil/annil/compare/v1.5.1...v1.5.2) (2023-12-22)


### Bug Fixes

* 修复 ([7b6f25a](https://github.com/missannil/annil/commit/7b6f25a98fe8094e8ae0a1819c4f4e54e390aa96))

## [1.5.1](https://github.com/missannil/annil/compare/v1.5.0...v1.5.1) (2023-12-19)


### Bug Fixes

* 修复 ([4a63e10](https://github.com/missannil/annil/commit/4a63e100831cd4f78b04a463357ecab34c78c1e1))

## [1.5.0](https://github.com/missannil/annil/compare/v1.4.0...v1.5.0) (2023-12-18)


### Features

* 新增组件实例全局注入功能 ([2e44e57](https://github.com/missannil/annil/commit/2e44e574d761d8f640d5f58e3984af8c86b94ec3))


### Bug Fixes

* 修复依赖，把hry-types放到peer中 ([2e44e57](https://github.com/missannil/annil/commit/2e44e574d761d8f640d5f58e3984af8c86b94ec3))

## [1.4.0](https://github.com/missannil/annil/compare/v1.3.1...v1.4.0) (2023-12-17)


### Features

* computed函数中this.data子字段设置为只读 ([66ac333](https://github.com/missannil/annil/commit/66ac333c63edd6d3e922c4691afe5c2f85c6972a))


### Bug Fixes

* 修复jest报错‘ ([66ac333](https://github.com/missannil/annil/commit/66ac333c63edd6d3e922c4691afe5c2f85c6972a))

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
