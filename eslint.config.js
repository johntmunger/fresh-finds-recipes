import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Base ESLint recommended config
  js.configs.recommended,
  
  // TypeScript ESLint recommended configs
  ...tseslint.configs.recommended,
  
  // Vue recommended configs for Vue 3
  ...pluginVue.configs['flat/recommended'],
  
  // Prettier config to disable conflicting rules (must be last)
  prettierConfig,
  
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    
    plugins: {
      prettier,
    },
    
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        RequestInit: 'readonly',
        // Node globals
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',
      
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        { 
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Vue rules
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      
      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  
  // Vue-specific configuration
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  
  // Ignore patterns
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.git/**', 'server/**'],
  },
];

