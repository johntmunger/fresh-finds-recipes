# Prettier Command - Auto-format .ts and .tsx files on save

## Overview
This command configures Prettier to automatically format TypeScript (.ts) and TypeScript JSX (.tsx) files when they are saved.

## Installation

```bash
npm install --save-dev prettier
```

## Configuration

### 1. Create `.prettierrc` in project root

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 2. Create `.prettierignore` in project root

```
node_modules
dist
build
.git
*.min.js
*.min.css
coverage
.next
.nuxt
.cache
```

### 3. Add scripts to `package.json`

```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,vue}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,vue}\""
  }
}
```

## Editor Configuration

### VS Code / Cursor

Create or update `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "prettier.requireConfig": false,
  "prettier.useEditorConfig": false
}
```

## Usage

### Automatic (on save)
- Simply save any `.ts` or `.tsx` file and it will be automatically formatted

### Manual formatting
```bash
npm run format
```

### Check formatting without changing files
```bash
npm run format:check
```

## Integration with ESLint (Optional)

If you're using ESLint, install compatibility packages:

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

Update `.eslintrc` or `eslint.config.js`:

```json
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

## Command Execution

When invoked, this command will:
1. Check if Prettier is installed
2. Install if necessary
3. Create configuration files if they don't exist
4. Set up editor configuration for format-on-save
5. Run initial format on all .ts and .tsx files

