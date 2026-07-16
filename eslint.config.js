import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: [
      "./commitlint.config.cjs",
      "docs/**",
      "docs/.vitepress/**",
      "out/**",
      ".worktree/**",
      "dist/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: ["src/**/*.ts", "jest/**/*.ts"],
    plugins: {
      "eslint-comments": eslintComments,
    },
    languageOptions: {
      globals: {
        ...globals.node,
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
]);
