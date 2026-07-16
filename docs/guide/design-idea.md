# 设计思想

annil 旨在为原生小程序开发提供极致的类型安全,更清晰的组件结构,实现更好的开发体验和更高的代码质量。

## 极致的类型安全

```ts 组件A
// 原生构建组件方式
Component({
  properties: {
    num: {
      type: Number,
      values: "原生不报错,缺少字段和类型检查",
    },
  },
});
// Annil 构建组件方式
import { RootComponent } from "annil";
RootComponent()({
  properties: {
    str: {
      type: String,
      values: "字段错误",
      ^^^^^^
    },
    num: {
      type: Number,
      value: "类型错误", 
              ^^^^^^^
    },
  },
});
```

## 组件文档(类型)

以往组件库会用文档来描述组件所需属性、事件等信息，开发者在使用时只能靠记忆或查文档来获取这些信息，无法在代码中得到类型提示和类型检查。 Annil 在组件构建 API 设计时,就支持导入和生成组件类型,在引入第三方组件库时,也可通过泛型(CreateComponentDoc)定义第三方组件文档类型，这样在构建组件时就可以得到类型提示和类型检查,极大提升开发体验和代码质量。Annil 内部也提供原生组件类型和vant组件类型,并持续更新。

- **自定义组件文档(类型)**

在annil中,自定义组件文档类型是通过 `DefineComponent` 构建组件(页面)时,导出组件(页面)类型来实现的。组件类型包含了组件所需的属性(properties)、事件(events)等信息,如果是页面组件,则会有path属性,表示页面路径。

```ts
/**
 * wxml部分
 * <view id="{{cid}}">{{ description }}</view>;
 */
// 构建自定义组件时
import { DefineComponent, RootComponent, typeEqual } from "annil";
// 根组件配置
const rootComponent = RootComponent()({
  properties: {
    description: String,
  },
  // 声明组件事件和类型(e.detail)
  customEvents: {
    onAttached: String,
  },
  lifetimes: {
    attached() {
      this.onAttached(this.data.description); // 同原生this.triggerEvent("onAttached", this.data.description)
    },
  },
});
// 组件构建
const customA = DefineComponent({
  // 组件名称
  name: "customA",
  // 组件根配置
  rootComponent,
  // subComponents: [],
});
// 导出组件文档类型
export type $CustomA = {
  // 接收的外部传值
  properties: {
    // 选传属性
    cid?: string;
    // 必传属性
    description: string;
  };
  // 组件事件
  events: {
    onAttached: string;
  };
};
// 验证组件类型
typeEqual<$CustomA>()(customA);
```

```ts
// 构建页面组件时
import { DefineComponent, RootComponent, typeEqual } from "annil";

const rootComponent = RootComponent()({
  isPage: true,
  properties: {
    _activeTabIndex: {
      type: Number,
      value: 0,
    },
  },
});
// 页面组件构建
const indexPage = DefineComponent({
  // 页面路径
  path: "/pages/index/index",
  rootComponent,
  // subComponents: [],
});
// 导出页面组件类型
export type $Index = {
  path: "/pages/index/index";
  properties: {
    _activeTabIndex?: number;
  };
};
// 验证页面组件类型
typeEqual<$Index>()(indexPage);
```

- **原生组件(类型)**

```ts
// 为原生组件(Button)定义类型
import type { CreateComponentDoc } from "annil";

export type Button = CreateComponentDoc<"button", {
  properties: {
    /**
     * 标识符
     */
    id?: string;
    /**
     * 按钮类型
     */
    type?: "primary" | "warning" | "danger" | "info";
    /**
     * 按钮尺寸
     */
    size?: "normal" | "large" | "small" | "mini";
    /**
     * 按钮颜色 支持传入linear-gradient渐变色
     */
    color?: string;
    // ...没写全
  };
}>;
```

- **第三方组件库(类型)**

  ```ts
  import type { CreateComponentDoc } from "annil";
  /**
   * NoticeBar 通知栏
   *
   * 文档链接： https://github.com/youzan/vant-weapp/blob/dev/packages/notice-bar/README.md
   */
  export type NoticeBar = CreateComponentDoc<"noticeBar", {
    properties: {
      // 通知栏模式，可选值为 closeable link
      mode?: "closeable" | "link";
      text?: string;
      url?: string;
      openType?: string;
      delay?: number;
      speed?: number;
      scrollable?: boolean;
      leftIcon?: string;
      color?: string;
      backgroundColor?: string;
      background?: string;
      wrapable?: boolean;
    };
  }>;
  ```

