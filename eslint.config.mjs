// @ts-expect-error @eslint/js的导出使用了export = 导致报错。
// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    languageOptions: {
      globals: {
        // 为什么不好使
        definitionFilter: true,
      },
    },
    ignores: ["./commitlint.config.cjs"],
    rules: {
      "@typescript-eslint/no-empty-object-type": 0,
      "@typescript-eslint/consistent-type-definitions": 0,
      "@typescript-eslint/no-unused-vars": 1,
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": false,
          "ts-nocheck": true,
          "ts-check": false,
          minimumDescriptionLength: 3,
        },
      ],
    },
  },
);
