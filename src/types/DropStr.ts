export type DropStr<S1 extends string, S2 extends string> = S1 extends `${infer Head}${S2}${infer Tail}`
  ? DropStr<`${Head}${Tail}`, S2>
  : S1;

// type lll = DropStr<"CatchAAACatchff", "Catch">; //=> "AAAff"
