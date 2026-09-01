import { RootComponent } from "../../../..";
import { typeEqual } from "../../../../utils/typeEqual";

/**
 * 组件时(无ispage字段或为false)，lifetimes为官方约束 + beforeCreate声明周期
 */
RootComponent()({
  lifetimes: {
    // 新增声明周期可用于查看或拓展配置文件
    beforeCreate(opitons) {
      void typeEqual<typeof this, undefined>;

      void opitons;
    },
    created() {
      void 0;
    },
    attached() {
      void 0;
    },
    ready() {
      void 0;
    },
    detached() {
      void 0;
    },
    error(err) {
      void err.message;
    },
    moved() {
      void 0;
    },
  },
});
