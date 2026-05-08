#!/bin/bash
while read -r REPO NUM; do
    echo "Commenting on $REPO #$NUM..."
    gh issue comment "$NUM" -R "$REPO" --body-file consolidated_updates.md
done < issue_list.txt
