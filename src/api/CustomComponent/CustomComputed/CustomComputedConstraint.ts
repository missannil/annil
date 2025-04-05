export type CustomComputedConstraint<obj extends object> = { [k in keyof obj]?: () => obj[k] };
