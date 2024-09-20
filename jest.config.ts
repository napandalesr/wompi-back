const customJestConfig = {
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!.eslintrc.js',
    '!**/*.module.ts',
    '!**/*.dto.ts',
    '!**/*.entity.ts',
    '!**/auth/**',
    '!main.ts',
  ],
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: { '^@src/(.*)$': '<rootDir>/$1' },
  rootDir: 'src',
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
};

export default customJestConfig;
