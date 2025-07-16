module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    plugins: ["simple-import-sort"],
    rules: {
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn"
    }
};