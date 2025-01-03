import eslintJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import pluginVue from 'eslint-plugin-vue'

export default [
    {
        ignores: ['**/dist/', '**/vendor/'],
    },

    // general defaults
    eslintJs.configs['recommended'],
    // general
    {
        files: ['**/*.{js,ts,jsx,tsx,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {},
    },

    // chosen typescript defaults
    ...tsEslint.configs['recommended'],
    // typescript
    {
        files: ['**/*.{ts,tsx,vue}'],
        languageOptions: {
            parser: tsEslint.parser,
        },
    },

    // chosen vue defaults
    ...pluginVue.configs['flat/essential'],
    // vue
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsEslint.parser,
            },
        },
    },
]
