# @pixiv/eslint-config

> [!WARNING]
> This package does not follow semver before 1.0

`pnpm add eslint @pixiv/eslint-config`

eslint.config.mjs

```js
import pixiv from '@pixiv/eslint-config';

export default pixiv.configs.recommended;
```

また

```js
import pixiv from '@pixiv/eslint-config';

export default [
  {
    ignores: ['tmp', 'vendor', 'public/packs'],
  },
  ...pixiv.configs.recommended,
  {
    rules: {
      'react/self-closing-comp': 'warn',
      'import/first': 'warn',
      'object-shorthand': 'warn',
      curly: 'off',
    },
  },
];
```

## Goals and non-goals

### Goals

- Reduce the cost for managing eslint related dependencies

### Non-goals

- Managing extremely opinionated lint rules

## Known issues

- This package contains many deps that might not be used
- In some condition it's required to set `public-hoist-pattern[]=eslint-*` in .npmrc