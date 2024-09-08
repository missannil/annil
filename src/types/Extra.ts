export type Extra<Prefix extends string> = { [K in `${Prefix}_isReady`]?: boolean };
