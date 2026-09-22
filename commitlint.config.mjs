/**
 * Conventional Commits, enforced on every commit by the commit-msg hook.
 *
 * Example: feat(cart): add quantity update
 */
const configuration = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "test",
        "docs",
        "chore",
        "ci",
        "style",
        "perf",
        "build",
        "revert",
      ],
    ],
    "header-max-length": [2, "always", 100],
    "body-max-line-length": [0, "always"],
  },
};

export default configuration;
