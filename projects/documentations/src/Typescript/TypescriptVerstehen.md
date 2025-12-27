# TypeScript Debugging verstehen – Modulsysteme, ts-node, Source Maps & Fehlerursachen

## 🧠 Grundverständnis: Was passiert beim TypeScript-Debugging?

### 1. TypeScript ist nicht direkt ausführbar
- Du schreibst `.ts`-Dateien → TypeScript kompiliert sie zu `.js`.
- Der Debugger (z. B. `node`, `ts-node`, VS Code) führt **JavaScript** aus.
- Damit du trotzdem deinen TypeScript-Code debuggen kannst, brauchst **Source Maps**.

### 2. Source Maps verbinden `.js` mit `.ts`
- Beim Kompilieren erzeugt TypeScript `.js.map`-Dateien.
- Diese sagen dem Debugger: „Wenn du in `dist/server.js` bei Zeile 42 bist, zeige dem Entwickler `src/server.ts` Zeile 38.“
- Ohne Source Maps siehst du nur den kompilierten Code — schwer zu lesen und zu debuggen.

### 3. Modulsysteme: CommonJS vs ESModules

| Merkmal            | CommonJS (`require`)         | ESModules (`import/export`)       |
|--------------------|------------------------------|-----------------------------------|
| Dateiendung nötig? | ❌ Nein                      | ✅ Ja (`.js` in Imports)          |
| `package.json`     | `"type": "commonjs"` oder leer | `"type": "module"`               |
| Kompatibel mit `ts-node` | ✅ Ja                  | ⚠️ Nur mit `ts-node-esm`         |

### 4. ts-node vs tsc

| Tool        | Funktion                            | Besonderheiten |
|-------------|-------------------------------------|----------------|
| `tsc`       | Kompiliert `.ts` → `.js`            | Nutzt Source Maps |
| `ts-node`   | Führt `.ts` direkt aus              | Kein Build nötig |
| `ts-node-esm` | Führt `.ts` mit ESModules aus     | Braucht `.js`-Endungen in Imports |

---

## 🔍 Typische Fehlerquellen und wie du sie erkennst

| Fehlermeldung | Ursache | Lösung |
|---------------|--------|--------|
| `Cannot find module ... .js` | Du importierst `.js`, aber die Datei ist noch `.ts` | Nutze `ts-node-esm` oder kompiliere vorher |
| `TS5097` | Du importierst `.ts`, aber TypeScript erwartet `.js` | Schreibe `.js` in den Import |
| `TS1295` | Du nutzt `import/export`, aber dein Projekt ist CommonJS | Stelle auf ESModules um (`"type": "module"`) |
| Breakpoints funktionieren nicht | Keine Source Maps oder falscher `outFiles`-Pfad | `"sourceMap": true` + korrekte `launch.json` |

---

## 🧭 Debugging-Setup für ESModules + ts-node-esm

### `package.json`
```json
{
  "type": "module",
  "scripts": {
    "startDev": "ts-node-esm src/server.ts"
  }
}
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "sourceMap": true,
    "verbatimModuleSyntax": true,
    "esModuleInterop": true,
    "strict": true
  }
}
```

### `import in server.ts`
```ts
import { arpScanNetwork } from "./services/network/linuxNetworkService.js";
```

## Merksätze für dich
- „Ich schreibe TypeScript, aber debugge JavaScript.“
- „Wenn ich ESModules nutze, muss ich .js importieren.“
- „Wenn ich ts-node nutze, darf ich keine .js importieren — außer mit ts-node-esm.“
- „Source Maps sind mein Schlüssel zum echten Debugging.“
