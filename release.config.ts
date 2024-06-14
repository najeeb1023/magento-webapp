const config = {
    branches: ['master'],
    plugins: [
            '@semantic-release/commit-analyzer',
            '@semantic-release/release-notes-generator',
            ["@semantic-release/git", {
                "assets": ["dist/*.ts", "dist/*.ts.map"],
                "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
            }],
            '@semantic-release/github'
    ]
};

export default config