import type { DetailedType } from "../../../../types/DetailedType";
import { typeEqual } from "../../../../utils/typeEqual";
import type { CustomEventConstraint } from "../CustomEventConstraint";
import type { GetCustomEventsDef } from "../GetCustomEventDef";
import type { GetCustomEventDoc } from "../GetCustomEventDoc";

type StressEvents<Prefix extends string> =
  & Record<`${Prefix}_simple`, DetailedType<number>>
  & Record<`${Prefix}_bubbles`, {
    detail: DetailedType<string>;
    options: { bubbles: true };
  }>
  & Record<`${Prefix}_capture`, {
    detail: null;
    options: { capturePhase: true };
  }>
  & Record<`${Prefix}_bubblesCapture`, {
    detail: DetailedType<string | number>;
    options: { bubbles: true; capturePhase: true };
  }>
  & Record<`${Prefix}_bubblesComposed`, {
    detail: DetailedType<"enabled" | "disabled">;
    options: { bubbles: true; composed: true };
  }>
  & Record<`${Prefix}_captureComposed`, {
    detail: DetailedType<boolean>;
    options: { capturePhase: true; composed: true };
  }>
  & Record<`${Prefix}_bubblesCaptureComposed`, {
    detail: DetailedType<string[]>;
    options: { bubbles: true; capturePhase: true; composed: true };
  }>;

type ResolvedEvents<TEvents extends CustomEventConstraint> = [
  GetCustomEventsDef<TEvents>,
  GetCustomEventDoc<TEvents>,
];

type EventsOne = StressEvents<"one">;
type EventsTwo = StressEvents<"two">;
type EventsThree = StressEvents<"three">;
type EventsFour = StressEvents<"four">;
type EventsFive = StressEvents<"five">;
type EventsSix = StressEvents<"six">;

void typeEqual<ResolvedEvents<EventsOne>, ResolvedEvents<EventsOne>>;
void typeEqual<ResolvedEvents<EventsTwo>, ResolvedEvents<EventsTwo>>;
void typeEqual<ResolvedEvents<EventsThree>, ResolvedEvents<EventsThree>>;
void typeEqual<ResolvedEvents<EventsFour>, ResolvedEvents<EventsFour>>;
void typeEqual<ResolvedEvents<EventsFive>, ResolvedEvents<EventsFive>>;
void typeEqual<ResolvedEvents<EventsSix>, ResolvedEvents<EventsSix>>;
