module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
    jest: true,
    "jest/globals": true
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      rules: {
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/ban-ts-comment": "off",

        "react/prop-types": "off",
        "react/no-unescaped-entities": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
      }
    }
  ],
  plugins: ["react-hooks", "jest", "jsx-a11y"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "object-curly-spacing": [
      2,
      "always",
      { "objectsInObjects": true }
    ],
    "jsx-quotes": ["error", "prefer-double"],
    "no-multiple-empty-lines": "error",
    "no-trailing-spaces": "error",
    "curly": "error",
    "comma-dangle": ["error", "never"],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto",
        "printWidth": 110,
        "singleQuote": true,
        "semi": true,
        "tabWidth": 2,
        "trailingComma": "none"
      }
    ]
  }
};
