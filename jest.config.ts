import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect',
  ],
  moduleNameMapper: {
    '^node_modules/(.*)$': '<rootDir>/node_modules/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};

export default jestConfig;
