import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  data: {
    user: {
      age: 10,
      name: "zhao",
    },
  },
  computed: {
    keys() {
      return Object.keys(this.data.copyUser);
    },
    age() {
      return this.data.user.age;
    },
    copyUser() {
      return this.data.user;
    },
  },
});

DefineComponent({
  name: "computed",
  rootComponent,
  subComponents: [],
});
