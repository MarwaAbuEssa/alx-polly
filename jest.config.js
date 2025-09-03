/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\.(css|less|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  transform: {
    '^.+\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      babelConfig: {
        presets: ['@babel/preset-react']
      }
    }],
  },
   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@testing-library/react|next|/components/)).+\.(js|jsx|ts|tsx)$',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/components'],
  testMatch: ['<rootDir>/app/polls/__tests__/**/*.test.(ts|tsx)'],
}

module.exports = config;