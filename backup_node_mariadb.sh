#!/bin/bash

TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_DIR="/var/www/html/projects/node_mariadb/backups"
DB_NAME="node_todo_api_dietrich"
DB_USER="dando"
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_backup_$TIMESTAMP.sql"

mkdir -p $BACKUP_DIR

mysqldump "$DB_NAME" > "$BACKUP_FILE"

echo "Backup erstellt: $BACKUP_FILE"