import type { Func } from "hry-types/src/Misc/Func";
import type { FinalOptionsOfComponent } from "..";

/**
 * 劫持指定配置字段,在原有配置前执行指定函数
 */
export function hijack<T extends FinalOptionsOfComponent[keyof FinalOptionsOfComponent]>(
  config: T,
  field: keyof T,
  before: Func[],
  after: Func[] = [],
) {
  // @ts-ignore 隐式索引
  const originalFunc: Func | undefined = config[field];

  // @ts-ignore 隐式索引
  config[field] = function(...args: unknown[]) {
    before.forEach(func => func.call(this, ...args));

    if (originalFunc) originalFunc.apply(this, args);

    after.forEach(func => func.call(this, ...args));
  };

  return;
}
