module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
}