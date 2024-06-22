const { DEFAULT_THEME } = require("@cucumber/pretty-formatter"); // pretty formatter removed.

module.exports = {
    
    default: {
    formatOptions: {
        snippetInterface: "async-await",
        colorsEnabled: true,
        theme: {
            ...DEFAULT_THEME,
            'step status': ['red'],
            'step text': ['green'],
            'feature description': ['white', 'italic'],
            'feature keyword': ['cyan', 'bold'],
            'feature name': ['white', 'underline'],
            'tag': ['green'],
            'scenario keyword': ['green'],
            'scenario name': ['white'],
            'step keyword': ['green'],
            'step status': ['bold', 'red'],
        },
        console: {
            showLogs: false,
            showProgress: false,
        }
    },
    compilerOptions: {
        esModuleInterop: true,
        resolveJsonModule: true
        },
    paths: [
        "src/test/features"
    ],
    dryRun: false,
    require: [
        "src/test/steps/*.ts",
        "src/test/hooks/hooks.ts",
    ],
    requireModule: [
        "ts-node/register"
    ],
    format: [
        "html:test-results/reports/cucumber-report.html",
        "json:test-results/reports/cucumber-report.json",
        "@cucumber/pretty-formatter"
    ],
    },
};