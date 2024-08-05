/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  data: {
    obj: {
      user: {
        address: {
          city: "beijing",
        },
      },
    },
  },
  computed: {
    readonlyDeep() {
      try {
        this.data.obj.user.address.city = "shanghai";
      } catch {
        return "error";
      }

      return this.data.obj;
    },
  },
});
const readonlyDeep = DefineComponent({
  name: "readonlyDeep",
  rootComponent,
  // subComponents:[]
});
export type $ReadonlyDeep = typeof readonlyDeep;
