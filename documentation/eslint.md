# ESLint Command - Auto-lint and fix on save (Prettier compatible)

## Overview
This command configures ESLint to automatically lint and fix TypeScript, TSX, and Vue files when they are saved, while ensuring no conflicts with Prettier.

## Installation

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue eslint-config-prettier eslint-plugin-prettier
```

## Key Packages

- **eslint**: Core ESLint package
- **@typescript-eslint/parser**: Allows ESLint to parse TypeScript
- **@typescript-eslint/eslint-plugin**: TypeScript-specific linting rules
- **eslint-plugin-vue**: Vue.js specific linting rules
- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier
- **eslint-plugin-prettier**: Runs Prettier as an ESLint rule

## Configuration

### 1. Create `.eslintrc.cjs` in project root

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier', // This must be last to override other configs
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  ignorePatterns: ['node_modules', 'dist', 'build', '.git', 'server/**'],
};
```

### 2. Update `.vscode/settings.json`

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit"
    }
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "vue"
  ]
}
```

### 3. Add scripts to `package.json`

```json
{
  "scripts": {
    "lint": "eslint \"src/**/*.{ts,tsx,js,jsx,vue}\"",
    "lint:fix": "eslint \"src/**/*.{ts,tsx,js,jsx,vue}\" --fix"
  }
}
```

## How It Works

### On Save:
1. **Prettier** formats the code (spacing, quotes, etc.)
2. **ESLint** fixes auto-fixable issues (unused imports, etc.)

### No Conflicts:
- `eslint-config-prettier` disables all ESLint rules that conflict with Prettier
- `eslint-plugin-prettier` runs Prettier as an ESLint rule
- This ensures both tools work together harmoniously

## Usage

### Automatic (on save)
- Save any `.ts`, `.tsx`, or `.vue` file
- Prettier formats first
- ESLint auto-fixes issues immediately after

### Manual linting
```bash
npm run lint        # Check for issues
npm run lint:fix    # Fix auto-fixable issues
```

## Common Rules

- **@typescript-eslint/no-unused-vars**: Error on unused variables (except those starting with `_`)
- **@typescript-eslint/no-explicit-any**: Warn when using `any` type
- **no-console**: Warn on console.log (allows console.warn and console.error)
- **prettier/prettier**: All Prettier formatting rules as errors

## Disabling Rules

### For a single line:
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData();
```

### For a file:
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
```

### For a block:
```typescript
/* eslint-disable @typescript-eslint/no-explicit-any */
const data: any = fetchData();
/* eslint-enable @typescript-eslint/no-explicit-any */
```

## Benefits

✅ Catches bugs and issues early
✅ Enforces consistent code style
✅ Auto-fixes common issues on save
✅ Works seamlessly with Prettier (no conflicts)
✅ TypeScript-aware linting
✅ Vue 3 component linting

