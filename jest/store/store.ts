import { DefineComponent, RootComponent, SubComponent } from "../../src";
import { user } from "./user";

// const user = observable({
//   name: "zhao",
//   age: 10,
//   changeAge(num: number) {
//     this.age = num;
//   },
// });
const subA = SubComponent<typeof rootComponent, { properties: { aaa_name: string } }>()({
  store: {
    aaa_name: () => user.name,
  },
  lifetimes: {
    attached() {
      // console.log(this.data.aaa_name === "zhao"); // true
    },
  },
});
const rootComponent = RootComponent()({
  store: {
    age: () => user.age,
  },
  lifetimes: {
    attached() {
      setTimeout(() => {
        // console.log(this.data.age === 10); // true

        user.changeAge(20);

        // console.log(this.data.age === 20); // true
      }, 200);

      setTimeout(() => {
        // console.log(this.data.age === 20); // true

        // 取消监控
        this.disposer.age();

        user.changeAge(30);

        // console.log(this.data.age === 20); // true
      }, 400);
    },
  },
});

DefineComponent({
  name: "test",
  rootComponent,
  subComponents: [subA],
});
