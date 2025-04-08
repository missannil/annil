import type { FinalOptionsOfComponent } from ".";

// 内部字段
const internalFiled = {
  methods: ["disposer", "__computedUpdater__"],
  data: ["__computedCache__", "__watchOldValue__"], // "__throttleDebounce__" 放在之前的位置验证
};

/**
 * 报错的形式避免输入字段和内部字段冲突,保证config下不包含内部预定字段(列表)
 */
export function InternalFieldProtection(finalOptionsForComponent: FinalOptionsOfComponent) {
  const methodsFieldKeys = Object.keys(finalOptionsForComponent.methods);
  const dataFieldKeys = Object.keys(finalOptionsForComponent.data);

  for (const key of methodsFieldKeys) {
    if (internalFiled.methods.includes(key)) {
      throw Error(`methods配置中的${key}字段已被内部字段占用`);
    }
  }
  for (const key of dataFieldKeys) {
    if (internalFiled.data.includes(key)) {
      /* istanbul ignore next 同上*/
      throw Error(`data配置中的${key}字段已被内部字段占用`);
    }
  }
}
