import type { Linter } from "eslint";
import pixiv from "./packages/eslint-config/src";

export default [
  { ignores: ["**/dist"] },
  ...pixiv.configs.vanillaTs,
] satisfies Linter.Config[];
