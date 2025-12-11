# Documentation Directory

This directory contains all project documentation files that are publicly accessible.

## Contents

### Deployment & Setup
- **DEPLOYMENT.md** - Complete guide for deploying to Render.com
- **QUICKSTART.md** - Quick start guide for local development

### Development Documentation (Synced from `.claude/commands/`)

The following files are automatically synced from `.claude/commands/`:
- **changelog-architecture.md** - Changelog system architecture
- **commits.md** - Commit message guidelines and conventions
- **eslint.md** - ESLint configuration and rules
- **prettier.md** - Prettier formatting guidelines
- **project-overview.md** - Comprehensive project overview
- **README.md** - Claude commands overview
- **workflow-test-results.md** - Testing workflow documentation

## Auto-Sync Feature

### How It Works
Documentation files in `.claude/commands/*.md` are automatically copied to this directory when:
1. **Pre-commit hook**: Files are synced automatically before each commit if any `.claude/commands/*.md` files have changed
2. **Manual sync**: Run `npm run docs:sync` to manually sync all files

### The Sync Script
Location: `scripts/sync-docs.sh`

This script copies all `.md` files from `.claude/commands/` to `documentation/` and stages them for commit.

### Why Keep Copies?
- `.claude/commands/` files are IDE-specific and may be ignored by git
- `documentation/` provides a public, accessible location for all project docs
- Auto-sync ensures documentation stays consistent across both locations

## Updating Documentation

### For `.claude/commands/` files:
1. Edit the file in `.claude/commands/`
2. Commit your changes - the pre-commit hook will auto-sync
3. Or manually run: `npm run docs:sync`

### For other documentation:
Simply edit the file directly in the `documentation/` folder and commit.

## Maintenance

If you need to re-sync all documentation files:
```bash
npm run docs:sync
```

This is useful if files get out of sync or after pulling changes from remote.

