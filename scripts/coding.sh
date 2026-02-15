#!/bin/bash

PROMPT_FILE="$1"

if [ -z "$PROMPT_FILE" ]; then
  echo "Usage: $0 <prompt-file>"
  exit 1
fi

if [ ! -f "$PROMPT_FILE" ]; then
  echo "Error: Prompt file '$PROMPT_FILE' not found."
  exit 1
fi

if [ ! -d "work/generated" ]; then
  echo "Error: work/generated does not exist."
  exit 1
fi

claude --dangerously-skip-permissions < "$PROMPT_FILE"
