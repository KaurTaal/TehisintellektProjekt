module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },
  moduleFileExtensions: ["js", "json", "vue"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  collectCoverageFrom: [
    "**/*.{js,vue}",
    "!**/node_modules/**",
    "!**config.js",
    "!src/pb_services/google/**",
    "!coverage/lcov-report/**"
  ],
};
