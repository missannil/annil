// annil disable unusedData
// annil disable suggestInternalData
import "miniprogram-simulate";

import { type IInjectInfo, instanceConfig, RootComponent } from "../../src";
import type { ChunkComponentDefinitionRuntime } from "../../src/api/ChunkComponent/ChunkComponentDefinitionRuntime";
import { normalizeOptions } from "../../src/api/DefineComponent/normalizeOptions";
import type { CustomEventConstraint } from "../../src/api/RootComponent/CustomEvents/CustomEventConstraint";
import type { RootComponentDefinitionRuntime } from "../../src/api/RootComponent/returnType";

describe("normalizeOptions", () => {
  test("同一个 RootComponent 定义可重复归一化", () => {
    const customEvents = {
      notify: String,
    } satisfies CustomEventConstraint;

    const rootComponent = RootComponent()({
      events: {
        onTap() {
          return "event";
        },
      },
      customEvents,
    });

    const runtimeRootComponent = rootComponent as unknown as RootComponentDefinitionRuntime;
    const firstOptions = normalizeOptions({ rootComponent: runtimeRootComponent });
    const secondOptions = normalizeOptions({ rootComponent: runtimeRootComponent });

    expect(firstOptions.methods.onTap()).toBe("event");
    expect(firstOptions.methods.notify).toBeDefined();
    expect(secondOptions.methods.onTap()).toBe("event");
    expect(secondOptions.methods.notify).toBeDefined();
  });

  test("归一化不修改注入配置", () => {
    const injectInfo = {
      data: {
        injected: "value",
      },
    };
    instanceConfig.setInjectInfo(injectInfo as unknown as IInjectInfo);

    const rootComponent = RootComponent()({
      data: {
        componentOnly: true,
      },
    });

    normalizeOptions({ rootComponent: rootComponent as unknown as RootComponentDefinitionRuntime });

    expect(injectInfo).toStrictEqual({
      data: {
        injected: "value",
      },
    });
  });

  test("子组件 events 只合并到 methods", () => {
    const subComponent = {
      events: {
        onTap() {
          return "event";
        },
      },
    } as unknown as ChunkComponentDefinitionRuntime;

    const options = normalizeOptions({ subComponents: [subComponent] });

    expect(options.methods.onTap()).toBe("event");
    expect(options).not.toHaveProperty("events");
  });
});
