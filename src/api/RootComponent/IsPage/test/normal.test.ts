/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { typeEqual } from "../../../../utils/typeEqual";
import { RootComponent } from "../..";

/**
 * 1. 无isPage字段时,返回Doc中无isPage字段
 */
const noIsPage = RootComponent()({});

typeEqual<typeof noIsPage, {}>;

/**
 * 2. isPage字段为false时,返回Doc中无isPage字段
 */
const isPageIsfalse = RootComponent()({
  isPage: false,
});

typeEqual<typeof isPageIsfalse, {}>;

/**
 * 3. isPage字段为true时,返回Doc中isPage为true
 */
const isPageIsTrue = RootComponent()({
  isPage: true,
});

typeEqual<typeof isPageIsTrue, { isPage: true }>;
