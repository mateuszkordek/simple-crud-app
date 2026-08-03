import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import { URL, fileURLToPath } from 'node:url'

export default defineConfig({
    envPrefix: ['VITE_'],
    plugins: [
        vue(),
        Components({
            resolvers: [PrimeVueResolver()],
        }),
        AutoImport({
            imports: ['vue'],
            dts: 'src/auto-imports.d.ts',
        }),
        UnoCSS(),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.ts'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@components': fileURLToPath(
                new URL('./src/components', import.meta.url)
            ),
            '@composables': fileURLToPath(
                new URL('./src/composables', import.meta.url)
            ),
            '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
            '@types-interfaces': fileURLToPath(
                new URL('./src/types', import.meta.url)
            ),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
            '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['**/*.{spec,integration,test}.ts'],
        setupFiles: ['vitest.setup.ts'],
    },
})
