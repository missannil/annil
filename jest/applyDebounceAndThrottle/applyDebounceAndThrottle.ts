import { DefineComponent, RootComponent, SubComponent } from "../../src";

const sub = SubComponent<
  Root,
  {
    properties: { sub_debounced: number; sub_throttle: number };
    customEvents: { sub_onTapDebounced: undefined; sub_onTapThrottled: undefined };
  }
>()({
  data: {
    sub_debounced: 0,
    sub_throttle: 0,
  },
  methods: {
    sub_addDebounced() {
      this.data.sub_debounced++;
    },
    sub_addThrottled() {
      this.data.sub_throttle++;
    },
    sub_xxx_debounced() {
      this.sub_addDebounced();
    },
    sub_xxx_throttled500() {
      this.sub_addThrottled();
    },
  },
  events: {
    sub_onTapDebounced() {
      this.sub_xxx_debounced();
    },
    sub_onTapThrottled() {
      this.sub_xxx_throttled500();
    },
  },
});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  data: {
    debounced: 0,
    throttle: 0,
  },
  methods: {
    addDebounced() {
      this.data.debounced++;
    },
    addThrottled() {
      this.data.throttle++;
    },
    xxx_debounced() {
      this.addDebounced();
    },
    xxx_throttled500() {
      this.addThrottled();
    },
  },
  events: {
    onTapDebounced() {
      this.xxx_debounced();
    },
    onTapThrottled() {
      this.xxx_throttled500();
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [sub],
});
