module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/main/**', '!<rootDir>/src/domain/**', '!<rootDir>/src/data/models/**', '!<rootDir>/src/**/*-protocols.ts', '!**/protocols/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.*\\.ts$': 'ts-jest'
  }
}
