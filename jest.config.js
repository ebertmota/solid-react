module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  },
  moduleNameMapper: {
    '@/tests(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  },
  transform: {
    '.+\\.(ts|tsx)&': 'ts-jest'
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/application/components/router/**/*',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/**/index.ts',
    '!**/*.d.ts'
  ],
}