## 结构更清晰的组件构建方式

原生组件构建(Component)方式,所有配置字段写在一起,组件结构不清晰,不易维护。

Annil 把组件`.wxml`文件内容分为两部分 —— 根组件(root)和子组件(sub)。

**根组件**是一个抽象的概念,可以理解为非子组件。

**子组件**可以理解为当前组件使用到的自定义组件或指定id的原生组件。

一个组件的构建由根组件配置和子组件配置组成,这种方式对ts类型最友好,也使组件逻辑更清晰、易于组件管理。

- **根组件配置**

  通过 `RootComponent` 配置根组件。负责声明外部传值(properties)、组件事件(customEvents)、组件公共状态(data、computed、stores)、公共方法(methods)等。 this(类型)上不会有子组件状态和方法。
  ```ts
  type Root = typeof rootComponent;
  const rootComponent = RootComponent()({
    properties: {
      cid: {
        type: String,
        value: "des",
      },
      gender: {
        type: String as DetailType<"male" | "female">,
        value: "female",
      },
    },
    data: {
      name: "Annil",
    },
    // ... 其他配置
  });
  ```

- **子组件配置**
  子组件分为两类: 一种是自定义组件(外部独立的组件),另一种是指定id的原生组件(内联原生组件)。

  通过 `CustomComponent` / `ChunkComponent` 配置子组件。this(类型)上可以获取到根组件的状态和方法。

  ```html
  <!-- wxml -->
  <view id="{{cid}}" >
    <customA description="{{ customA_description }}" />
    <view id="chunkA" >
      {{ chunkA_description }}
    </view>
    <!-- vant组件 -->
    <vant_noticeBar text="{{ noticeBar_text }}" />

  </view>
  ```
  ```ts
  const customA = CustomComponent<Root, $CustomA>()({
    computed: {
      customA_description() {
        return this.data.name + " is " + this.data.gender;
      },
    },
    // ... 其他配置
  });
  const chunkA = ChunkComponent<Root, "chunkA">()({
    computed: {
      chunkA_description() {
        return this.data.name + " is pretty";
      },
    },
    // ... 其他配置
  });
  // 引入第三方组件库 Vant 的组件 NoticeBar
  const vant_noticeBar = CustomComponent<Root, $NoticeBar>()({
    // ... 其他配置
    data: {
      noticeBar_text: "Annil is a great plugin",
    },
  });
  ```

- **组件构建**

  ```ts
  // 组件构建
  const des = DefineComponent()({
    name: "des",
    rootComponent,
    subComponents: [
      customA,
      chunkA,
      vant_noticeBar,
    ],
  });
  // 导出组件类型
  export type $Des = {
    properties: {
      xxx_gender?: string;
    };
  };
  // 验证组件类型
  typeEqual<$Des>()(des);
  ```

::: tip
对导出组件类型写法的解释

- 小程序导出组件类型的写法,受限于小程序的原生架构,直接导出变量可能引起组件渲染流程异常

例如:

```ts
// des.ts 导出组件
export const des = DefineComponent()({
  rootComponent,
  subComponents: [
    customA,
    chunkA,
    vant_noticeBar,
  ],
});
// xxx.ts 使用des组件
import { des } from "./path/des";
const description = CustomComponent<Root, typeof des>()({
  // ... 配置
});
```

- 为什么不直接导出类型,还要用 typeEqual<$Des>()(des)验证类型 这种书写方式呢?

```ts
const des = DefineComponent()({
  rootComponent,
  subComponents: [
    customA,
    chunkA,
    vant_noticeBar,
  ],
});
export type $Des = typeof des;
```

上面的写法,存在下面缺点:

1. 组件层数过深或组件递归时,会导致类型推导过程复杂,编译器解析速度缓慢或报错,开发体验差。
2. 不利于组件类型的阅读。

由于vscode插件和代码片段支持快速建立或书写组件,所以多出来的几行不会带来过多负担。
:::
