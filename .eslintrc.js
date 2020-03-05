module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint', 'eslint-plugin-import-helpers'
  ],
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'camelcase': 'off',
    'lines-between-class-members': 'off',
    'no-unused-vars': ['error', { 'argsIgnorePattern': 'next' }],
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-await-in-loop': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-loop-func': 'off',
    'template-curly-spacing': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'no-use-before-define': ['error', { 'variables': false }],
    'no-shadow': 'off',
    'global-require': 'off',
    'no-unused-expressions': ['error', { 'allowTaggedTemplates': true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import-helpers/order-imports': [
      'warn',
      { // example configuration
          newlinesBetween: 'always',
          groups: [
            'module',
            '/^date-fns/',
            '/services/',
            '/controllers/',
            '/repository/',
            '/models/',
            '/interfaces/',
            '/.middlewares/',
            '/config/',
            '/lib/',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'ts': 'never'
      }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': [
          '**/*.spec.ts',
          'src/utils/tests/*.ts'
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  settings: {
    'import/extensions': ['.ts', '.js'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.js']
    },
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true
      }
    }
  }
};
