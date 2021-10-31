module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts&': 'ts-jest'
  },
}