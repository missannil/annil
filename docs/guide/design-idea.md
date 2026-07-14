# 设计理念

## 组件类型系统

以往组件库会用文档来描述组件属性、事件等信息，开发者在使用时只能靠记忆或查文档来获取这些信息，且无法得到类型提示和类型检查。Annil 组件构建 API 设计时,就支持导入和生成组件类型,在使用第三方库时,也能得到类型提示和类型检查,极大提升开发体验和代码质量。

```ts
/**
 * wxml部分
 * <view id="{{cid}}">{{ description }}</view>;
 */
// ts部分
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
// 导出组件类型
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

## 新的组件构建方式

原生组件构建(Component)方式,所有配置字段写在一起,逻辑不清晰,不易维护。

Annil 把组件`.wxml`文件内容分为两部分 —— 根组件(root)和子组件(sub)。

根组件是一个抽象的概念,可以理解为非子组件。

子组件可以理解为当前组件使用到的自定义组件或指定id的原生组件。

一个组件的构建由根组件配置和子组件配置组成,这种方式对ts类型最友好,也使组件逻辑更清晰、易于管理。

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
