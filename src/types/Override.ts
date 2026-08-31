export type Override<O1, O2> = Omit<O1, keyof O2> & O2;
