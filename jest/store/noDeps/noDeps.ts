import { DefineComponent, RootComponent } from "../../../src";

const rootComponent = RootComponent()({
  store: {
    // getter 无任何 observable 依赖，应抛出错误
    noDepsField: () => "static value without any observable dependency",
  },
});

DefineComponent({
  name: "test",
  rootComponent,
});
