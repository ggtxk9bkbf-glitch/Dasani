#!/bin/bash

# ============================================
# Ahmed Badway — Dasani Setup Script
# ============================================

set -e

echo "🌊 Dasani — Starting setup..."

# ── 1. Clone if needed ─────────────────────
if [ ! -d ".git" ]; then
  echo "📦 Cloning repo..."
  git clone https://github.com/ggtxk9bkbf-glitch/Dasani.git .
fi

# ── 2. Main branch only ────────────────────
CURRENT=$(git branch --show-current 2>/dev/null || echo "")
if [ "$CURRENT" != "main" ]; then
  git checkout main 2>/dev/null || git checkout -b main
fi
echo "✅ Branch: main"

# ── 3. Install Skills ──────────────────────
echo ""
echo "📦 Installing Skills..."
npx --yes skills add emilkowalski/skill 2>/dev/null && echo "✅ Emil Kowalski" || echo "⚠️ Emil skipped"
npx --yes skills add pbakaus/impeccable 2>/dev/null && echo "✅ Impeccable" || echo "⚠️ Impeccable skipped"
npx --yes skills add Leonxlnx/taste-skill 2>/dev/null && echo "✅ Taste Skill" || echo "⚠️ Taste Skill skipped"

# ── 4. Install packages ────────────────────
echo ""
echo "📦 Installing packages..."
if [ -f "package.json" ]; then
  npm install
  npm install motion
  echo "✅ Packages ready"
else
  echo "⚠️ No package.json yet — Claude Code will scaffold the project"
fi

echo ""
echo "✅ Setup complete!"
echo "🌿 Branch: main"
echo "🎨 Skills: Emil + Impeccable + Taste Skill"
