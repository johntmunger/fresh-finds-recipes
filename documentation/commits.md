# Conventional Commits Guide

## Overview

This project uses [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. This enables automatic changelog generation and semantic versioning.

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Components

1. **Type** (required): The kind of change
2. **Scope** (optional): The component or file affected
3. **Subject** (required): Brief description of the change
4. **Body** (optional): Detailed explanation
5. **Footer** (optional): Breaking changes, issue references

## Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(todos): add dark mode toggle` |
| `fix` | Bug fix | `fix(api): resolve database timeout` |
| `docs` | Documentation changes | `docs(readme): update installation steps` |
| `style` | Code style changes (formatting, no logic change) | `style: format with prettier` |
| `refactor` | Code refactoring (no feature/fix) | `refactor(api): simplify error handling` |
| `perf` | Performance improvements | `perf(list): optimize render performance` |
| `test` | Adding or updating tests | `test(todos): add integration tests` |
| `build` | Build system changes | `build: update vite configuration` |
| `ci` | CI/CD configuration changes | `ci: add github actions workflow` |
| `chore` | Maintenance tasks | `chore(deps): upgrade vue to 3.5.14` |
| `revert` | Revert previous commit | `revert: revert feat(todos): add filter` |

## Common Scopes

- `todos` - Todo functionality
- `api` - Backend API
- `ui` - User interface components
- `db` - Database changes
- `auth` - Authentication
- `deps` - Dependencies
- `config` - Configuration files

## Writing Good Commit Messages

### Subject Line Rules

1. Use imperative mood: "add" not "added" or "adds"
2. Don't capitalize first letter
3. No period at the end
4. Keep it under 50 characters
5. Be specific but concise

### Examples of Good Commits

```bash
# Feature with scope
feat(todos): add bulk delete functionality

# Bug fix with detailed body
fix(api): handle null values in todo creation

Fixed an issue where creating a todo with null title
would crash the server. Added validation middleware.

Closes #123

# Documentation update
docs(readme): add deployment instructions for render.com

# Dependency update
chore(deps): upgrade eslint to v9.0.0

# Breaking change
feat(api)!: change todo response format

BREAKING CHANGE: Todo API now returns ISO date strings
instead of timestamps. Update client code accordingly.

# Multiple scopes
refactor(ui,api): unify error handling approach
```

### Examples of Bad Commits

```bash
# Too vague
fix: bug fix

# Past tense
feat: added new feature

# Capitalized
Feat: Add new feature

# Period at end
fix: resolve issue.

# No type
add dark mode

# Wrong type for breaking change
refactor: completely change API structure
```

## Multi-line Commits

For detailed commits with body and footer:

```bash
git commit
```

This opens your editor with the commit template. Example:

```
feat(todos): add advanced filtering options

Added ability to filter todos by:
- Date range
- Priority level
- Tags
- Custom categories

Users can now save filter presets and share them
with team members. Filter UI is collapsible to save
screen space.

Closes #45, #67
```

## Breaking Changes

For breaking changes, use `!` after type/scope OR include `BREAKING CHANGE:` in footer:

```bash
# Method 1: Using !
feat(api)!: change authentication flow

# Method 2: Using footer
feat(api): change authentication flow

BREAKING CHANGE: JWT tokens now expire after 1 hour
instead of 24 hours. Update client refresh logic.
```

## Workflow

### 1. Stage Your Changes

```bash
git add .
```

### 2. Commit with Conventional Format

```bash
git commit -m "feat(todos): add drag and drop sorting"
```

### 3. Automatic Validation

The `commit-msg` hook validates your message format:
- ✅ Valid format → Commit accepted
- ❌ Invalid format → Commit rejected with error

### 4. Automatic Changelog Update

The `post-commit` hook automatically:
- Generates changelog entry from your commit
- Updates CHANGELOG.md
- Amends the commit to include the changelog update

## Using the Commit Template

When you run `git commit` (without `-m`), a template appears:

```
# <type>(<scope>): <subject>
#
# <body>
#
# <footer>
#
# Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
# Scope: Component or file affected (optional)
# Subject: Brief description (lowercase, no period at end)
#
# Examples:
#   feat(todos): add dark mode toggle
#   fix(api): resolve database connection timeout
```

Uncomment and fill in the sections you need.

## Manual Changelog Generation

### Generate from All Commits

```bash
npm run changelog:reset
```

### Update with Latest Commits

```bash
npm run changelog
```

## Troubleshooting

### Commit Rejected

**Error:** `subject may not be empty`
- **Fix:** Add a subject after the colon

**Error:** `type may not be empty`
- **Fix:** Start with a valid type (feat, fix, docs, etc.)

**Error:** `subject must not be sentence-case`
- **Fix:** Don't capitalize the first letter of the subject

### Changelog Not Updating

1. Check you're using conventional commit format
2. Ensure you're committing from the workspace directory
3. Check that post-commit hook is executable:
   ```bash
   ls -la .husky/post-commit
   ```
4. Re-run changelog manually:
   ```bash
   npm run changelog
   ```

### Skip Validation (Emergency Only)

```bash
git commit --no-verify -m "emergency fix"
```

⚠️ **Warning:** This bypasses validation and won't update changelog automatically.

## Best Practices

1. **Commit Often**: Small, focused commits are easier to review
2. **One Concern Per Commit**: Don't mix features and fixes
3. **Write for Readers**: Future you will thank present you
4. **Reference Issues**: Use `Closes #123` or `Fixes #456` in footer
5. **Test Before Commit**: Ensure code works before committing
6. **Use Scopes**: Makes changelog more organized
7. **Breaking Changes**: Always document with `!` or `BREAKING CHANGE:`

## Quick Reference

```bash
# Common patterns
feat: new feature
fix: bug fix
docs: documentation
style: formatting
refactor: restructure code
perf: performance
test: testing
build: build system
ci: CI/CD
chore: maintenance
revert: undo commit

# With scope
feat(scope): description
fix(scope): description

# With body
git commit  # Opens editor

# Breaking change
feat!: description
feat(scope)!: description
```

## Additional Resources

### Internal Documentation
- [System Architecture](./changelog-architecture.md) - Technical deep-dive into how the automated system works
- [Test Results](./workflow-test-results.md) - Verification and testing documentation

### External Resources
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

## VS Code Extension

Install [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) extension for:
- Commit message templates
- Type and scope suggestions
- Automatic validation
- Commit history

---

For questions or issues, see [CHANGELOG.md](../../CHANGELOG.md) or project documentation.

