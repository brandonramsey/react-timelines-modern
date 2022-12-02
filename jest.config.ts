import { Config } from 'jest';

const config: Config = {
  coveragePathIgnorePatterns: [ "/node_modules/" ],
  moduleDirectories: [ "node_modules", "src" ],
  preset: 'ts-jest',
  resetMocks: true,
  resetModules: true,
  rootDir: "./src",
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [ "../jestSetup.ts" ],
}

export default config;
