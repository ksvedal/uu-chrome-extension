module.exports = {
    "roots": [
        "src"
    ],
    "transform": {
        "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
        '^.+\\.tsx?$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest',

    },
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: [
        '/node_modules/(?!react)/'
      ],
}; 

