export type RemovePrefix<T extends object, Tag extends string = "_"> = {
  [k in keyof T as k extends `${string}${Tag}${infer Key}` ? Key : k]: T[k];
};
