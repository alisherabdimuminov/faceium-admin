// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        '@nuxtjs/color-mode',
        '@pinia/nuxt',
    ],

    colorMode: {
        classPrefix: "",
        classSuffix: "",
    },

    runtimeConfig: {
        public: {
            api: "http://localhost:8000/api/v1/",
            base: "http://localhost:8000",
            secretKey: ""
        }
    },
})