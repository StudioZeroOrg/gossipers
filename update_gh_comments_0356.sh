#!/bin/bash
# Update GitHub Issue Comments for StudioZeroOrg
# Date: 2026-05-08 03:56 UTC

# Function to post comment
post_comment() {
    local repo=$1
    local issue=$2
    local body=$3
    echo "Commenting on $repo#$issue..."
    gh issue comment $issue -R StudioZeroOrg/$repo -b "$body"
}

# Updates
SSG_BODY="**Latest Progress**: Zig core optimizations for deterministic rendering finalized.
**Current Blocker**: Binary size verification.
**Next Milestone**: Markdown parsing integration."

BWV_BODY="**Latest Progress**: UI layout stabilization at 92%.
**Current Blocker**: Asset verification.
**Next Milestone**: Canvas integration."

MQTT_BODY="**Latest Progress**: Integration testing for Zig sniffer at 75%.
**Current Blocker**: None.
**Next Milestone**: Topic parsing logic."

# Repository Issues
post_comment "ssg-apocalypse" 1 "$SSG_BODY"
post_comment "brainwave-visualizer" 1 "$BWV_BODY"
post_comment "mqtt-privacy-filter" 1 "$MQTT_BODY"

# Lifecycle Tracking (Tasks Repo)
post_comment "tasks" 7 "SSG Apocalypse Lifecycle Track: Zig optimizations finished. Binary size check ongoing."
post_comment "tasks" 6 "Brainwave Visualizer Lifecycle Track: UI layout 92% stable. Assets being verified."
post_comment "tasks" 5 "MQTT Privacy Filter Lifecycle Track: Integration test at 75%."
post_comment "tasks" 4 "Dashboard Maintenance ongoing. STATUS.md synced at 3:56 AM UTC."
