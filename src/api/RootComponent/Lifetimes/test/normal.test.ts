import { RootComponent } from "../../../..";

/**
 * 组件时(无ispage字段或为false)，lifetimes为官方约束 + beforeCreate声明周期
 */
RootComponent()({
  lifetimes: {
    // 新增声明周期用于查看实例初始化之前的配置文件
    beforeCreate(opitons) {
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
      err.cause;
    },
    moved() {
    },
  },
});
