export type Has<S extends string, Target extends string> = S extends `${string}${Target}${string}` ? true : false;
