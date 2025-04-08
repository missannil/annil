import { Checking } from "hry-types";
import type { ComputeObject } from "../../../../types/ComputeObj";
import type { IInjectAllData } from "../../../InstanceInject/instanceConfig";
import { ChunkComponent } from "../..";
import type { Mock_RootDoc } from "./mock";

ChunkComponent<Mock_RootDoc, "slot">()({
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
          & {
            slot_a: number;
            slot_b: number;
            slot_aaa: object | null;
            _slot_ccc: number;
            _slot_ddd: number;
            slot_eee: number;
          }
          & Required<Mock_RootDoc["properties"]>
          & Mock_RootDoc["data"]
          & Mock_RootDoc["computed"]
          & Mock_RootDoc["store"]
          & IInjectAllData
        >,
        true
      >;

      return 123;
    },
  },
});

// computed中可以使用this实例 之前只能使用this.data字段
type Custom = { type: "custom"; xxx: string };
type Chunk = { type: "chunk"; yyy: number };
type Union = Custom | Chunk;
ChunkComponent<{ data: { _num: number }; methods: { IsChunk: (union: Union) => union is Chunk } }, "aaa">()({
  data: {
    _aaa_union: { type: "custom", xxx: "123" } as Union,
  },
  computed: {
    _aaa_count(): string | number {
      const { _aaa_union } = this.data;
      return this.aaa_isCustom(_aaa_union) ? _aaa_union.xxx : _aaa_union.yyy;
    },
    _aaa_isChunk(): boolean {
      const { _aaa_union } = this.data;
      return this.IsChunk(_aaa_union);
    },
  },
  methods: {
    aaa_isCustom(union: Union): union is Custom {
      return union.type === "custom";
    },
  },
});
// 2
ChunkComponent<{}>()({
  computed: {
    xxx(): string {
      return "";
    },
  },
});
