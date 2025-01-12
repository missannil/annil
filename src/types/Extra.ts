export type Extra<Prefix extends string> = Partial<Record<`${Prefix}_isReady`, boolean>>;
