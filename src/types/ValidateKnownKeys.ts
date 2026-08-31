export type ValidateKnownKeys<
  Input,
  Shape,
  InvalidKeys = Exclude<keyof Input, keyof Shape>,
> = [InvalidKeys] extends [never] ? Shape
  : `错误的字段${InvalidKeys & string}`;
