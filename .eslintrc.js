module.exports = {
  extends: ['next', 'plugin:prettier/recommended', 'next/core-web-vitals', '@feature-sliced'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  parser: '@typescript-eslint/parser',
  settings: {
    'import/resolver': {
        typescript: {
            alwaysTryTypes: true
        }
    }
  },
  plugins: ['simple-import-sort', 'unused-imports'],
  rules: {
    'no-var': 'error',
    'prefer-const': 'warn',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react', '^@?\\w'],
              ['^(@|components)(/.*|$)'],
              ['^\\u0000'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              ['^.+\\.?(css)$'],
            ],
          },
        ],
      },
    },
  ],
};
