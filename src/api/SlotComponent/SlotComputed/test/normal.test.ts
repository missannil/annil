import { Checking } from "hry-types";
import type { ComputeObject } from "../../../../types/ComputeObj";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import { SlotComponent } from "../..";
import type { Mock_RootDoc, Mock_SubDoc } from "./mock";

SlotComponent<Mock_RootDoc, Mock_SubDoc, "slot">()({
  data: {
    slot_a: 1,
  },
  store: {
    slot_b: () => 1,
  },
  computed: {
    // 1. 可以使用Mock_RootDoc中的字段
    slot_aaa(): object | null {
      return this.data.optional_obj;
    },
    // 2. 可以使用Mock_SubDoc中的字段
    slot_bbb(): string | null {
      return this.data.aaa_str ?? null;
    },
    // 3. 可以使用data和store中的字段
    _slot_ccc(): number {
      return this.data.slot_a + this.data.slot_b;
    },
    // 4.可以使用computed中的字段
    _slot_ddd(): number {
      return this.data._slot_ccc + 1;
    },
    // 5. this.data
    slot_eee(): number {
      // 5 this.data
      void Checking<
        typeof this.data,
        ComputeObject<
          & { slot_a: number } // TData
          & { slot_b: number } // TStore
          & {
            slot_aaa: object | null;
            slot_bbb: string | null;
            _slot_ccc: number;
            _slot_ddd: number;
            slot_eee: number;
          } // TComputed
          // 父级的data、store、computed
          & Required<Mock_RootDoc["properties"]>
          & Mock_RootDoc["data"]
          & Mock_RootDoc["computed"]
          & Mock_RootDoc["store"]
          & Mock_SubDoc["allDatas"]
          & IInjectAllData // 通过inject注入的数据
        >,
        true
      >;
      return 123;
    },
  },
});
