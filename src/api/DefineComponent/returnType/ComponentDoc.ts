type PrefixKey = `${string}_${string}`;

export type ComponentDoc = {
  properties?: Record<PrefixKey, unknown>;
  events?: Record<PrefixKey, unknown>;
};
