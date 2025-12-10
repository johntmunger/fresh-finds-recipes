# Claude Commands Guide

## What Are Claude Commands?

Claude commands are **markdown files** stored in `.claude/commands/` that serve as:
- 📖 **Knowledge bases** - Structured information Claude can reference
- 🤖 **Prompt templates** - Reusable instructions for common tasks
- 📚 **Documentation** - Project-specific guides and references
- 🎯 **Context providers** - Detailed information about specific topics

## How to Trigger/Use Commands

### Method 1: Direct Reference (@ Syntax)
```
Ask Claude: "@project-overview"
Or: "Use @commits to explain commit format"
```

### Method 2: Natural Language
```
"Give me the project overview"
"Explain the commit conventions"
"Show me how the changelog system works"
"What's the prettier configuration?"
```

### Method 3: File Reference
```
"Read the project-overview.md command"
"Use the commits.md guide to help me write a commit"
"Reference changelog-architecture.md to explain the hooks"
```

### Method 4: Context in Conversation
```
"Based on the project overview command, how do I add a new feature?"
"According to the commits guide, is this message valid: 'Added feature'?"
```

## Available Commands in This Project

| Command | Trigger | Purpose |
|---------|---------|---------|
| **project-overview.md** | `@project-overview` | Complete project explanation with architecture, features, and workflows |
| **commits.md** | `@commits` | Conventional Commits user guide with examples and best practices |
| **changelog-architecture.md** | `@changelog-architecture` | Technical deep-dive into automated changelog system |
| **prettier.md** | `@prettier` | Prettier setup and configuration guide |
| **eslint.md** | `@eslint` | ESLint configuration and usage guide |
| **workflow-test-results.md** | `@workflow-test-results` | Test results for automated systems |

## Example Usage Scenarios

### Scenario 1: New Developer Onboarding
```
Developer: "@project-overview"

Claude: [Provides comprehensive overview of the project including:
- Architecture
- Project structure
- Key features
- Development workflow
- API endpoints
- Design system
- Common tasks]
```

### Scenario 2: Making a Commit
```
Developer: "I need to add a dark mode feature. How should I commit this?"

Claude: [References @commits guide]
"Based on the conventional commits guide, you should use:

git commit -m 'feat(ui): add dark mode toggle'

This follows the format because:
- 'feat' indicates a new feature
- 'ui' scope indicates user interface changes
- Subject is lowercase and descriptive"
```

### Scenario 3: Understanding the System
```
Developer: "How does the changelog auto-update when I commit?"

Claude: [References @changelog-architecture]
"Based on the changelog architecture documentation, here's the flow:

1. You commit with conventional format
2. commit-msg hook validates via commitlint
3. If valid, commit is created
4. post-commit hook runs
5. conventional-changelog parses git history
6. CHANGELOG.md is updated
7. Changes are amended to your commit

The key file is .husky/post-commit which runs..."
```

### Scenario 4: Code Quality Setup
```
Developer: "How do I set up the linting?"

Claude: [References @eslint guide]
"According to the ESLint guide, the setup is already complete:

1. ESLint is installed with TypeScript and Vue support
2. Configuration is in eslint.config.js
3. Auto-fix on save is enabled in .vscode/settings.json
4. Run 'npm run lint' to check manually

The system will automatically..."
```

## Command Structure Best Practices

### Good Command Structure
```markdown
# Command Title

## How to Trigger This Command
[Explain trigger methods]

## Content
[Main information organized with headers]

## Examples
[Practical examples]

## Related Commands
[Links to other commands]
```

### What Makes a Good Command

1. **Clear purpose** - Single, well-defined topic
2. **Comprehensive** - Covers topic thoroughly
3. **Structured** - Organized with clear headers
4. **Actionable** - Includes examples and instructions
5. **Cross-referenced** - Links to related commands
6. **Maintained** - Updated when relevant changes occur

## Creating New Commands

### Step 1: Create the File
```bash
touch .claude/commands/my-command.md
```

### Step 2: Structure the Content
```markdown
# My Command Title

## Trigger This Command
"@my-command" or "explain [topic]"

## Overview
[Brief description]

## Details
[Comprehensive information]

## Examples
[Practical examples]

## Related Commands
- [@other-command] - Description
```

### Step 3: Reference in Documentation
Update README.md or other docs to mention the new command.

### Step 4: Test It
Ask Claude to use the command and verify it works as expected.

## Advanced Usage

### Combining Commands
```
"Using both @project-overview and @commits, 
help me understand how to add a feature and commit it properly"
```

### Command Context for Code Generation
```
"Based on @project-overview, generate a new Vue component 
for displaying user profiles that follows the existing patterns"
```

### Debugging with Commands
```
"According to @changelog-architecture, why might my 
post-commit hook not be running?"
```

## Tips for Working with Commands

### For Users
1. **Explore available commands** - Check this directory
2. **Use natural language** - Don't need exact @syntax
3. **Combine references** - Ask about multiple topics
4. **Ask follow-ups** - Claude maintains context

### For Maintainers
1. **Keep commands updated** - Sync with code changes
2. **Document trigger methods** - Make discovery easy
3. **Cross-reference** - Link related commands
4. **Version commands** - Note last updated date
5. **Test commands** - Verify they work as intended

## Command vs. Regular Documentation

| Aspect | Commands | Regular Docs |
|--------|----------|--------------|
| **Location** | `.claude/commands/` | Root or docs/ |
| **Purpose** | AI context & interaction | Human reading |
| **Structure** | Optimized for AI parsing | Optimized for humans |
| **Updates** | When system changes | With releases |
| **Usage** | Via Claude in conversation | Read directly |
| **Format** | Markdown with sections | Markdown/HTML/PDF |

Both are important! Commands enhance Claude's ability to help, while regular docs provide comprehensive references.

## Current Command Inventory

### User-Facing Commands
- ✅ `project-overview.md` - Complete project guide
- ✅ `commits.md` - Commit conventions for users
- ✅ `prettier.md` - Code formatting setup
- ✅ `eslint.md` - Linting configuration

### Technical/Architecture Commands
- ✅ `changelog-architecture.md` - System internals
- ✅ `workflow-test-results.md` - Test documentation

### Meta
- ✅ `README.md` - This guide about commands

## Frequently Asked Questions

### Do I need to memorize the @syntax?
No! Just ask naturally: "explain the project" or "show me commit examples"

### Can I add my own commands?
Yes! Follow the structure above and add any project-specific knowledge.

### Do commands slow down Claude?
No, Claude only reads commands when relevant to your question.

### Should everything be a command?
No, focus on frequently referenced information and complex workflows.

### Can commands reference other files?
Yes! Commands can reference code files, configs, or other commands.

## Maintenance Schedule

- **After major features** - Update project-overview.md
- **After tooling changes** - Update relevant tech commands
- **After architecture changes** - Update architecture docs
- **Quarterly** - Review all commands for accuracy

## Resources

- [Claude AI Documentation](https://docs.anthropic.com/)
- [Markdown Guide](https://www.markdownguide.org/)
- [Project README](../../README.md)

---

**Guide Version:** 1.0  
**Last Updated:** 2025-12-10  
**Next Review:** 2025-03-10

