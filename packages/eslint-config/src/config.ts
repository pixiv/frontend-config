import * as compat from "@eslint/compat";
import * as eslintrc from "@eslint/eslintrc";
import eslintJs from "@eslint/js";
// @ts-expect-error no types for this
import pluginNext from "@next/eslint-plugin-next";
import pluginTypescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import type { ESLint, Linter } from "eslint";
import configPrettier from "eslint-config-prettier/flat";
// @ts-expect-error no types for this
import pluginImport from "eslint-plugin-import";
// @ts-expect-error no types for this
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
// @ts-expect-error no types for this
import pluginReactCompiler from "eslint-plugin-react-compiler";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginStorybook from "eslint-plugin-storybook";
import globals from "globals";
import tseslint from "typescript-eslint";

// re-export
export {
  eslintrc,
  eslintJs,
  globals,
  compat,
  tseslint,
  tsParser,
  configPrettier,
  pluginReact,
  pluginReactCompiler,
  pluginReactHooks,
  pluginTypescriptEslint,
  pluginJsxA11y,
  pluginNext,
  pluginStorybook,
  pluginImport,
};

// No longer required but keep for a while just in case we are adding new plugins.
// const flatCompat = new eslintrc.FlatCompat();

export const files = () =>
  [
    {
      ignores: ["tmp", "dist", ".storybook", "storybook-static"],
      files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    },
  ] satisfies Linter.Config[];

export const js = () =>
  [
    // TODO: eslintJs.configs.recommended,
    {
      rules: {
        ...configPrettier.rules,
        "no-empty-function": "error",
        curly: "error",
        "no-fallthrough": "error",
        "no-constant-condition": "error",
        "object-shorthand": "error",
      },
    },
  ] satisfies Linter.Config[];

export const typescript = () =>
  [
    {
      plugins: {
        // @ts-expect-error pluginTypescriptEslint export is not compat with ESLint.Plugin
        "@typescript-eslint": pluginTypescriptEslint as ESLint.Plugin,
      },
      languageOptions: {
        globals: {
          ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: 8,
        sourceType: "module",

        parserOptions: {
          project: "./tsconfig.json",
          tsconfigRootDir: process.cwd(),
          ecmaFeatures: {
            jsx: true,
          },
        },
      },

      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            disallowTypeAnnotations: false,
            fixStyle: "inline-type-imports",
          },
        ],
        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-deprecated": "warn",
      },
    },
    {
      files: ["**/*.{mjs,js}"],
      ...(tseslint.configs.disableTypeChecked as Linter.Config),
    },
  ] satisfies Linter.Config[];

export const react = () =>
  [
    {
      settings: {
        react: {
          version: "detect",
        },
      },
      plugins: {
        // https://github.com/jsx-eslint/eslint-plugin-react/issues/3838#issuecomment-2395472758
        react: pluginReact as ESLint.Plugin,
        "react-hooks": pluginReactHooks,
        "react-compiler": pluginReactCompiler,
        "jsx-a11y": pluginJsxA11y,
      },
      rules: {
        ...(pluginReact.configs.flat!.recommended.rules as Linter.RulesRecord),
        "react/self-closing-comp": "error",
        "react/react-in-jsx-scope": "off",
        "react/jsx-no-target-blank": "off",
        "react/prop-types": "off",
        "react/jsx-boolean-value": ["error", "never"],
        "react/display-name": "warn",
        "react/no-unknown-property": [
          "error",
          {
            ignore: ["css"],
          },
        ],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "react-compiler/react-compiler": "warn",

        // from next config, comment below is used to track diff

        // 'jsx-a11y/alt-text': [
        //   'warn',
        //   {
        //     elements: ['img'],
        //     img: ['Image'],
        //   },
        // ],
        "jsx-a11y/aria-props": "warn",
        "jsx-a11y/aria-proptypes": "warn",
        "jsx-a11y/aria-unsupported-elements": "warn",
        "jsx-a11y/role-has-required-aria-props": "warn",
        "jsx-a11y/role-supports-aria-props": "warn",
      },
    },
  ] satisfies Linter.Config[];

/**
 * NOTE: eslint-plugin-nextのリリースが頻繁ではないので@next/eslint-plugin-nextを利用して回避する
 */
export const nextJs = () => {
  return [
    {
      plugins: {
        "@next/next": pluginNext,
      },
      rules: {
        ...(
          pluginNext.configs as Record<
            string,
            Linter.Config<Linter.RulesRecord>
          >
        )["core-web-vitals"].rules,
        "@next/next/no-duplicate-head": "off",
        "@next/next/no-img-element": "off",
      },
    },
  ] satisfies Linter.Config[];
};

export const storybook = () => [...pluginStorybook.configs["flat/recommended"]];

export const imports = () =>
  [
    pluginImport.flatConfigs.recommended,
    {
      rules: {
        "import/no-duplicates": "error",
        "import/first": "error",
        "import/named": "off",
        "import/export": "off",
        "import/no-unresolved": "off",
        "import/namespace": "off",
        "import/default": "off",
        "import/no-named-as-default": "off",
        "import/no-named-as-default-member": "off",
        "import/order": [
          "warn",
          {
            alphabetize: {
              order: "asc",
              orderImportKind: "asc",
            },
          },
        ],
      },
    },
  ] satisfies Linter.Config[];
