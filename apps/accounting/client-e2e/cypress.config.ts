import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'pnpm exec nx run accounting-client:dev',
        production: 'pnpm exec nx run accounting-client:preview',
      },
      ciWebServerCommand: 'pnpm exec nx run accounting-client:preview',
      ciBaseUrl: 'http://localhost:4001',
    }),
    baseUrl: 'http://localhost:4001',
  },
});
