import { MainComponent, type SpecificType } from "../../../..";
import type { Mock_User } from "../../../../common_types/mockData";

/**
 * 组件时
 */
MainComponent({
  properties: {
    str: String,
    obj: Object,
    union: {
      type: Object as SpecificType<Mock_User>,
      value: { id: "001", name: "zhao" },
    },
  },
  lifetimes: {
    beforeCreate() {
      1;
    },
    created() {
      1;
    },
    attached() {
      1;
    },
    ready() {
      1;
    },
    detached() {
      1;
    },
    error(err) {
      err;
    },
    moved() {
      1;
    },
  },
  pageLifetimes: {
    load() {
      1;
    },
    hide() {
      1;
    },
    resize(size) {
      size;
    },
    show() {
      1;
    },
  },
});
