import type { Config } from "@jest/types";

const config = {
  clearMocks: true,
  testEnvironment: "jsdom",
  collectCoverage: false,
  collectCoverageFrom: [
    "./src/**/*.ts",
    "!src/**/*.test.ts",
    "!src/api/wxSugar.ts",
    "!src/api/DefineComponent/isPageCheck.ts",
    "!src/api/InstanceInject/inject.ts",
    "!src/thirdLib/**",
    "!src/utils/_utils.ts",
  ],
  testMatch: [
    "<rootDir>/jest/**/*.test.ts",
  ],
  transform: {
    "\\.ts$": "ts-jest", // 添加的
  },
  coverageReporters: ["text", "text-summary"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
} satisfies Config.InitialOptions;

exports.default = config;
