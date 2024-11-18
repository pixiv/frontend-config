import type { Linter } from "eslint";
import { expect, test } from "vitest";
import pixiv from ".";

const rules = (config: Linter.Config[]) => JSON.stringify(Object.fromEntries(config.flatMap(r => r.rules ? Object.entries(r.rules) : []).filter(r => r[1] !== 0 && r[1] !== 'off')), null, 2)

test("recommended rules", () => {
  expect(rules(pixiv.configs.recommended)).toMatchFileSnapshot('./__snapshots__/recommended.rules.json');
});

test("Next.js rules", () => {
  expect(rules(pixiv.configs.nextJs)).toMatchFileSnapshot('./__snapshots__/next.rules.json');
});
