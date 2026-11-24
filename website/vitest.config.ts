import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['test/nuxt/**/*.spec.ts'],
    environmentOptions: {
      nuxt: { domEnvironment: 'happy-dom' },
    },
  },
})
