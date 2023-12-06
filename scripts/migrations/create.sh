#!/bin/bash

# Проверка, что передан ровно один аргумент
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <name>"
  exit 1
fi

name="$1"

pnpm typeorm migration:create ./src/database/migrations/"$name"