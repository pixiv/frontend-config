import type { Linter } from "eslint";

// TODO: optional peer depsに移動してinstallサイズを減らす
import {
  files,
  js,
  typescript,
  react,
  nextJs,
  storybook,
  imports,
} from "./config";

export * from "./config";

export default {
  configs: {
    /**
     * フレームワーク使用しない場合
     *
     * 内容: files + js + typescript
     */
    get vanillaTs(): Linter.Config[] {
      return [
        ...files(),
        ...js(),
        ...typescript(),
        ...imports(),
      ] satisfies Linter.Config[];
    },
    /**
     * できるだけそのまま使いたい場合
     *
     * 内容: files + js + typescript + react + storybook + imports
     */
    get recommended(): Linter.Config[] {
      return [
        ...files(),
        ...js(),
        ...typescript(),
        ...react(),
        ...storybook(),
        ...imports(),
      ] satisfies Linter.Config[];
    },

    /**
     * 内容: js + typescript + react
     */
    get react(): Linter.Config[] {
      return [
        ...js(), //
        ...typescript(),
        ...react(),
      ] satisfies Linter.Config[];
    },

    /**
     * 内容: js + typescript + react + next.js + storybook + imports
     *
     * NOTE:
     * 1. 中身はeslint-config-nextではなく @next/eslint-plugin-next
     */
    get nextJs(): Linter.Config[] {
      return [
        ...js(),
        ...typescript(),
        ...react(),
        ...nextJs(),
        ...storybook(),
        ...imports(),
      ] satisfies Linter.Config[];
    },
  },
};
