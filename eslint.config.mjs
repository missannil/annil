// @ts-expect-error @eslint/js的导出使用了export = 导致报错。
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
export default tseslint.config(
  {
    ignores: ["./commitlint.config.cjs", "docs/**", "docs/.vitepress/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    plugins: {
      "eslint-comments": eslintComments,
    },
    languageOptions: {
      globals: {
        // definitionFilter: true,
      },
    },
    rules: {
      // "eslint-comments/require-description": "error",
      "@typescript-eslint/no-unused-expressions": 1,
      "@typescript-eslint/no-empty-function": 1,
      "@typescript-eslint/no-empty-object-type": 0,
      "@typescript-eslint/consistent-type-definitions": 0,
      // "@typescript-eslint/no-explicit-any": "error",
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
