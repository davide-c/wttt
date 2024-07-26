import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    verbose: true,
    moduleDirectories: ['<rootDir>/src', 'node_modules'],
    reporters: ['default'],
    setupFilesAfterEnv: ['jest-json'],
    testRegex: ['.spec.[t]s$'],
    transform: {
        '^\\.[jt]s$': [
            'ts-jest',
            {
                tsConfig: './tsconfig.json',
            },
        ],
    },

    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,ts}'],
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', 'index.ts$'],
    coverageDirectory: '<rootDir>/coverage',
    coverageThreshold: {
        global: {
            // branches: 95,
            // functions: 95,
            // lines: 95,
            // statements: 95,
        },
    },
    resetMocks: true,
    restoreMocks: true,
};

export default config;
