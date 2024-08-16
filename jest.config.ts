import type { Config } from 'jest';

const config: Config = {
  rootDir: '.',
  testMatch: ['<rootDir>/**/**/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testEnvironment: 'node',
};

export default config;
