import { Checking, type Test } from "hry-types";
import { RootComponent } from "../..";

/**
 * 1. 无isPage字段时,返回Doc中无isPage字段
 */
const noIsPage = RootComponent()({});

Checking<typeof noIsPage, {}, Test.Pass>;

/**
 * 2. isPage字段为false时,返回Doc中无isPage字段
 */
const isPageIsfalse = RootComponent()({
  isPage: false,
});

Checking<typeof isPageIsfalse, {}, Test.Pass>;

/**
 * 3. isPage字段为true时,返回Doc中isPage为true
 */
const isPageIsTrue = RootComponent()({
  isPage: true,
});

Checking<typeof isPageIsTrue, { isPage: true }, Test.Pass>;
