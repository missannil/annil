import type { CreateComponentDoc } from "../../../types/CreateComponentDoc";
import type { ComponentDoc } from "../../DefineComponent/returnType/ComponentDoc";
import { CustomComponent } from "..";

type RootDoc = {
  properties: {
    rootTitle: string;
    rootCount?: number;
  };
  data: {
    rootEnabled: boolean;
  };
  store: {
    rootStatus: "idle" | "loading";
  };
  computed: {
    rootLabel: string;
  };
  methods: {
    refresh(): void;
  };
};

type StressComponentDoc<Prefix extends string> = CreateComponentDoc<Prefix, {
  properties: {
    title: string;
    count: number;
    enabled: boolean;
    status: "idle" | "loading";
    label: string;
    optionalNote?: string;
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
type ComponentSeven = StressComponentDoc<"componentSeven">;
type ComponentEight = StressComponentDoc<"componentEight">;
type ComponentNine = StressComponentDoc<"componentNine">;
type ComponentTen = StressComponentDoc<"componentTen">;
type ComponentEleven = StressComponentDoc<"componentEleven">;
type ComponentTwelve = StressComponentDoc<"componentTwelve">;

function createStressComponent<TDoc extends ComponentDoc>() {
  return CustomComponent<RootDoc, TDoc>()({} as never);
}

void createStressComponent<ComponentOne>();
void createStressComponent<ComponentTwo>();
void createStressComponent<ComponentThree>();
void createStressComponent<ComponentFour>();
void createStressComponent<ComponentFive>();
void createStressComponent<ComponentSix>();
void createStressComponent<ComponentSeven>();
void createStressComponent<ComponentEight>();
void createStressComponent<ComponentNine>();
void createStressComponent<ComponentTen>();
void createStressComponent<ComponentEleven>();
void createStressComponent<ComponentTwelve>();
