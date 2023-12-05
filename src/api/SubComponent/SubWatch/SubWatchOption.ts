import type { NoInfer } from "hry-types/src/Generic/NoInfer";
import type { WatchOption } from "../../RootComponent/Watch/WatchOption";

export type SubWatchOption<TWatchData extends object> = WatchOption<NoInfer<TWatchData>>;
