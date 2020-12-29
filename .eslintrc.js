module.exports = {
    "env": {
        "browser": true,
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "airbnb",
        "prettier",
        "prettier/react"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2021,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "import/extensions": [1, "never"],
        "no-use-before-define": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars-experimental": "error",
        "no-unused-vars": "off"
    },
    "settings": {
        "import/resolver": {
            "node": {
              "extensions": [".ts", ".tsx", ".js", ".jsx", ".native.js"]
            }
          }
    }
};
