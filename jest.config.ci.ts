import { config } from "./jest.config";

exports.default = {
  ...config, // 导入原始的 Jest 配置
  coverageReporters: ["lcov"], // 在 CI 中使用 'lcov' 格式
};
