# Node.js ToDo API (MariaDB)

Eine einfache REST-API für eine ToDo-Liste, gebaut mit Node.js (ES6-Module) und MariaDB.

## Features
- **ES6-Module**: Moderner JavaScript-Standard (`import/export`).
- **Connection Pooling**: Effiziente Datenbankverbindung mit `mariadb.createPool`.
- **Security**: Nutzung von Umgebungsvariablen (`.env`) für sensible Daten.

## Voraussetzungen
- Node.js (v16+)
- MariaDB / MySQL Server

## Installation

1. Repository klonen:
   ```bash
   git clone [DEIN_REPO_LINK]

2. Abhängigkeiten installieren:
   ```bash
   npm install

3. .env Datei erstellen und ausfüllen:
   Code-Snippet:

   DB_HOST=localhost
   DB_USER=dein_user
   DB_PASSWORD=dein_passwort
   DB_NAME=todo_db

4. API Endpunkte:
   GET /api/todos - gibt alle ToDos als JSON zurück

5. Starten:
   npm run dev
   
