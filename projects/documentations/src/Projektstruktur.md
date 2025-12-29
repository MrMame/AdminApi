```
my-admin-app/
├── public/                  # Statische Website-Dateien (HTML, CSS, JS, Bilder)
│   ├── index.html
│   └── assets/
│       └── ...
├── src/                     # Quellcode für die Serverlogik
│   ├── api/                 # Admin-API-Endpunkte
│   │   ├── system.js        # z.B. Systeminformationen abrufen
│   │   ├── power.js         # z.B. Rechner herunterfahren, neustarten
│   │   └── ...
│   ├── services/            # Logik für Systemzugriffe, Shell-Kommandos etc.
│   │   ├── systemService.js
│   │   └── ...
│   ├── middleware/          # z.B. Authentifizierung, Logging
│   ├── routes.js            # API-Routing
│   └── server.js            # Einstiegspunkt für den Server
├── config/                  # Konfigurationsdateien (z.B. Ports, Pfade)
│   └── default.json
├── logs/                    # Log-Dateien
├── .env                     # Umgebungsvariablen
├── package.json
└── README.md

```

🔧 Hinweise zur Struktur
- public/: Wird vom Server als statisches Verzeichnis ausgeliefert, z.B. mit express.static.
- src/api/: Enthält die einzelnen API-Endpunkte, z.B. /api/power/shutdown.
- src/services/: Hier kommt die eigentliche Logik rein, z.B. Shell-Kommandos ausführen.
- src/middleware/: Für Dinge wie Authentifizierung, Logging, CORS etc.
- src/routes.js: Verbindet die API-Endpunkte mit dem Express-Router.
- src/server.js: Startet den Express-Server, bindet Middleware, API und public.
