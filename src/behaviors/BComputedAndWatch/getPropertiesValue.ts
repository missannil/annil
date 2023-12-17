import type {
  PropertiesConstraint,
  PropertiesTypes,
  RequiredSingle,
  RequiredUnion,
} from "../../api/RootComponent/Properties/PropertiesConstraint";

type PropertiesDefaultValue = "" | 0 | [] | null | false;

/* istanbul ignore next */
function getRequiredSingleValue(
  PropType: RequiredSingle,
): PropertiesDefaultValue {
  switch (PropType) {
    case String:
      return "";
    case Number:
      return 0;
    case Array:
      return [];
    case Object:
      return null;
    case Boolean:
      return false;
    default:
      /* istanbul ignore next */
      throw Error(
        "properties字段类型只能为 String | Number | Array | Object | Boolean",
      );
  }
}
function IsRequiredSingle(config: PropertiesTypes): config is RequiredSingle {
  return config instanceof Function;
}
function IsRequiredUnion(config: PropertiesTypes): config is RequiredUnion {
  return !Reflect.has(config, "value");
}
export function getPropertiesValue(propertiesOpt: PropertiesConstraint | undefined): object | undefined {
  if (propertiesOpt === undefined) return;
  const result = {};
  for (const key in propertiesOpt) {
    const config = propertiesOpt[key];
    /* istanbul ignore next */
    if (IsRequiredSingle(config)) {
      // @ts-ignore 隐式索引
      result[key] = getRequiredSingleValue(config);
    } else if (IsRequiredUnion(config)) {
      // @ts-ignore 隐式索引
      result[key] = getRequiredSingleValue(config.type);
    } else {
      // @ts-ignore 隐式索引
      result[key] = config.value;
    }
  }

  return result;
}
