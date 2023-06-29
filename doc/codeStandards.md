### 类型命名

大驼峰

### 变量命名

下划线

### 函数命名

大驼峰

### 复杂泛型

文件夹下index.ts

### 泛型测试文件

复杂类型下建立test文件夹用以测试子泛型,测试泛型文件名与被测试文件名相同，后缀为.test.ts

### 泛型库

hry-types

### 代码注释

看懂即可

### 代码风格

exlint tslint

### 代码格式化

dprint

### 泛型判断

更加情况

1. IfExtends

```ts
type foo = IfExtends<1, string, true, false>; // true
type bar = IfExtends<unknown, unknown, "isUnknown", "NonUnknown">; // "isUnknown"
```

2. IfEquals 使用时注意交叉对象判断前要使用 MergeIntersection

```ts
type foo = IfEquals<
  { num: number } & { str: string },
  { num: number; str: string },
  true,
  false
>; // false

type foo = IfEquals<
  MergeIntersection<{ num: number } & { str: string }>,
  { num: number; str: string },
  true,
  false
>; // false
type bar = IfEquals<unknown, unknown, "isUnknown", "NonUnknown">; // "isUnknown"
```

3. extends

```ts
```
