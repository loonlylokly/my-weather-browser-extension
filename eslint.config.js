// eslint.config.js
import antfu from '@antfu/eslint-config';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';

export default antfu(
  {
    stylistic: false
  },
  {
    name: 'my/rewrite',
    rules: {
      'antfu/top-level-function': 'off',
      'antfu/if-newline': 'off',
      'antfu/curly': 'off',

      'react-hooks/exhaustive-deps': 'off',

      'test/prefer-lowercase-title': 'off',

      'no-console': 'warn'
    }
  },
  {
    name: 'my/imports',
    plugins: {
      'plugin-simple-import-sort': pluginSimpleImportSort
    },
    rules: {
      'sort-imports': 'off',
      'import/order': 'off',
      'import/extensions': 'off',
      'plugin-simple-import-sort/exports': 'error',
      'plugin-simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^@(([\\/.]?\\w)|assets|test-utils)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$']
          ]
        }
      ]
    }
  }
);
