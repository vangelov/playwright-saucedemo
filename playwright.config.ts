import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://www.saucedemo.com/',
    testIdAttribute: 'data-test',
    
    trace: 'on-first-retry',
  },
  projects: [
    { 
      name: 'login-chromium',
      testMatch: 'login.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'login-firefox',
      testMatch: 'login.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'login-webkit',
      testMatch: 'login.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'auth-setup',
      testMatch: 'auth.setup.ts',
    },
    { 
      name: 'chromium',
      dependencies: ['auth-setup'],
      testIgnore: 'login.spec.ts',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: '.auth.json',
      },
    },
    {
      name: 'firefox',
      dependencies: ['auth-setup'],
      testIgnore: 'login.spec.ts',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: '.auth.json',
      },
    },

    {
      name: 'webkit',
      dependencies: ['auth-setup'],
      testIgnore: 'login.spec.ts',
      use: { 
        ...devices['Desktop Safari'],
        storageState: '.auth.json',
      },
    },
  ],
});
