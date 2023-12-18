export type Assign<O1, O2> = Omit<O1, keyof O2> & O2;
