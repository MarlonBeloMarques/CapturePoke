module.exports = {
  preset: "jest-expo",
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testRegex: "\\.spec\\.ts",
  transformIgnorePatterns: [],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
