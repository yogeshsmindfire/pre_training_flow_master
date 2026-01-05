module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'patch']],
    'subject-case': [0], // Disable case checking for the subject if desired, or keep default
  },
};
