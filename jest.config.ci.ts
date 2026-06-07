import type { Config } from "@jest/types";
const ciConfig = {
  clearMocks: true,
  testEnvironment: "jsdom",
  collectCoverage: true,
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
    "\\.ts$": "ts-jest",
  },
  coverageDirectory: "coverage",
  coverageReporters: ["lcov"],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
} satisfies Config.InitialOptions;

exports.default = ciConfig;
