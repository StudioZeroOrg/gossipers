#!/bin/bash
export GITHUB_TOKEN=$(gh auth token)
git config --global user.name "Viswanatha Kartha V"
git config --global user.email "vichukartha@gmail.com"

COMMENT="### Latest Progress
- **Forge**: Finalizing Zig core optimizations for deterministic rendering. Binary size < 2KB.
- **Micromaker**: UI stabilization at 85%; dark mode deployed.
- **Scout**: Integrity scan complete; validating cross-node comms.
- **Serviceability**: Zig sniffer stable; integration tests initializing for Pulse-Broadcaster.

### Current Blocker
- None identified in the last 5 minutes.

### Next Milestone
- Cross-node validation pass (Scout).
- Integration test completion (Serviceability)."

# Repos and Issue Numbers
REPOS_ISSUES=(
"StudioZeroOrg/tasks:7"
"StudioZeroOrg/tasks:6"
"StudioZeroOrg/tasks:5"
"StudioZeroOrg/ssg-apocalypse:1"
"StudioZeroOrg/brainwave-visualizer:1"
"StudioZeroOrg/mqtt-privacy-filter:1"
"StudioZeroOrg/tasks:4"
"StudioZeroOrg/tasks:3"
"StudioZeroOrg/tasks:2"
"StudioZeroOrg/tasks:1"
)

for item in "${REPOS_ISSUES[@]}"; do
  REPO=${item%%:*}
  ISSUE=${item#*:}
  echo "Commenting on $REPO #$ISSUE..."
  gh issue comment "$ISSUE" --repo "$REPO" --body "$COMMENT" || echo "Failed to comment on $REPO #$ISSUE"
done
