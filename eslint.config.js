import neostandard from 'neostandard';

export default [
  {
    ignores: ['node_modules/**', 'public/**', 'dist/**']
  },
  ...neostandard(),
  {
    files: ['templates/**/*.js'],
    languageOptions: {
      globals: {
        Image: 'readonly'
      }
    }
  },
  {
    rules: {
      semi: ['error', 'always'],
      'no-extra-semi': 'error',
      'no-useless-return': 'error',
      'prefer-const': 'error',
      '@stylistic/semi': ['error', 'always']
    }
  }
];
