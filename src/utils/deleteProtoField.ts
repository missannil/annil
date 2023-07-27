/**
 * 删除对象原型上的属性(只是上级原型)
 */
export function deleteProtoField<T extends object>(obj: T, key: keyof T) {
  Reflect.deleteProperty(Object.getPrototypeOf(obj), key);
}
