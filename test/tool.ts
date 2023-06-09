import { IfEqual, IsEqual } from 'hry-types';

export type ExpectEqual<A, B extends IfEqual<A, B, unknown, never>> = true;

export type AllExpectEqual<T extends true[]> = T;

export type ExpectNotEqual<A, B extends IsEqual<A, B> extends true ? never : unknown> = B;

export type ExpectTrue<T extends true> = T;

export type ExpectFalse<T extends false> = T;
