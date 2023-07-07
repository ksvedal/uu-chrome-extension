module.exports = {
    "roots": [
        "src"
    ],
    "transform": {
        "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }]
    },
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: [
        "/node_modules/",
        "^.+\\.module\\.(css|sass|scss)$",
        "../../src/__tests__/sidebarComponent.test\\.tsx?$", // Replace with the actual path to your problematic test file
      ],
}; 

