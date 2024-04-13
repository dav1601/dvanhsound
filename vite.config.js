import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
    server: {
        host: "0.0.0.0",
        hmr: {
            host: "localhost",
            protocol: "ws",
        },
    },
    plugins: [
        laravel({
            input: [
                "resources/js/app.js",
                "resources/css/app.css",
                "resources/sass/app.scss",
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,

                    includeAbsolute: false,
                },
            },
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js?v=` + Date.now(),
                chunkFileNames: `assets/[name].js?v=` + Date.now(),
                assetFileNames: `assets/[name].[ext]?v=` + Date.now(),
            },
        },
    },
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "/resources/sass/_variable.scss";@import "/resources/sass/_mixin.scss";@import "/resources/sass/global.scss";`,
            },
        },
    },
});
