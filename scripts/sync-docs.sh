#!/bin/bash
# Sync documentation from .claude/commands to documentation folder

echo "Syncing .claude/commands/*.md to documentation/..."

# Copy all markdown files from .claude/commands to documentation
cp .claude/commands/*.md documentation/

# Check if any files were modified
if git diff --quiet documentation/; then
  echo "✓ Documentation is already in sync"
else
  echo "✓ Documentation files synced successfully"
  git add documentation/
fi

