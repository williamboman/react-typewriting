module.exports = {
    "roots": [
        "<rootDir>/__tests__"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "testPathIgnorePatterns": [
        "<rootDir>/__tests__/setup.ts"
    ],
    "setupTestFrameworkScriptFile": "<rootDir>/__tests__/setup.ts"
}
