# TypeScript `module` Optionen – Übersicht und Vergleich

In TypeScript gibt es mehrere `module`-Optionen, die das Verhalten der generierten JavaScript-Module steuern. Die Wahl hängt davon ab, ob du für Node.js, Browser, Bundler oder andere Umgebungen entwickelst.

## 📦 Übersicht: `module`-Optionen in TypeScript

| Modultyp       | Beschreibung                                                                 | Zielumgebung             | Besonderheiten |
|----------------|------------------------------------------------------------------------------|--------------------------|----------------|
| `CommonJS`     | Klassisches Node.js-Modulsystem (`require`, `module.exports`)                | Node.js                  | Standard für viele Node-Projekte |
| `ESNext`       | Moderne ES-Module (`import`, `export`) mit neuesten Features                 | Browser, Node.js (ESM)   | Nutzt `.js`-Endungen, benötigt `"type": "module"` in `package.json` |
| `ES2020`       | ES-Module mit Features bis ECMAScript 2020                                   | Browser, Node.js         | Stabiler als `ESNext`, aber weniger zukunftsorientiert |
| `ES2015`/`ES6` | Frühe Version von ES-Modulen                                                 | Browser, Node.js         | Basis für moderne Module |
| `AMD`          | Asynchronous Module Definition, verwendet in älteren Browser-Setups          | Browser (RequireJS)      | Selten verwendet heute |
| `System`       | Für SystemJS-Loader, modularer Ansatz für Browser                            | Browser                  | Legacy-Option |
| `UMD`          | Universal Module Definition: funktioniert in Browser und Node.js             | Universell               | Für Bibliotheken gedacht |
| `None`         | Keine Modulverarbeitung                                                      | Inline-Skripte           | Nur sinnvoll für sehr einfache Projekte |
| `NodeNext`     | Speziell für Node.js mit ES-Modulen und `.mts`/`.cts`-Dateien                | Node.js (ab v16+)        | Beste Kompatibilität mit modernem Node.js |
| `Node16`       | Ähnlich wie `NodeNext`, aber mit festen Regeln für `.js`/`.ts`-Auflösung     | Node.js (v16)            | Übergangsoption zu `NodeNext` |

## 🧭 Empfehlungen nach Einsatzzweck

- **Node.js-Projekt (CommonJS-basiert)**  
  → `module: "CommonJS"`

- **Node.js mit ES-Modulen (`import/export`)**  
  → `module: "ESNext"` oder `module: "NodeNext"`  
  → + `package.json` mit `"type": "module"`

- **Browser-Projekt ohne Bundler**  
  → `module: "ES2020"` oder `ESNext`

- **Projekt mit Webpack, Vite, Rollup**  
  → `module: "ESNext"` (Bundler übernimmt die Auflösung)

- **Bibliothek für universelle Nutzung**  
  → `module: "UMD"`


  # TypeScript `target` für `module: "CommonJS"` – Empfehlungen

Wenn du `module: "CommonJS"` in deiner `tsconfig.json` verwendest (typisch für Node.js-Projekte), solltest du ein `target` wählen, das zu deiner gewünschten JavaScript-Version passt – also wie modern dein Output sein soll.

## ✅ Empfohlene `target`-Werte für `module: "CommonJS"`

| `target`       | Beschreibung                              | Node.js-Kompatibilität | Empfehlung |
|----------------|-------------------------------------------|-------------------------|------------|
| `ES2020`       | Moderne Syntax inkl. optional chaining     | Node.js ≥ 14            | ✅ Gut für aktuelle Projekte |
| `ES2019`       | Unterstützt `flatMap`, `Object.fromEntries` | Node.js ≥ 12            | OK für ältere Umgebungen |
| `ES2017`       | Unterstützt `async/await`, `Object.entries`| Node.js ≥ 8             | Minimal für moderne Features |
| `ES6` / `ES2015` | Basis für Klassen, Module, Arrow Functions | Node.js ≥ 6             | Nur wenn du maximale Kompatibilität brauchst |
| `ES5`          | Sehr alt, kein `async/await`, keine Module | Browser-kompatibel      | ❌ Nicht für Node.js empfohlen |

## 🧭 Empfehlung für Node.js mit CommonJS

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS"
  }
}