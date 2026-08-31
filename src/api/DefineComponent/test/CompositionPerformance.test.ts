import type { CreateComponentDoc } from "../../../types/CreateComponentDoc";
import { ChunkComponent } from "../../ChunkComponent";
import { CustomComponent } from "../../CustomComponent";
import { RootComponent } from "../../RootComponent";
import { DefineComponent } from "..";
import type { ComponentDoc } from "../returnType/ComponentDoc";

const rootComponent = RootComponent()({
  properties: {
    rootTitle: String,
  },
  data: {
    rootCount: 0,
    rootEnabled: true,
  },
  computed: {
    rootLabel(): string {
      return `${this.data.rootTitle}:${this.data.rootCount}`;
    },
  },
  methods: {
    rootRefresh() {
      this.setData({ rootCount: this.data.rootCount + 1 });
    },
  },
});

type RootDoc = typeof rootComponent;

type StressComponentDoc<Prefix extends string> = CreateComponentDoc<Prefix, {
  properties: {
    title?: string;
    count?: number;
    enabled?: boolean;
    label?: string;
  };
  events: {
    change: { value: number };
  };
}>;

type ComponentOne = StressComponentDoc<"componentOne">;
type ComponentTwo = StressComponentDoc<"componentTwo">;
type ComponentThree = StressComponentDoc<"componentThree">;
type ComponentFour = StressComponentDoc<"componentFour">;
type ComponentFive = StressComponentDoc<"componentFive">;
type ComponentSix = StressComponentDoc<"componentSix">;

const chunkOne = ChunkComponent<RootDoc, "chunkOne">()({
  data: {
    chunkOne_count: 0,
  },
  computed: {
    chunkOne_label(): string {
      return `${this.data.rootLabel}:${this.data.chunkOne_count}`;
    },
  },
  watch: {
    chunkOne_count(newValue, oldValue) {
      void newValue;
      void oldValue;
    },
  },
});

function createStressCustom<TDoc extends ComponentDoc>() {
  return CustomComponent<RootDoc, TDoc>()({} as never);
}

function createStressChunk<Prefix extends string>() {
  return ChunkComponent<RootDoc, Prefix>()({} as never);
}

const customOne = createStressCustom<ComponentOne>();
const customTwo = createStressCustom<ComponentTwo>();
const customThree = createStressCustom<ComponentThree>();
const customFour = createStressCustom<ComponentFour>();
const customFive = createStressCustom<ComponentFive>();
const customSix = createStressCustom<ComponentSix>();

const chunkTwo = createStressChunk<"chunkTwo">();
const chunkThree = createStressChunk<"chunkThree">();
const chunkFour = createStressChunk<"chunkFour">();
const chunkFive = createStressChunk<"chunkFive">();
const chunkSix = createStressChunk<"chunkSix">();

void DefineComponent({ name: "performanceOne", rootComponent, subComponents: [customOne, chunkOne] });
void DefineComponent({ name: "performanceTwo", rootComponent, subComponents: [customTwo, chunkTwo] });
void DefineComponent({ name: "performanceThree", rootComponent, subComponents: [customThree, chunkThree] });
void DefineComponent({ name: "performanceFour", rootComponent, subComponents: [customFour, chunkFour] });
void DefineComponent({ name: "performanceFive", rootComponent, subComponents: [customFive, chunkFive] });
void DefineComponent({ name: "performanceSix", rootComponent, subComponents: [customSix, chunkSix] });
