const path = require('path');
const srcPath = path.resolve(__dirname, 'src');
const coveragePath = path.resolve(__dirname, 'coverage');

module.exports = {
  rootDir: srcPath,
  coverageDirectory: coveragePath,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/!(*.test).(ts|tsx)',
    '!examples/*',
    '!index.ts'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/styleMock.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};
