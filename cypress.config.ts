import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    specPattern: './tests/cypress',
    baseUrl: 'http://localhost:8080',
    fixturesFolder: false,
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
