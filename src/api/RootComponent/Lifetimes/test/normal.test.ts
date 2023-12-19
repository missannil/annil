import { Checking, Test } from "hry-types";
import { RootComponent } from "../../../..";

/**
 * 组件时(无ispage字段或为false)，lifetimes为官方约束 + beforeCreate声明周期
 */
RootComponent()({
  lifetimes: {
    // 新增声明周期可用于查看或拓展配置文件
    beforeCreate(opitons) {
      Checking<typeof this, void, Test.Pass>;

      opitons;
    },
    created() {
    },
    attached() {
    },
    ready() {
    },
    detached() {
    },
    error(err) {
      err.message;
    },
    moved() {
    },
  },
});
