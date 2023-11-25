export type SubComputedConstraint<obj extends object> = { [k in keyof obj]?: () => obj[k] };
