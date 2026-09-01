// import { typeEqual, type Test } from "hry-types";

export type Validators<L extends unknown[]> = L extends [infer Head, ...infer Tail extends unknown[]]
  ? unknown extends Head ? Validators<Tail> : Head
  : unknown;

// type list = [1, 2, 3];

// type list2 = [unknown, 1, 2];

// type lll = Validators<list>;

// typeEqual<lll, 1>;

// type lll2 = Validators<list2>;

// typeEqual<lll2, 1>;
