import { config } from "./jest.config";

exports.default = {
  ...config, // 导入原始的 Jest 配置
  collectCoverage: true, // 收集测试覆盖率
  coverageDirectory: "coverage", // 指定覆盖率报告的输出目录
  coverageReporters: ["lcov"], // 在 CI 中使用 'lcov' 格式
};
